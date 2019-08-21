class Map {
  constructor(id, lat, lng, zoom) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
    this.initMap();
  }
  initMap() {
    this.map = L.map(this.id).setView([this.lat, this.lng], this.zoom);
    this.mapLayer = L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaW4tZmEiLCJhIjoiY2p5N2g5MTYyMDB3ZTNobm15ajV5aTFldCJ9.yObRBjYbSdS9hhqDFeovbA",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox.streets",
        subdomains: ["a", "b", "c"],
        minZoom: 2,
        maxZoom: 20
      }
    );
    this.map.addLayer(this.mapLayer);
    this.markerClusters = new L.markerClusterGroup();
    this.getLyonStations();
  }
  getLyonStations() {
    let thiz = this;
    $.get(
      "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=1692d146857047d2d74e535ea581e535313e858f",
      function(stations) {
        console.log("This is", thiz);
        stations.forEach(function(station) {
          thiz.addMarker(station);
        });
        thiz.map.addLayer(thiz.markerClusters);
      }
    );
  }
  addMarker(station) {
    this.myUrl = jQuery('script[src$="js/map.js"]')
      .attr("src")
      .replace("map.js", "");
    let iconColor;
    if (station.status === "OPEN" && station.available_bikes > 0) {
      iconColor = "img/marker_blue_24.png";
    } else {
      iconColor = "img/marker_red_24.png";
    }
    this.myIcon = L.icon({
      iconUrl: iconColor,
      iconSize: [38, 50],
      iconAnchor: [9, 21],
      popupAnchor: [0, -14]
    });
    // let statusColor;
    // if (station.status === "OPEN" && station.available_bikes > 0) {
    //   statusColor.css("color", "#2a315e");
    // } else {
    //   statusColor.css("color", "#b20000");
    // }
    this.popup =
      station.name +
      "<br/><b>Address:</b> " +
      station.address +
      "<br/><b>Status:</b> " +
      station.status +
      "<br/><b>Available bikes:</b> " +
      station.available_bikes +
      "<br/><b>Available bike stands:</b> " +
      station.available_bike_stands +
      "<br/><button>Book now</button> ";
    this.marker = L.marker([station.position.lat, station.position.lng], {
      icon: this.myIcon
    }).bindPopup(this.popup);
    this.markerClusters.addLayer(this.marker);
  }
}
