import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Shield, Check, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { getBodyguardById } from '../data/mockBodyguards';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bodyguard = getBodyguardById(id);

  const [bookingType, setBookingType] = useState('personal'); // 'personal' or 'event'
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');

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

  const calculateHours = () => {
    if (startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const diff = (end - start) / (1000 * 60 * 60);
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const hours = calculateHours();
    if (hours >= 8 && bodyguard.dailyRate) {
      return bodyguard.dailyRate;
    }
    return hours * bodyguard.hourlyRate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the booking to a backend
    alert('Booking request submitted! Redirecting to bookings...');
    navigate('/bookings');
  };

  const isFormValid = () => {
    if (bookingType === 'personal') {
      return date && startTime && endTime && location;
    } else {
      return date && startTime && endTime && location && eventType && guestCount;
    }
  };

  return (
    <div className="pb-4">
      <Header 
        title="Book Bodyguard" 
        showBack 
        onBack={() => navigate(-1)} 
      />

      {/* Bodyguard Summary */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={bodyguard.profileImage}
            alt={bodyguard.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{bodyguard.name}</h3>
            <p className="text-sm text-gray-600">${bodyguard.hourlyRate}/hr • {bodyguard.rating} ⭐</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Booking Type */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Type</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setBookingType('personal')}
              className={`p-4 border-2 rounded-lg text-left ${
                bookingType === 'personal'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <Shield className="mb-2 text-primary-600" size={24} />
              <div className="font-semibold text-gray-900">Personal</div>
              <div className="text-sm text-gray-600 mt-1">Individual protection</div>
            </button>
            <button
              type="button"
              onClick={() => setBookingType('event')}
              className={`p-4 border-2 rounded-lg text-left ${
                bookingType === 'event'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <Users className="mb-2 text-primary-600" size={24} />
              <div className="font-semibold text-gray-900">Event</div>
              <div className="text-sm text-gray-600 mt-1">Event security</div>
            </button>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Date & Time</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>
            {startTime && endTime && calculateHours() > 0 && (
              <div className="text-sm text-gray-600">
                Duration: {calculateHours().toFixed(1)} hours
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter address or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        {/* Event-specific fields */}
        {bookingType === 'event' && (
          <>
            <div className="bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="concert">Concert</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="party">Private Party</option>
                    <option value="conference">Conference</option>
                    <option value="festival">Festival</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Guest Count</label>
                  <input
                    type="number"
                    placeholder="Number of guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Additional Notes */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes (Optional)</h3>
          <textarea
            placeholder="Any special requirements or instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Pricing Summary */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>
                {calculateHours() >= 8 && bodyguard.dailyRate 
                  ? 'Daily Rate (8+ hours)' 
                  : `${calculateHours().toFixed(1)} hours @ $${bodyguard.hourlyRate}/hr`}
              </span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg text-gray-900">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 pb-4">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              isFormValid()
                ? 'bg-primary-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Request Booking
            <ArrowRight size={20} />
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            You'll receive a confirmation once the bodyguard accepts your request
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;

