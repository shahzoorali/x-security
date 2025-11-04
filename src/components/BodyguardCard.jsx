import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Shield, Users } from 'lucide-react';

const BodyguardCard = ({ bodyguard }) => {
  const getAvailabilityColor = () => {
    switch (bodyguard.availabilityStatus) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'available_soon':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Link to={`/bodyguard/${bodyguard.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-3 active:scale-[0.98] transition-transform">
        <div className="flex p-4">
          <div className="flex-shrink-0">
            <img
              src={bodyguard.profileImage}
              alt={bodyguard.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            {bodyguard.verified && (
              <div className="absolute mt-16 ml-16">
                <div className="bg-blue-500 rounded-full p-1">
                  <Shield size={12} className="text-white" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 ml-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">{bodyguard.name}</h3>
                  {bodyguard.isTeam && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1">
                      <Users size={12} />
                      Team
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 ml-1">{bodyguard.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({bodyguard.totalReviews})</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-1" />
                <span>{bodyguard.distance}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={14} className="mr-1" />
                <span>{bodyguard.responseTime}</span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor()}`}>
                {bodyguard.availability}
              </span>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">${bodyguard.hourlyRate}/hr</div>
                {bodyguard.dailyRate && (
                  <div className="text-xs text-gray-500">${bodyguard.dailyRate}/day</div>
                )}
              </div>
            </div>
            
            {bodyguard.skills && bodyguard.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {bodyguard.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {skill}
                  </span>
                ))}
                {bodyguard.skills.length > 3 && (
                  <span className="px-2 py-0.5 text-gray-500 text-xs">+{bodyguard.skills.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BodyguardCard;

