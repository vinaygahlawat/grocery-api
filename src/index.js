const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(cors());

app.get("/api/ping", (request, response) => {
  try {
    console.log(`Received ping request.`);
    response.status(200).send("Grocery app Ping: successful");
  } catch (error) {
    console.log(`Error with ping request: ${error}`);
    response.status(500).send("Grocery app Ping: failed", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
