export class MapDisplay {
  constructor(containerId) {
    this.map = null;
    this.containerId = containerId;
    this.marker = null;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error('地図コンテナが見つかりません:', this.containerId);
      return;
    }

    container.innerHTML = '';
    container.classList.remove('hidden');

    this.map = L.map(this.containerId, {
      zoomControl: true,
      scrollWheelZoom: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  showCityLocation(cityName, lat, lng, prefName) {
    if (!this.map) {
      this.init();
    }

    this.map.setView([lat, lng], 9);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`<b>${cityName}</b><br>${prefName}`)
      .openPopup();
  }

  generateGoogleMapsUrl(lat, lng, cityName) {
    const query = encodeURIComponent(cityName);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  destroy() {
    if (this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = null;
    }
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
