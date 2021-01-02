import axios from "axios";

const apiKey = "AIzaSyBvTvWLa90CBmEww57yaZwhUvpTtz2b1T8";
const input = document.getElementById("address")! as HTMLInputElement;
const submitBtn = document.getElementById("submit")!;

interface Response {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: "OK" | "ZERO_RESULTS";
}

submitBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const address = encodeURI(input.value);
  const mapHttp = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  axios.get<Response>(mapHttp).then((response) => {
    const location = response.data.results[0].geometry.location;
    if (response.data.status === "OK") {
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
      });
    }
  });
});
