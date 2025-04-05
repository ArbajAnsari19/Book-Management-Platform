
import { Book } from '@/types/book';
import { BookCard } from './BookCard';
import { Skeleton } from '@/components/ui/skeleton';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookGrid = ({ books, loading, onEdit, onDelete }: BookGridProps) => {
  // Create skeleton placeholders for loading state
  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <div key={`skeleton-${i}`} className="animate-pulse">
      <div className="rounded-md overflow-hidden">
        <Skeleton className="w-full aspect-[2/3]" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-8 w-full mt-4" />
        </div>
      </div>
    </div>
  ));

  // If loading, show skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {skeletons}
      </div>
    );
  }

  // If no books and not loading
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No books found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or add a new book to your collection.
        </p>
      </div>
    );
  }

  // Show the book grid
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-5">
      {books.map((book) => (
        <BookCard 
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
