import axios from "axios";

const instance = axios.create({
  baseURL: "https://emphasoft-test-assignment.herokuapp.com/",
});

export default instance;
