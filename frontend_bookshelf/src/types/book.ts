
export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  isbn: string;
  coverImage?: string;
  description?: string;
  addedAt: Date;
}

export interface BookFormData {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  isbn: string;
  coverImage?: string;
  description?: string;
}
export type SortOption = 'title' | 'author' | 'addedAt' | 'publicationYear';
export type SortDirection = 'asc' | 'desc';

export interface BookSort {
  option: SortOption;
  direction: SortDirection;
}
