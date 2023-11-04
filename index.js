const express = require("express");
const app = express();
const serverless = require("serverless-http");

const characters = {
  1: {
    id: 1,
    name: "Имя персонажа",
    description: "описание...",
    modified: "2020-07-21",
    thumbnail: "http://...",
    comics: [
      {
        id: 1,
        name: "Spider-Man: 101 Ways to End the Clone Saga (1997) #1",
      },
    ],
  },
  2: {
    id: 2,
    name: "Имя персонажа 2",
    description: "описание 2...",
    modified: "2022-07-21",
    thumbnail: "http://...",
    comics: [
      {
        id: 2,
        name: "Spider-Man: 101 Ways to End the Clone Saga (1997) #2",
      },
    ],
  },
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/characters", (req, res) => {
  const id = req.query.id;
  if (id)
    if (characters[+id]) res.status(200).json(characters[+id]);
    else res.status(404).json({ message: "Character not found" });
  else res.status(200).json(Object.values(characters));
});

module.exports.handler = serverless(app);
