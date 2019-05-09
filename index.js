// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("It's alive!");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The users information could not be retrieved."
      });
    });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users:id", (req, res) => {
  const userId = req.params.id;
  db.findById(userId)
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(404)
        .json({
          error: err,
          message: "The user with the specified ID does not exist."
        });
    });
});


server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(deleted => {
        res.status(201).end();
    })
    .catch(error => {
        res.status(404).json({ message: "The user with the specified ID does not exist."});
    });
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(400).json({ message: "The user with the specified ID does not exist"});
        }
    })
    .catch(error => {
        res.status(500).json({ message: "The user information could not be modified."});
    });
});


server.listen(5678, () => {
  console.log("\n*** Server is running on 5678 ***\n");
});
