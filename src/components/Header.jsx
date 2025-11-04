import { Menu, Bell } from 'lucide-react';

const Header = ({ title, showBack, onBack }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center">
          {showBack && onBack && (
            <button onClick={onBack} className="mr-3 p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-600">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

