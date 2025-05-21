import db from "../config/Database.js";
import User from "./UserModel.js";
import Note from "./NotesModel.js";

// Define relations
User.hasMany(Note, { foreignKey: "id", onDelete: "CASCADE" });
Note.belongsTo(User, { foreignKey: "id" });

(async () => {
  try {
    await db.authenticate();
    console.log("berhasil terkoneksi!");

    await db.sync({ alter: true });
    console.log("oke");
  } catch (err) {
    console.error("error", err);
  }
})();

export { User, Note };
