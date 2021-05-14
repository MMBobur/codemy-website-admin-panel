import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.43.218:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const url = "http://192.168.43.218:8080/api";
