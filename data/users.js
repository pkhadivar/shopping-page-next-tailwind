import bcrypt from "bcryptjs";

const users = [
  {
    name: "user 1",
    email: "user1@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "user 2",
    email: "user2@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: false,
  },
  {
    name: "pouria",
    email: "pouria@gmail.com",
    password: bcrypt.hashSync("123"),
    isAdmin: false,
  },
];


export default users