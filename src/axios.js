import axios from "axios";

const instance = axios.create({
  baseUrl: "http://localhost:8080/api/"
});

instance.defaults.headers.post["Content-Type"] = "application.json";
instance.defaults.headers.put["Content-Type"] = "application.json";
instance.defaults.headers.delete["Content-Type"] = "application.json";

export default instance;
