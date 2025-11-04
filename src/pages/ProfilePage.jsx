import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  CreditCard, 
  Settings, 
  Bell, 
  LogOut, 
  Edit, 
  Plus,
  Check,
  Star,
  Clock,
  Wallet,
  TrendingUp
} from 'lucide-react';
import Header from '../components/Header';
import { mockUserProfile } from '../data/mockUserProfile';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const profile = mockUserProfile;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'card':
        return <CreditCard size={20} />;
      case 'upi':
        return <Wallet size={20} />;
      case 'wallet':
        return <Wallet size={20} />;
      default:
        return <CreditCard size={20} />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'payments', label: 'Payments' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="pb-4">
      <Header title="Profile" />

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white px-4 py-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
            />
            {profile.verified && (
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                <Shield className="text-primary-600" size={16} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              {profile.verified && (
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">Verified</span>
              )}
            </div>
            <p className="text-primary-100 mt-1">{profile.location}</p>
            <p className="text-primary-200 text-sm mt-1">Member since {profile.stats.memberSince}</p>
          </div>
          <button className="p-2 bg-white/20 rounded-lg">
            <Edit size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.totalBookings}</div>
            <div className="text-xs text-primary-100 mt-1">Total Bookings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.completedBookings}</div>
            <div className="text-xs text-primary-100 mt-1">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">₹{profile.stats.totalSpent.toLocaleString('en-IN')}</div>
            <div className="text-xs text-primary-100 mt-1">Total Spent</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="flex overflow-x-auto px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-gray-900 font-medium">{profile.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="text-gray-900 font-medium">{profile.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="text-gray-900 font-medium">{profile.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Date of Birth</div>
                    <div className="text-gray-900 font-medium">{formatDate(profile.dateOfBirth)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="text-gray-900 font-medium">{profile.gender}</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 border border-primary-600 text-primary-600 rounded-lg font-medium flex items-center justify-center gap-2">
                <Edit size={18} />
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center gap-2 text-primary-600 mb-1">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {profile.stats.totalBookings - profile.stats.completedBookings - profile.stats.cancelledBookings}
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <Check size={18} />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{profile.stats.completedBookings}</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-600 mb-1">
                    <Star size={18} />
                    <span className="text-sm font-medium">Favorites</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{profile.stats.favoriteBodyguards}</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <TrendingUp size={18} />
                    <span className="text-sm font-medium">Total Spent</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">₹{profile.stats.totalSpent.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {profile.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{activity.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(activity.date)} at {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <button className="flex items-center gap-2 text-primary-600 font-medium">
                  <Plus size={18} />
                  Add New
                </button>
              </div>
              <div className="space-y-3">
                {profile.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg ${
                      method.isDefault ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          method.isDefault ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getPaymentIcon(method.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {method.type === 'card' 
                              ? `${method.brand} •••• ${method.last4}`
                              : method.type === 'upi'
                              ? `UPI: ${method.upiId}`
                              : `${method.provider} Wallet`
                            }
                          </div>
                          {method.type === 'card' && (
                            <div className="text-sm text-gray-500">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </div>
                          )}
                          {method.type === 'wallet' && (
                            <div className="text-sm text-gray-500">
                              Balance: ₹{method.balance.toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
                <button className="flex items-center gap-2 text-primary-600 font-medium">
                  <Plus size={18} />
                  Add New
                </button>
              </div>
              <div className="space-y-3">
                {profile.savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border-2 rounded-lg ${
                      address.isDefault ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{address.label}</span>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.address}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </div>
                      </div>
                      <button className="text-primary-600">
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-3">
                {Object.entries(profile.preferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-500">
                        {key === 'bookingUpdates' && 'Get notified about booking status changes'}
                        {key === 'promotions' && 'Receive promotional offers and discounts'}
                        {key === 'reminders' && 'Booking reminders and upcoming appointments'}
                        {key === 'securityAlerts' && 'Important security and safety alerts'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        className="sr-only peer"
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="text-gray-900 font-medium">{profile.preferences.emergencyContact.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="text-gray-900 font-medium">{profile.preferences.emergencyContact.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Relation</div>
                  <div className="text-gray-900 font-medium">{profile.preferences.emergencyContact.relation}</div>
                </div>
                <button className="w-full mt-4 py-2 border border-primary-600 text-primary-600 rounded-lg font-medium">
                  Edit Emergency Contact
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between py-3 text-gray-700 hover:bg-gray-50 rounded-lg px-2">
                  <div className="flex items-center gap-3">
                    <Settings size={20} />
                    <span>Account Settings</span>
                  </div>
                  <span>›</span>
                </button>
                <button className="w-full flex items-center justify-between py-3 text-gray-700 hover:bg-gray-50 rounded-lg px-2">
                  <div className="flex items-center gap-3">
                    <Bell size={20} />
                    <span>Notification Settings</span>
                  </div>
                  <span>›</span>
                </button>
                <button className="w-full flex items-center justify-between py-3 text-gray-700 hover:bg-gray-50 rounded-lg px-2">
                  <div className="flex items-center gap-3">
                    <Shield size={20} />
                    <span>Privacy & Security</span>
                  </div>
                  <span>›</span>
                </button>
                <button className="w-full flex items-center justify-between py-3 text-red-600 hover:bg-red-50 rounded-lg px-2">
                  <div className="flex items-center gap-3">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </div>
                  <span>›</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

