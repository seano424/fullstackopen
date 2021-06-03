const express = require("express");
var morgan = require("morgan");

const app = express();

app.use(express.json());

morgan.token("post", (request) => {
  if (request.method === "POST") return JSON.stringify(request.body);
  else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms :post"
);

app.use(morgan("postFormat"));

let persons = [
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "jojo",
    number: "13413",
    date: "2021-06-03T14:37:31.242Z",
    id: 10,
  },
  {
    name: "Roberto",
    number: "13413",
    date: "2021-06-03T14:39:47.507Z",
    id: 11,
  },
  {
    name: "Lea",
    number: "134134123",
    date: "2021-06-03T14:40:19.280Z",
    id: 12,
  },
  {
    name: "Julia",
    number: "43013241",
    date: "2021-06-03T14:44:07.324Z",
    id: 13,
  },
];

app.get("/", (request, response) => {
  response.send("Hello Sean");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = {
    name: body.name,
    date: new Date(),
    id: generateId(),
  };

  persons = persons.concat(person);
  console.log(person);
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
