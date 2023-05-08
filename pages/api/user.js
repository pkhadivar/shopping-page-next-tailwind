import db from "../../utils/db";
import users from "../../data/users";
import User from "../../models/user";

const handler = async (req, res) => {
  await db.connect();

  await User.deleteMany()

  await User.insertMany(users);

  res.send({ message: "User added." });
};

export default handler;
