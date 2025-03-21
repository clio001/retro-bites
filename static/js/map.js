getData = async () => {
    const response = await fetch('static/db.json');
    const locations = await response.json();
    console.log(locations);
}

let map = L.map("map", {
    zoomControl: true,
    zoom: 15,
    scrollWheelZoom: false,
}).setView([52.516389, 13.377778]);

L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
  maxZoom: 50,
  attribution: "Tiles by Openstreetmap",
}).addTo(map);