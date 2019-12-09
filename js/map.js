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
    // Disable the scroll zoom during the navigation
    this.map.scrollWheelZoom.disable();
  }
  getLyonStations() {
    let thiz = this;
    $.get(
      "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=1692d146857047d2d74e535ea581e535313e858f",
      function (stations) {
        // console.log("This is", thiz);
        stations.forEach(function (station) {
          thiz.addMarker(station);
        });
        thiz.map.addLayer(thiz.markerClusters);
      }
    );
  }
  addMarker(station) {
    let iconColor;
    if (station.status === "OPEN" && station.available_bikes > 0) {
      iconColor = "img/marker_blue_24.png";
    } else {
      iconColor = "img/marker_red_24.png";
    }
    let icon = L.icon({
      iconUrl: iconColor,
      iconSize: [38, 50],
      iconAnchor: [9, 21],
      popupAnchor: [0, -14]
    });

    let str = station.name;
    let stationNameRegex = str.split(/^\d+ - /, 2)[1];
    // console.log(stationNameRegex);
    let popup =
      "<b>Name:</b> " +
      stationNameRegex +
      "<br/><b>Address:</b> " +
      station.address +
      "<br/><b>Status:</b> " +
      station.status +
      "<br/><b>Available bikes:</b> " +
      station.available_bikes +
      "<br/><b>Available bike stands:</b> " +
      station.available_bike_stands +
      "<br/><br/><a class='bookNow' href='#booking'>Book now</a> ";

    let marker = L.marker([station.position.lat, station.position.lng], {
      icon: icon
    }).bindPopup(popup);
    this.markerClusters.addLayer(marker);

    marker.addEventListener("popupopen", () => {
      let bookNow = $(marker.getPopup()._contentNode).find(".bookNow")[0];
      $(bookNow).hide();
      $.get(
        "https://api.jcdecaux.com/vls/v1/stations/" +
        station.number +
        "?contract=Lyon&apiKey=1692d146857047d2d74e535ea581e535313e858f",
        function (station) {
          this.selectedStation = station; // héritage qui marche pas
          sessionStorage.setItem("stationName", station.name);
          sessionStorage.setItem("stationAddress", station.address);

          if (station.status != "CLOSED" && station.available_bikes > 0) {
            $(bookNow).show();
            $(bookNow).on("click", () => {
              $("#lololo").show();
              $("#booking").show(500);
              // $("#lalala").toggleClass("col-9");
              $("#lalala").removeClass('col-lg-12 col-sm-12').addClass('col-9')
            });
          }
        }
      );
    });

    marker.addEventListener("popupclose", () => {
      $("#booking").hide();
      // $("#lalala").toggleClass("col-12");
      $("#lalala").removeClass('col-9').addClass('col-lg-12 col-sm-12')
      $("#lololo").hide();
    });
  }
}
