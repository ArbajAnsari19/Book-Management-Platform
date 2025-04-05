
import { Book } from '@/types/book';
import { Separator } from '@/components/ui/separator';
import { Calendar, BookOpen, Hash } from 'lucide-react';

interface BookDetailsProps {
  book: Book;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  const formattedDate = new Date(book.addedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="book-cover mx-auto max-w-[200px]">
            <div className={`book-spine book-spine-${(parseInt(book.id) % 5) + 1}`}></div>
            {book.coverImage ? (
              <img 
                src={book.coverImage} 
                alt={`Cover of ${book.title}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-secondary/60">
                <p className="font-serif text-lg text-center p-4 text-muted-foreground">
                  {book.title}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="font-serif text-2xl font-bold">{book.title}</h2>
          <p className="text-lg">by <span className="font-semibold">{book.author}</span></p>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-secondary rounded px-2 py-1 text-sm">
              {book.genre}
            </span>
            <span className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-1" /> {book.publicationYear}
            </span>
          </div>
          
          <Separator />
          
          {book.description && (
            <div>
              <h3 className="font-serif font-medium text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">
                {book.description}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">ISBN:</span>
              <span>{book.isbn}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Added on:</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
