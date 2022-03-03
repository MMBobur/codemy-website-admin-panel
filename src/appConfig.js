import axios from "axios";

export default axios.create({

  baseURL: "http://192.168.0.108:8080/api",

  headers: {
    "Content-type": "application/json",
  },
});

export const url = "http://192.168.0.108:8080/api";

