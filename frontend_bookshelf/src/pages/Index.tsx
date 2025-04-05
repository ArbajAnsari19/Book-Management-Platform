import { useAuth } from '@/context/AuthContext';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, LibraryBig, Search, Users } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If authenticated, show the dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Otherwise, show the landing page
  return (
    <div className="min-h-[80vh] flex flex-col">
      <section className="py-12 md:py-24 flex flex-col items-center text-center">
        <div className="animate-enter container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-tight">
              Your Personal Book Collection
            </h1>
            
            <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground">
              Keep track of your reading journey with our elegant digital bookshelf.
              Organize, discover, and celebrate your literary adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2">
              <Button className="gap-1" onClick={() => navigate('/login')}>
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/register')}>
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-center mb-8">
            Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <LibraryBig className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Library</h3>
              <p className="text-muted-foreground">
                Maintain a beautiful digital collection of all your books with covers, descriptions, and key details.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
              <p className="text-muted-foreground">
                Easily find books with powerful search and filtering capabilities by title, author, genre, and more.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Account</h3>
              <p className="text-muted-foreground">
                Create your account to access your library from anywhere and keep your collection secure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
