import { api } from "encore.dev/api";

// Kiểu dữ liệu ghi chú
interface Note {
  id: number;
  title: string;
  content: string;
}

// Interface cho danh sách ghi chú
interface NotesResponse {
  notes: Note[];
}

// Interface cho phản hồi ghi chú
interface NoteResponse {
  note?: Note;
  error?: string;
}

// Danh sách ghi chú (lưu tạm trong bộ nhớ)
let notes: Note[] = [];
let requestCount = 0; // Biến đếm số lượng request

// Tạo ghi chú mới
export const createNote = api(
  { method: "POST", path: "/notes" },
  async (p: { title: string; content: string }): Promise<Note> => {
    requestCount++; // Tăng số lượng request
    const newNote: Note = {
      id: notes.length + 1,
      title: p.title,
      content: p.content,
    };
    notes.push(newNote);
    return newNote;
  }
);

// Lấy danh sách ghi chú
export const getNotes = api(
  { method: "GET", path: "/notes" },
  async (): Promise<NotesResponse> => {
    requestCount++;
    return { notes };
  }
);

// Lấy ghi chú theo ID
export const getNoteById = api(
  { method: "GET", path: "/notes/:id" },
  async (p: { id: number }): Promise<NoteResponse> => {
    requestCount++;
    const note = notes.find((n) => n.id === p.id);
    return note ? { note } : { error: "Note not found" };
  }
);

// Cập nhật ghi chú
export const updateNote = api(
  { method: "PUT", path: "/notes/:id" },
  async (p: { id: number; title: string; content: string }): Promise<NoteResponse> => {
    requestCount++;
    const noteIndex = notes.findIndex((n) => n.id === p.id);
    if (noteIndex === -1) return { error: "Note not found" };

    notes[noteIndex] = { ...notes[noteIndex], title: p.title, content: p.content };
    return { note: notes[noteIndex] };
  }
);

// Xóa ghi chú
export const deleteNote = api(
  { method: "DELETE", path: "/notes/:id" },
  async (p: { id: number }): Promise<{ message: string }> => {
    requestCount++;
    notes = notes.filter((n) => n.id !== p.id);
    return { message: "Note deleted successfully" };
  }
);

// API để lấy tổng số request
export const getRequestCount = api(
  { method: "GET", path: "/notes/count" },
  async (): Promise<{ totalRequests: number }> => {
    return { totalRequests: requestCount };
  }
);
