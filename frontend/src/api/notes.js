import axios from "./axiosInstance";
import Cookies from "js-cookie";
import { API_URL } from "../utils";

// Ambil semua catatan dari backend dengan autentikasi
export const getNotes = async () => {
  const uId = Cookies.get("uId"); // Ambil user ID dari cookie
  if (!uId) {
    console.error("user ID tidak ditemukan dalam cookie");
    return [];
  }

  try {
    const response = await axios.get(`${API_URL}/notes`, {
      params: { uId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

// Tambah catatan baru dengan autentikasi
export const addNote = async (title, content) => {
  const uId = Cookies.get("uId"); // Ambil user ID dari cookie
  if (!uId) {
    console.error("user ID tidak ditemukan dalam cookie");
    return null;
  }

  try {
    const response = await axios.post(`${API_URL}/tambahNotes`, {
      uId,
      title,
      notes: content,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    return null;
  }
};

// Update catatan dengan autentikasi
export const updateNoteContent = async (id, title, content) => {
  try {
    const response = await axios.put(`${API_URL}/edit-notes/${id}`, {
      title,
      notes: content,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    return null;
  }
};

// Hapus catatan dengan autentikasi
export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    return null;
  }
};