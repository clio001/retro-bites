getData = async () => {
    const response = await fetch('static/db.json');
    const locations = await response.json();
    console.log(locations);
}

let map = L.map("map", {
    zoomControl: true,
    zoom: 15,
    scrollWheelZoom: false,
}).setView([52.516389, 13.397778]);

L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
  maxZoom: 50,
  attribution: "Tiles by Openstreetmap",
}).addTo(map);

const myIcon = L.icon({
    iconUrl: 'static/marker-icon.svg',
    iconSize: [48, 48],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0]
});

const fetch_db = async () => {
  const response = await fetch("static/db.json");
  const result = await response.json()
  return result
}

const get_locations = async () => {
  const locations = await fetch_db();
  console.log(locations)
  setMarkers(locations);
  return locations
}

const restaurants = get_locations()

const setMarkers = (locations) => {
  let markers = L.markerClusterGroup(); // Declare markers outside the loop

  locations.map((element) => {
    let marker = L.marker([element.place.lat, element.place.long], { keyboard: true, icon: myIcon });

    const popupCard = `
      <div class="card" style="width: 22rem; border: none;">
        <div class="card-body">
          <img src="${element.place.imageUrl || 'static/default_hotel.svg'}" style="width: 20rem; margin-bottom:1rem;" alt="...">
          <small class="text-secondary">Ort</small>
          <h5 class="mb-3">${element.place.Name}</h5>
          <small class="text-secondary">Hintergrund</small>
          <div class="mt-2">${element.place.context}</div>
          <div class="small text-body-secondary  mt-1 mb-5">(Quelle: Wikidata und Wikipedia)</div>
         
          <div class="lead text-center fs-6">${element.title}</div> <hr/>
          <div class="text-center">
            <div class="btn btn-secondary" onclick="window.location.href='item/${element.id}'">Menükarte</div>
          </div>
        </div>
      </div>`;

    marker.bindPopup(popupCard, { maxWidth: 800 });
    markers.addLayer(marker); // Add marker to the cluster group
  });

  map.addLayer(markers); // Add the cluster group to the map
};




const backButton = L.control({ position: "topright" });

backButton.onAdd = function(map) {
  var div = L.DomUtil.create("div");
  div.innerHTML = "<div class='leaflet-control-backButton'><a href='#top'><div class='btn btn-secondary' style='width: 250px;'>Zurück</div ></a> ";
    return div;
};
backButton.addTo(map);

const textOverlay = L.control({ position: "topright" });

textOverlay.onAdd = function(map) {
  var div = L.DomUtil.create("div");
  div.innerHTML = "<div class='leaflet-control-textbox'><div class='text-center'><img src='static/marker-icon.svg' class='m-3' alt=''/><div class='lead'> Hotels und Restaurants</div></ div></div > ";
    return div;
};

textOverlay.addTo(map);

