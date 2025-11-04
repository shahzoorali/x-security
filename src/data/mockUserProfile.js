// Mock user profile data - Indian Standards
export const mockUserProfile = {
  id: 'user-001',
  name: 'Rahul Mehta',
  email: 'rahul.mehta@example.com',
  phone: '+91 98765 43210',
  profileImage: 'https://ui-avatars.com/api/?name=Rahul+Mehta&background=0ea5e9&color=fff&size=200',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  location: 'Mumbai, Maharashtra',
  joinDate: '2023-01-15',
  verified: true,
  
  // Statistics
  stats: {
    totalBookings: 12,
    completedBookings: 10,
    cancelledBookings: 1,
    totalSpent: 125000,
    favoriteBodyguards: 3,
    memberSince: '2023'
  },
  
  // Payment Methods
  paymentMethods: [
    {
      id: 'pm-001',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'pm-002',
      type: 'upi',
      upiId: 'rahul.mehta@paytm',
      isDefault: false
    },
    {
      id: 'pm-003',
      type: 'wallet',
      provider: 'PhonePe',
      balance: 5000,
      isDefault: false
    }
  ],
  
  // Saved Addresses
  savedAddresses: [
    {
      id: 'addr-001',
      label: 'Home',
      address: '123, MG Road, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      isDefault: true
    },
    {
      id: 'addr-002',
      label: 'Office',
      address: '456, Business Park, Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      isDefault: false
    },
    {
      id: 'addr-003',
      label: 'Other',
      address: '789, Park Street, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      isDefault: false
    }
  ],
  
  // Preferences
  preferences: {
    language: 'Hindi',
    notifications: {
      bookingUpdates: true,
      promotions: false,
      reminders: true,
      securityAlerts: true
    },
    emergencyContact: {
      name: 'Priya Mehta',
      phone: '+91 98765 43211',
      relation: 'Spouse'
    }
  },
  
  // Recent Activity
  recentActivity: [
    {
      id: 'act-001',
      type: 'booking',
      message: 'Booking confirmed with Rajesh Kumar',
      date: '2024-01-12',
      time: '14:30'
    },
    {
      id: 'act-002',
      type: 'payment',
      message: 'Payment of ₹6,000 processed',
      date: '2024-01-12',
      time: '14:25'
    },
    {
      id: 'act-003',
      type: 'review',
      message: 'You reviewed Arjun Singh',
      date: '2024-01-10',
      time: '18:45'
    }
  ]
};

