import { Link } from 'react-router-dom';
import { Search, Shield, Calendar, Star, TrendingUp, Users } from 'lucide-react';
import Header from '../components/Header';
import { mockBodyguards } from '../data/mockBodyguards';
import BodyguardCard from '../components/BodyguardCard';

const HomePage = () => {
  const featuredBodyguards = mockBodyguards
    .filter(bg => bg.rating >= 4.8)
    .slice(0, 3);
  
  const availableNow = mockBodyguards
    .filter(bg => bg.availabilityStatus === 'available')
    .slice(0, 3);

  return (
    <div className="pb-4">
      <Header title="X-Security" />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">Protection When You Need It</h2>
        <p className="text-primary-100 mb-6">Book professional bodyguards and security teams for personal use or events</p>
        
        <Link
          to="/search"
          className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          <Search size={20} />
          Search Bodyguards
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-4 grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-primary-600">{mockBodyguards.length}</div>
          <div className="text-xs text-gray-600 mt-1">Available Guards</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-green-600">4.8</div>
          <div className="text-xs text-gray-600 mt-1">Avg Rating</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-blue-600">&lt;15</div>
          <div className="text-xs text-gray-600 mt-1">Min Response</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/search?type=personal"
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm active:scale-[0.98]"
          >
            <Shield className="text-primary-600 mb-2" size={24} />
            <div className="font-semibold text-gray-900">Personal Protection</div>
            <div className="text-sm text-gray-600 mt-1">24/7 personal security</div>
          </Link>
          <Link
            to="/search?type=event"
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm active:scale-[0.98]"
          >
            <Calendar className="text-primary-600 mb-2" size={24} />
            <div className="font-semibold text-gray-900">Event Security</div>
            <div className="text-sm text-gray-600 mt-1">Teams for events</div>
          </Link>
        </div>
      </div>

      {/* Available Now */}
      {availableNow.length > 0 && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Available Now</h3>
            <Link to="/search?availability=available" className="text-primary-600 text-sm font-medium">
              See all
            </Link>
          </div>
          <div>
            {availableNow.map(bodyguard => (
              <BodyguardCard key={bodyguard.id} bodyguard={bodyguard} />
            ))}
          </div>
        </div>
      )}

      {/* Top Rated */}
      {featuredBodyguards.length > 0 && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Top Rated</h3>
            </div>
            <Link to="/search?sort=rating" className="text-primary-600 text-sm font-medium">
              See all
            </Link>
          </div>
          <div>
            {featuredBodyguards.map(bodyguard => (
              <BodyguardCard key={bodyguard.id} bodyguard={bodyguard} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

