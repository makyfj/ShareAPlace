// Secret files :-()!
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Code goes here!

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const searchAddressHandler = (e: Event) => {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", searchAddressHandler);
