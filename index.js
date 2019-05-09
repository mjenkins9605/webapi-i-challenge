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
      res
        .status(500)
        .json({
          error: err,
          message: "The users information could not be retrieved."
        });
    });
});


server.post('/api/users', (req, res) => {
    const user = req.body 
    db.insert(user)
    .then(
        user =>{
            res.status(201).json(user)
        }
    ).catch( err => {
        res.status(500).json({error: err, message: 'There was an error while saving the user to the database'})
    })
 })



server.listen(5678, () => {
  console.log("\n*** Server is running on 5678 ***\n");
});
