import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';
import Header from '../components/Header';
import { getBodyguardById } from '../data/mockBodyguards';

// Mock bookings data - Indian Standards
const mockBookings = [
  {
    id: 'booking-001',
    bodyguardId: 'bg-001',
    type: 'personal',
    date: '2024-01-15',
    startTime: '10:00',
    endTime: '14:00',
    location: '123 MG Road, Mumbai, Maharashtra',
    status: 'confirmed',
    total: 6000,
    createdAt: '2024-01-10'
  },
  {
    id: 'booking-002',
    bodyguardId: 'bg-008',
    type: 'event',
    date: '2024-01-20',
    startTime: '18:00',
    endTime: '23:00',
    location: 'Cubbon Park, Bangalore, Karnataka',
    status: 'pending',
    total: 30000,
    eventType: 'Concert',
    guestCount: 500,
    createdAt: '2024-01-12'
  },
  {
    id: 'booking-003',
    bodyguardId: 'bg-003',
    type: 'personal',
    date: '2024-01-08',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Indira Gandhi International Airport, Delhi',
    status: 'completed',
    total: 14000,
    createdAt: '2024-01-05'
  },
];

const BookingsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed', 'completed', 'cancelled'

  const filteredBookings = filter === 'all' 
    ? mockBookings 
    : mockBookings.filter(b => b.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <ClockIcon className="text-yellow-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-blue-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pb-4">
      <Header title="My Bookings" />

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium">No bookings found</p>
            <p className="text-gray-500 text-sm mt-2">Start by booking a bodyguard</p>
            <button
              onClick={() => navigate('/search')}
              className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Search Bodyguards
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => {
              const bodyguard = getBodyguardById(booking.bodyguardId);
              if (!bodyguard) return null;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={bodyguard.profileImage}
                      alt={bodyguard.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{bodyguard.name}</h3>
                          <p className="text-sm text-gray-600">
                            {booking.type === 'event' ? 'Event Security' : 'Personal Protection'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={14} className="mr-2" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-2" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-2" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                        {booking.type === 'event' && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{booking.eventType}</span>
                            {' • '}
                            <span>{booking.guestCount} guests</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <span className="text-sm text-gray-600">Total</span>
                          <div className="text-lg font-bold text-gray-900">₹{booking.total.toLocaleString('en-IN')}</div>
                        </div>
                        {booking.status === 'pending' && (
                          <button className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg font-medium text-sm">
                            View Details
                          </button>
                        )}
                        {booking.status === 'confirmed' && (
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm">
                            Contact Guard
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

