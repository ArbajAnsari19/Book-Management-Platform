
import { useState } from 'react';
import { Book } from '@/types/book';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BookDetails } from './BookDetails';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const spineColor = `book-spine-${(parseInt(book.id) % 5) + 1}`;
  
  // Format publication year
  const year = book.publicationYear ? `(${book.publicationYear})` : '';

  return (
    <>
      <Card className="book-card h-full flex flex-col overflow-hidden">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="book-cover mb-4">
            <div className={`book-spine ${spineColor}`}></div>
            {book.coverImage ? (
              <img 
                src={book.coverImage} 
                alt={`Cover of ${book.title}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-secondary/60">
                <p className="font-serif text-lg text-center p-2 text-muted-foreground">
                  {book.title}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-serif font-bold leading-tight text-base mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {book.author} {year}
            </p>
            
            <div className="bg-secondary rounded-sm text-xs inline-block px-2 py-0.5 mb-3">
              {book.genre}
            </div>
          </div>
          
          <div className="flex gap-1 mt-auto pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1"
              onClick={() => setShowDetails(true)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                console.log('Book passed to onEdit:', book); // Debugging log
                onEdit(book);
              }}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-1 text-destructive hover:text-destructive"
              onClick={() => {
                console.log('Book ID passed to onDelete:', book.id); // Debugging log
                onDelete(book.id);
              }}
            >
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
            <DialogDescription>
              Detailed information about this book
            </DialogDescription>
          </DialogHeader>
          <BookDetails book={book} />
        </DialogContent>
      </Dialog>
    </>
  );
};
