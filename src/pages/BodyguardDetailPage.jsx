import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Shield, Check, Users, Phone, MessageCircle, Calendar } from 'lucide-react';
import Header from '../components/Header';
import { getBodyguardById } from '../data/mockBodyguards';

const BodyguardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bodyguard = getBodyguardById(id);

  if (!bodyguard) {
    return (
      <div>
        <Header title="Not Found" showBack onBack={() => navigate('/')} />
        <div className="text-center py-12">
          <p className="text-gray-600">Bodyguard not found</p>
        </div>
      </div>
    );
  }

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
    <div className="pb-4">
      <Header 
        title={bodyguard.name} 
        showBack 
        onBack={() => navigate(-1)} 
      />

      {/* Profile Image and Basic Info */}
      <div className="bg-white">
        <div className="relative">
          <img
            src={bodyguard.profileImage}
            alt={bodyguard.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            {bodyguard.verified && (
              <div className="bg-white rounded-full p-2 shadow-lg">
                <Shield className="text-primary-600" size={20} />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">{bodyguard.name}</h2>
                {bodyguard.isTeam && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1">
                    <Users size={12} />
                    Team of {bodyguard.teamSize}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="text-lg font-semibold text-gray-900 ml-1">{bodyguard.rating}</span>
                <span className="text-gray-500 ml-1">({bodyguard.totalReviews} reviews)</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor()}`}>
              {bodyguard.availability}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">{bodyguard.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">{bodyguard.responseTime}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Shield size={16} className="mr-2" />
              <span className="text-sm">{bodyguard.experience}</span>
            </div>
            {bodyguard.age && (
              <div className="flex items-center text-gray-600">
                <Users size={16} className="mr-2" />
                <span className="text-sm">Age {bodyguard.age}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white mt-2 p-4 border-t border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">₹{bodyguard.hourlyRate.toLocaleString('en-IN')}<span className="text-base font-normal text-gray-600">/hour</span></div>
            {bodyguard.dailyRate && (
              <div className="text-lg text-gray-600 mt-1">₹{bodyguard.dailyRate.toLocaleString('en-IN')}<span className="text-sm">/day</span></div>
            )}
          </div>
          <button
            onClick={() => navigate(`/booking/${bodyguard.id}`)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Calendar size={20} />
            Book Now
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
        <p className="text-gray-600 leading-relaxed">{bodyguard.bio}</p>
      </div>

      {/* Skills */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {bodyguard.skills.map((skill, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {bodyguard.certifications && bodyguard.certifications.length > 0 && (
        <div className="bg-white mt-2 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
          <div className="space-y-2">
            {bodyguard.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center text-gray-700">
                <Check className="text-green-500 mr-2" size={18} />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {bodyguard.languages && bodyguard.languages.length > 0 && (
        <div className="bg-white mt-2 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {bodyguard.languages.map((lang, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Specialties */}
      {bodyguard.specialties && bodyguard.specialties.length > 0 && (
        <div className="bg-white mt-2 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {bodyguard.specialties.map((specialty, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Verification Badges */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification</h3>
        <div className="space-y-2">
          {bodyguard.verified && (
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-2" size={18} />
              <span className="text-sm">Verified Professional</span>
            </div>
          )}
          {bodyguard.backgroundCheck && (
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-2" size={18} />
              <span className="text-sm">Background Checked</span>
            </div>
          )}
          {bodyguard.insurance && (
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-2" size={18} />
              <span className="text-sm">Insured</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <MessageCircle size={20} />
          Message
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Phone size={20} />
          Call
        </button>
        <button
          onClick={() => navigate(`/booking/${bodyguard.id}`)}
          className="flex-2 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BodyguardDetailPage;

