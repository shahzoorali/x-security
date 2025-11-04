import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              <Icon size={22} className={isActive ? 'text-primary-600' : 'text-gray-500'} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

