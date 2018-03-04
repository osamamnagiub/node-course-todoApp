const app = require("express")();
const bodyParser = require("body-parser");

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
      res.send(e);
    }
  );
 
});


app.get('/todos' , (req, res) => {
  
})

app.listen(3000, () => {
  console.log("strating server");
});
