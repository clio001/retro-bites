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


const testLocations = [
  {
    name: "Test 1",
    geoReferences: {
      lat: 52.516389,
      long: 13.377778
    },
  },
  {
    name: "Test 2",
    geoReferences: {
      lat: 52.526389,
      long: 13.377778
    },
  }
]



const setMarkers = (testLocations) => {
  testLocations.map((element) => {
    let marker = L.marker([element.geoReferences.lat, element.geoReferences.long]).addTo(map);

    const popupCard = `<b>${element.name}</b><p>Latitude: ${element.geoReferences.lat}<br>Longitude: ${element.geoReferences.long}</p>`

    marker.bindPopup(popupCard)
  });
};


setMarkers(testLocations);

