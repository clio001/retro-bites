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
    popupAnchor: [-3, -76]
});


const testLocations = [
  {
    id: 4,
    name: "Brandenburger Tor",
    geoReferences: {
      lat: 52.516389,
      long: 13.377778
    },
  },
  {
    id: 3,
    name: "Stadtschloss ",
    geoReferences: {
      lat: 52.516389,
      long: 13.397778
    },
  }
]



const setMarkers = (testLocations) => {
  testLocations.map((element) => {
    let marker = L.marker([element.geoReferences.lat, element.geoReferences.long], { keyboard: true, icon: myIcon, }).addTo(map);

    const popupCard = `
    <div class="card" style="width: 22rem; border: none;">
      <div class="card-body">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Bundesarchiv_Bild_183-R99514%2C_Berlin%2C_Wilhelmplatz%2C_Hotel_%22Kaiserhof%22.jpg" style="width: 20rem;" alt="...">
        <h5 class="mt-3">${element.name}</h5>
        <p>Das Hotel Kaiserhof war das erste Luxushotel in Berlin. Es stand am Wilhelmplatz 3–5 schräg gegenüber der Reichskanzlei im damaligen Berliner Regierungsviertel. Das Hotel wurde im Oktober 1875 eröffnet und am 23. November 1943 durch mehrere Bombeneinschläge zerstört.</p>
        <div class="small text-body-secondary text-center mt-4 mb-2">Quelle: Wikidata und Wikipedia</div>
        <hr/>
        <div class="text-center">
          <div class="btn btn-secondary" onclick="window.location.href='/item/${element.id}'">Menükarte</div>
        </div>
        
      </div>
    </div>`

    marker.bindPopup(popupCard, {maxWidth: 800});
  });
};


setMarkers(testLocations);

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

