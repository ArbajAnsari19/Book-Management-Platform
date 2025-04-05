import { useState } from 'react';
import { Book } from '@/types/book';
import { useBooks } from '@/context/BookContext';
import { BookGrid } from '@/components/books/BookGrid';
import { BookFilters } from '@/components/books/BookFilters';
import { BookForm } from '@/components/books/BookForm';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Dashboard = () => {
  const { 
    filteredBooks, 
    loading, 
    createBook, 
    editBook, 
    removeBook,
    searchBooks,
    sortBooks,
    filterBooksByGenre,
    searchQuery,
    activeSort,
    activeGenreFilter,
    books
  } = useBooks();

  const [isAddingBook, setIsAddingBook] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const handleAddBook = () => {
    setIsAddingBook(true);
  };

  const handleBookSubmit = (data: Omit<Book, 'id' | 'addedAt'>) => {
    if (bookToEdit) {
      console.log('Book to edit:', bookToEdit);
      console.log('Data to update:', data);
      editBook(bookToEdit.id, data); // Use bookToEdit.id here
      setBookToEdit(null);
    } else {
      console.log('Creating new book with data:', data);
      createBook(data);
      setIsAddingBook(false);
    }
  };

  const handleCloseForm = () => {
    setIsAddingBook(false);
    setBookToEdit(null);
  };

  const handleEditBook = (book: Book) => {
    console.log('Book received in handleEditBook:', book); // Debugging log
    setBookToEdit(book); // Ensure this state is being set correctly
  };

  const handleDeleteBook = (id: string) => {
    setBookToDelete(id);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      removeBook(bookToDelete);
      setBookToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">My Book Collection</h1>
          <p className="text-muted-foreground mb-4">
            Manage your personal library and keep track of your books
          </p>
        </div>
        <Button onClick={handleAddBook} className="shrink-0">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Book
        </Button>
      </div>

      <BookFilters
        books={books}
        onSearch={searchBooks}
        onSort={sortBooks}
        onFilterGenre={filterBooksByGenre}
        searchQuery={searchQuery}
        activeSort={activeSort}
        activeGenreFilter={activeGenreFilter}
      />

      <BookGrid
        books={filteredBooks}
        loading={loading}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />

      {/* Add/Edit Book Dialog */}
      <Dialog open={isAddingBook || !!bookToEdit} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>{bookToEdit ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogDescription>
              {bookToEdit
                ? 'Update the details of your book.'
                : 'Fill in the details to add a new book to your collection.'}
            </DialogDescription>
          </DialogHeader>
          <BookForm
            initialData={bookToEdit || undefined}
            onSubmit={handleBookSubmit}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this book from your collection.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;