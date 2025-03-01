import Note from "../model/NotesModel.js";

export const getNotes = async (req, res) => {
  try {
    const response = await Note.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createNote = async (req, res) => {
  try {
    const response = await Note.create(req.body);
    res.status(201).json({
      msg: "Note Berhasil Ditambah",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNotes = async (req, res) => {
  try {
    const inputData = req.body; //nyimpen input
    const id = req.params.id; //nyimpen id

    await Note.update(inputData, {
      where: {
        id,
      },
    });

    res.status(200).json({
      msg: "Notes created",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const id = req.params.id; //nyimpen id

    await Note.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      msg: "notes berhasil dihapus",
    });
  } catch (error) {
    console.log(error.message);
  }
};
