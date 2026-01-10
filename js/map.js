export class MapDisplay {
  constructor(containerId) {
    this.map = null;
    this.containerId = containerId;
    this.boundaryLayer = null;
  }

  async init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error('地図コンテナが見つかりません:', this.containerId);
      return;
    }

    container.innerHTML = '';

    this.map = L.map(this.containerId, {
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  async showCityBoundary(cityName, lat, lng) {
    if (!this.map) {
      await this.init();
    }

    this.map.setView([lat, lng], 12);

    try {
      const boundary = await this.fetchCityBoundary(cityName, lat, lng);

      if (boundary) {
        this.displayBoundary(boundary);
      } else {
        this.showMarkerFallback(cityName, lat, lng);
      }
    } catch (error) {
      console.error('境界データ取得エラー:', error);
      this.showMarkerFallback(cityName, lat, lng);
    }
  }

  async fetchCityBoundary(cityName, lat, lng) {
    const overpassUrl = 'https://overpass-api.de/api/interpreter';

    const query = `
      [out:json][timeout:25];
      (
        relation["boundary"="administrative"]["admin_level"~"^(7|8)$"](around:5000,${lat},${lng});
      );
      out geom;
    `;

    try {
      const response = await fetch(overpassUrl, {
        method: 'POST',
        body: query
      });

      if (!response.ok) {
        throw new Error('Overpass API エラー');
      }

      const data = await response.json();

      if (data.elements && data.elements.length > 0) {
        const relation = this.findBestMatch(data.elements, cityName);
        if (relation) {
          return this.convertToGeoJSON(relation);
        }
      }

      return null;
    } catch (error) {
      console.error('Overpass API エラー:', error);
      return null;
    }
  }

  findBestMatch(elements, cityName) {
    const cleanCityName = cityName.replace(/市|区|町|村/g, '');

    for (const element of elements) {
      const name = element.tags?.name || '';
      if (name.includes(cleanCityName) || cleanCityName.includes(name.replace(/市|区|町|村/g, ''))) {
        return element;
      }
    }

    return elements[0];
  }

  convertToGeoJSON(relation) {
    const coordinates = [];

    if (relation.members) {
      for (const member of relation.members) {
        if (member.geometry) {
          const coords = member.geometry.map(point => [point.lon, point.lat]);
          coordinates.push(coords);
        }
      }
    }

    if (coordinates.length === 0) return null;

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: coordinates
      },
      properties: {
        name: relation.tags?.name || ''
      }
    };
  }

  displayBoundary(geojson) {
    if (this.boundaryLayer) {
      this.map.removeLayer(this.boundaryLayer);
    }

    this.boundaryLayer = L.geoJSON(geojson, {
      style: {
        color: '#ff0000',
        weight: 3,
        opacity: 0.8,
        fillColor: '#ff0000',
        fillOpacity: 0.3
      }
    }).addTo(this.map);

    this.map.fitBounds(this.boundaryLayer.getBounds(), {
      padding: [20, 20]
    });
  }

  showMarkerFallback(cityName, lat, lng) {
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`<b>${cityName}</b>`)
      .openPopup();

    this.map.setView([lat, lng], 12);
  }

  destroy() {
    if (this.boundaryLayer) {
      this.map.removeLayer(this.boundaryLayer);
      this.boundaryLayer = null;
    }
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
