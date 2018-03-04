const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) {
    return console.log("Unable to connect to mongoDb server");
  }

  console.log("connected to mongodb server");

  var db = client.db("TodoApp");
  var todos = db.collection("Todos");

  todos
    .find({
      completed: false
    })
    .count()
    .then(count => {
      console.log('todos count ' + count);
    });
});
