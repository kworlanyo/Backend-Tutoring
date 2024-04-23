import { v4 as uuidv4 } from "uuid";

const users = [
  {
    id: uuidv4(),
    username: "BookLover123",
    password: "abcd1234",
    books: [
      {
        id: uuidv4(),
        title: "Doktor Faustus",
        author: "Thomas Mann"
      },
      {
        id: uuidv4(),
        title: "Das Glasperlenspiel",
        author: "Hermann Hesse"
      },
      {
        id: uuidv4(),
        title: "Der Prozess",
        author: "Franz Kafka"
      }
    ]
  }
]

export default users;