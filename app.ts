import axios from "axios";
declare const google: any;

const apiKey = "AIzaSyBvTvWLa90CBmEww57yaZwhUvpTtz2b1T8";
const input = document.getElementById("address")! as HTMLInputElement;
const submitBtn = document.getElementById("submit")!;

submitBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const address = encodeURI(input.value);
  const mapHttp = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  axios.get(mapHttp).then(function (response) {
    const location = response.data.results[0].geometry.location;
    const status = response.data.status;
    if (status === "OK") {
      const latLng = { lat: location.lat, lng: location.lng };
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: latLng,
          zoom: 16,
        }
      );
      new google.maps.Marker({
        position: latLng,
        map,
        title: "Hello World!",
      });
    }
  });
});
