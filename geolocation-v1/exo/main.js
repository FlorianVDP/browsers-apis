const EcvCoords = {
  latitude: 44.861,
  longitude: -0.554,
};
const NowCoworkingCoords = {
  latitude: 44.856,
  longitude: -0.562,
};

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords);
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      let dLat = ((lat - NowCoworkingCoords.latitude) * Math.PI) / 180;
      let dLon = ((lng - NowCoworkingCoords.longitude) * Math.PI) / 180;
      let a =
        0.5 -
        Math.cos(dLat) / 2 +
        (Math.cos((NowCoworkingCoords.latitude * Math.PI) / 180) *
          Math.cos((lat * Math.PI) / 180) *
          (1 - Math.cos(dLon))) /
          2;
      let distance = Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));
      console.log("distance:", distance);
      document.getElementById("title").textContent =
        distance < 100
          ? `Vous êtes bien à ECV`
          : `Vous êtes à ${distance} mètres`;
    },
    (error) => console.error(error),
    { enableHighAccuracy: true, maximumAge: 0 }
  );
}
