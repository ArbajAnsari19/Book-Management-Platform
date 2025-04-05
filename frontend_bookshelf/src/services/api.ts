import axios from 'axios';
import { Book, BookFormData } from '@/types/book';

const BASE_URL = 'http://localhost:3000/api/books';

// GET /api/books
export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// POST /api/books
export const addBook = async (bookData: Omit<Book, 'id' | 'addedAt'>): Promise<Book> => {
  const response = await axios.post(BASE_URL, bookData);
  return response.data;
};

// PUT /api/books/:id
export const updateBook = async (id: string, bookData: Partial<Book>): Promise<Book> => {
  const response = await axios.put(`${BASE_URL}/${id}`, bookData);
  return response.data;
};

// DELETE /api/books/:id
export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};