const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (request, response) => {
  try {
    console.log(`Received ping request.`);
    response.status(200).send("Grocery app Ping: successful");
  } catch (error) {
    console.log(`Error with ping request: ${error}`);
    response.status(500).send("Grocery app Ping: failed", error);
  }
});

let items = [];

app.get("/api/items", (request, response) => {
  try {
    console.log(`Received item GET request...`);
    response.status(200).send(items);
  } catch (error) {
    console.log(`Error with items GET request: ${error}`);
    response.status(500).sendStatus("Items GET error", error);
  }
});

app.post("/api/items", (request, response) => {
  try {
    console.log(`Received POST request...`);
    if (!request.body) {
      response.status(500).send("Missing body");
    } else {
      const newItem = request.body;
      items.push(newItem);
      response.status(200).send(items);
    }
  } catch (error) {
    console.log(`Error with items POST request: ${error}`);
    response.status(500).sendStatus("Items POST error", error);
  }
});

app.delete("/api/items", (request, response) => {
  try {
    console.log(`Received DELETE request...`);
    if (!request.body) {
      response.status(500).send("Missing item name to delete");
    } else {
      const itemToDelete = request.body.name;
      const index = items.findIndex((item) => item.name == itemToDelete);
      items.splice(index, 1);
      response.status(200).send();
    }
  } catch (error) {
    console.log(`Error with items DELETE request: ${error}`);
    response.status(500).sendStatus("Items DELETE error", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
