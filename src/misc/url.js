const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/"
    : "https://bullyboxx-be.onrender.com/"

export default BASE_URL
