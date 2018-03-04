const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) {
    return console.log("Unable to connect to mongoDb server");
  }

  console.log("connected to mongodb server");

  var db = client.db("TodoApp");
  var todos = db.collection("Todos");

  //   todos.insertOne(
  //     {
  //       text: "something to do ",
  //       completed: false
  //     },
  //     (err, result) => {
  //       if (err) {
  //         return console.log("unable to insert todo ", err);
  //       }

  //       console.log(JSON.stringify(result.ops, undefined, 2));
  //     }
  //   );
    // var objects = [];
    // for (let index = 0; index < 100000; index++) {
    //   objects.push({
    //     text: "another todo " + index,
    //     completed: true
    //   });
    // }
    // todos.insertMany(objects, result => {
    //   console.log("done");
    // });
  todos
    .count()
    .then(number => console.log(number));
//   client.close();
});
