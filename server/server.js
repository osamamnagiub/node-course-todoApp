const app = require("express")();
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      res.status(200).send({
        todos
      });
    })
    .catch(err => res.status(400).send(err));
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      return res.send({ todo });
    })
    .catch(r => {
      res.status(400).send(r);
    });
});

app.listen(3000, () => {
  console.log("strating server");
});

module.exports = {
  app
};
