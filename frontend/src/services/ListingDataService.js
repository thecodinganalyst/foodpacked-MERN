import axios from "axios";

axios.defaults.baseURL = "https://localhost:8000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

class ListingDataService {}
