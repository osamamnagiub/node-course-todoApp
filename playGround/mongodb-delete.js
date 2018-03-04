const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) {
    return console.log("Unable to connect to mongoDb server");
  }

  console.log("connected to mongodb server");

  var db = client.db("TodoApp");
  var todos = db.collection("Todos");

  //   todos.deleteMany({completed : true}).then(result => console.log(result));

  //   todos.findOneAndDelete({
  //     _id: new ObjectId("5a9bd8fcee592a3790e64760")
  //   });

  todos
    .findOneAndUpdate(
      {
        _id: new ObjectId("5a9bd8fcee592a3790e6475f")
      },
      {
        $set: {
          completed: true
        },
        $inc: {
          age: 1
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => console.log(result));
});
