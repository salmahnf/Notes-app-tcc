import Note from "../model/NotesModel.js";

export const getNotes = async (req, res) => {
  try {
    const uId = req.user.id; // Get uId from token

    if (!uId) {
      return res.status(400).json({
        message: "id tidak ditemukan dalam token",
      });
    }

    // Get all notes for this specific user
    const response = await Note.findAll({
      where: { uId }, // Filter by user ID
    });

    if (response.length === 0) {
      return res.status(404).json({
        message: "belum ada catatan",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "terjadi kesalahan saat mengambil catatan",
      error: error.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, notes } = req.body;
    const uId = req.user.id; // Get user ID from token

    const response = await Note.create({
      uId,
      title,
      notes,
    });

    res.status(201).json({
      msg: "Note berhasil ditambah",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Gagal menambah note",
      error: error.message,
    });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const inputData = req.body;
    const id = req.params.id;
    const uId = req.user.id; // Get user ID from token

    // Make sure user can only update their own notes
    const note = await Note.findOne({ where: { id, uId } });
    if (!note) {
      return res.status(404).json({
        message: "Note tidak ditemukan",
      });
    }

    await Note.update(inputData, {
      where: {
        id,
        uId, // Additional security check
      },
    });

    res.status(200).json({
      message: "Berhasil update",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Gagal update",
      error: error.message,
    });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const uId = req.user.id; // Get user ID from token

    // Make sure user can only delete their own notes
    const note = await Note.findOne({ where: { id, uId } });
    if (!note) {
      return res.status(404).json({
        message: "Note tidak ditemukan",
      });
    }

    await Note.destroy({
      where: {
        id,
        uId, // Additional security check
      },
    });

    res.status(200).json({
      message: "Berhasil Hapus",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Gagal Hapus",
      error: error.message,
    });
  }
};