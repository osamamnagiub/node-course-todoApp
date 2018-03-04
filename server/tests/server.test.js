const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First todo"
  },
  {
    _id: new ObjectID(),

    text: "Second todo"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(r => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "test Todo";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(docs => {
            expect(docs.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });

  describe("GET /Todos/:id", () => {
    it("should get todo with id", done => {
      var id = todos[0]._id.toHexString();

      request(app)
        .get(`/todos/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it("should get 400 todo with invalid id", done => {
      var id = "asdasdasd"

      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it("should get 404 when todo not found", done => {
      var id = new ObjectID().toHexString();

      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
  });
});
