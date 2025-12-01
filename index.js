import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };

    res.render("index", { weather, error: null });

  } catch (error) {
    // res.render("index", { weather: null, error: "City not found" });
    console.log("API ERROR:", error.response?.data || error.message);

  }
  console.log("City submitted:", city);

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
