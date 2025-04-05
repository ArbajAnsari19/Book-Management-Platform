
import { useEffect, useState } from 'react';
import { Book, BookSort, SortOption } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, SortAsc, SortDesc, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BookFiltersProps {
  books: Book[];
  onSearch: (query: string) => void;
  onSort: (sort: BookSort) => void;
  onFilterGenre: (genre: string | null) => void;
  searchQuery: string;
  activeSort: BookSort;
  activeGenreFilter: string | null;
}

export const BookFilters = ({
  books,
  onSearch,
  onSort,
  onFilterGenre,
  searchQuery,
  activeSort,
  activeGenreFilter,
}: BookFiltersProps) => {
  const [search, setSearch] = useState(searchQuery);
  const [genres, setGenres] = useState<string[]>([]);

  // Extract unique genres from books
  useEffect(() => {
    const uniqueGenres = Array.from(new Set(books.map(book => book.genre))).sort();
    setGenres(uniqueGenres);
  }, [books]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearch('');
    onSearch('');
  };

  // Handle sort change
  const handleSortOptionChange = (value: string) => {
    onSort({
      ...activeSort,
      option: value as SortOption,
    });
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    onSort({
      ...activeSort,
      direction: activeSort.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Get human-readable sort option name
  const getSortOptionName = (option: SortOption): string => {
    switch (option) {
      case 'title': return 'Title';
      case 'author': return 'Author';
      case 'addedAt': return 'Date Added';
      case 'publicationYear': return 'Publication Year';
      default: return option;
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search books by title, author, or description..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 pr-10"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span>Sort: {getSortOptionName(activeSort.option)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup
                  value={activeSort.option}
                  onValueChange={handleSortOptionChange}
                >
                  <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="author">Author</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="addedAt">Date Added</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="publicationYear">Publication Year</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            title={`Sort ${activeSort.direction === 'asc' ? 'ascending' : 'descending'}`}
          >
            {activeSort.direction === 'asc' ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {genres.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Label className="text-sm font-medium">Filter by genre:</Label>
          
          <Button
            variant={activeGenreFilter === null ? "secondary" : "outline"}
            size="sm"
            onClick={() => onFilterGenre(null)}
          >
            All
          </Button>
          
          {genres.map(genre => (
            <Button
              key={genre}
              variant={activeGenreFilter === genre ? "secondary" : "outline"}
              size="sm"
              onClick={() => onFilterGenre(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
