import { createContext, useContext, useState, useEffect } from 'react';
import { Book, BookSort } from '@/types/book';
import { getBooks, addBook, updateBook, deleteBook } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  createBook: (bookData: Omit<Book, 'id' | 'addedAt'>) => Promise<void>;
  editBook: (id: string, bookData: Partial<Book>) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  searchBooks: (query: string) => void;
  sortBooks: (sort: BookSort) => void;
  filterBooksByGenre: (genre: string | null) => void;
  searchQuery: string;
  activeGenreFilter: string | null;
  activeSort: BookSort;
  filteredBooks: Book[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGenreFilter, setActiveGenreFilter] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<BookSort>({ option: 'addedAt', direction: 'desc' });
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      const mappedBooks = data.map((book: any) => ({
        ...book,
        id: book._id, // Map _id to id
      }));
      setBooks(mappedBooks as Book[]);
      setFilteredBooks(mappedBooks as Book[]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books');
      toast({
        title: 'Error',
        description: 'Failed to fetch your books',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a book
  const createBook = async (bookData: Omit<Book, 'id' | 'addedAt'>) => {
    try {
      const newBook = await addBook(bookData);
      setBooks(prev => [newBook, ...prev]);
      toast({
        title: 'Success',
        description: 'Book added to your library',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add book',
        variant: 'destructive',
      });
    }
  };

  // Update a book
  const editBook = async (id: string, bookData: Partial<Book>) => {
    try {
      console.log('ID received in editBook:', id); // Debugging log
      console.log('Book data received in editBook:', bookData); // Debugging log
  
      if (!id) {
        throw new Error('Book ID is required for updating');
      }
  
      // Remove id and addedAt from update data if present
      const { id: _, addedAt: __, ...updateData } = bookData;
  
      const updatedBook = await updateBook(id, updateData);
      setBooks(prev => prev.map(book => 
        book.id === id ? { ...book, ...updatedBook } : book
      ));
  
      toast({
        title: 'Success',
        description: 'Book updated successfully',
      });
    } catch (err) {
      console.error('Edit book error:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update book',
        variant: 'destructive',
      });
    }
  };

  // Delete a book
  const removeBook = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
      toast({
        title: 'Success',
        description: 'Book removed from your library',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete book',
        variant: 'destructive',
      });
    }
  };


  // Search books
  const searchBooks = (query: string) => {
    setSearchQuery(query);
  };

  // Sort books
  const sortBooks = (sort: BookSort) => {
    setActiveSort(sort);
  };

  // Filter books by genre
  const filterBooksByGenre = (genre: string | null) => {
    setActiveGenreFilter(genre);
  };

  // Process filters and sorting
  useEffect(() => {
    let result = [...books];

    // Apply genre filter
    if (activeGenreFilter) {
      result = result.filter(book => book.genre === activeGenreFilter);
    }

    // Apply search
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) ||
          (book.description && book.description.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const { option, direction } = activeSort;
      const modifier = direction === 'asc' ? 1 : -1;

      if (option === 'addedAt') {
        return (new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()) * modifier;
      }
      
      if (option === 'publicationYear') {
        return (a.publicationYear - b.publicationYear) * modifier;
      }
      
      return a[option].localeCompare(b[option]) * modifier;
    });

    setFilteredBooks(result);
  }, [books, searchQuery, activeGenreFilter, activeSort]);

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider 
      value={{ 
        books, 
        loading, 
        error, 
        fetchBooks, 
        createBook, 
        editBook, 
        removeBook, 
        searchBooks, 
        sortBooks, 
        filterBooksByGenre,
        searchQuery,
        activeGenreFilter,
        activeSort,
        filteredBooks
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};