import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Note = db.define(
  "notes",
  {
    uId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    notes: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Note;