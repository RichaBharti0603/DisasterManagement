
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell, Users, Map, Heart, Home, User, Phone, LogIn, Settings, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Navigation items for the sidebar
  const navItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Alerts', icon: <Bell size={20} />, path: '/alerts' },
    { name: 'Shelters', icon: <Map size={20} />, path: '/shelters' },
    { name: 'Donation', icon: <Heart size={20} />, path: '/donation' },
    { name: 'Recovery', icon: <Shield size={20} />, path: '/recovery' },
    { name: 'Community', icon: <Users size={20} />, path: '/community' },
    { name: 'Help', icon: <Phone size={20} />, path: '/help' },
  ];

  // Navigation items that only appear when logged in
  const loggedInNavItems = [
    { name: 'Dashboard', icon: <AlertTriangle size={20} />, path: '/dashboard' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  // Admin navigation item (only visible for admins)
  const adminNavItem = { name: 'Admin', icon: <Settings size={20} />, path: '/admin' };

  // Function to check if the user is an admin
  const isAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile menu button */}
      <div className="fixed z-50 top-4 left-4 lg:hidden">
        <Button variant="outline" size="icon" onClick={toggleMenu} className="rounded-full">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground ${
          isMobile
            ? `fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-64 hidden lg:block'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <AlertTriangle className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold">DisasterHaven</span>
            </Link>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                onClick={closeMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className="pt-4 pb-2">
                  <div className="border-t border-sidebar-border" />
                </div>

                {loggedInNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                    onClick={closeMenu}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}

                {isAdmin() && (
                  <Link
                    to={adminNavItem.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      location.pathname === adminNavItem.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                    onClick={closeMenu}
                  >
                    <span className="mr-3">{adminNavItem.icon}</span>
                    {adminNavItem.name}
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('isAdmin');
                  toast({
                    title: "Logged out",
                    description: "You have been successfully logged out.",
                  });
                  window.location.href = '/';
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  window.location.href = '/login';
                  closeMenu();
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-10">
          {/* Overlay for mobile menu */}
          {isMobile && isMenuOpen && (
            <div
              className="fixed inset-0 z-30 bg-black bg-opacity-50"
              onClick={toggleMenu}
            ></div>
          )}
          {children}
        </main>
        <footer className="bg-sidebar py-4 px-6 text-center text-sm text-sidebar-foreground">
          <p>© 2023 DisasterHaven Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
