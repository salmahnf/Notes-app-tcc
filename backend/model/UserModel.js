import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// Create "users" table
const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refreshToken: Sequelize.TEXT,
  },
  { freezeTableName: true }
);

export default User;

(async () => {
  await db.sync();
})();