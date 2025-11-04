# X-Security - Bodyguard Booking Platform

A mobile-first web application prototype for booking bodyguards and security guards, similar to Uber but for personal protection services.

## Features

- **Search & Browse**: Search for bodyguards by name, skills, or location
- **Advanced Filtering**: Filter by availability, rating, price, and type (individual/team)
- **Detailed Profiles**: View comprehensive bodyguard profiles with skills, certifications, ratings, and pricing
- **Booking System**: Book bodyguards for personal protection or events
- **Booking Management**: View and manage your bookings with status tracking
- **Mobile-First Design**: Optimized for mobile devices with responsive layout

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BottomNav.jsx   # Bottom navigation bar
│   ├── Header.jsx      # Page header component
│   └── BodyguardCard.jsx # Bodyguard listing card
├── pages/              # Page components
│   ├── HomePage.jsx   # Home/dashboard
│   ├── SearchPage.jsx  # Search and filter bodyguards
│   ├── BodyguardDetailPage.jsx # Detailed bodyguard profile
│   ├── BookingPage.jsx # Booking form
│   └── BookingsPage.jsx # Booking history
├── data/               # Mock data
│   └── mockBodyguards.js # Bodyguard profiles and helper functions
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Mock Data

The app includes 10 mock bodyguard profiles with:
- Personal information (name, age, experience, location)
- Skills and certifications
- Pricing (hourly and daily rates)
- Availability status
- Ratings and reviews
- Specialties and languages
- Verification badges

Both individual bodyguards and security teams are included in the mock data.

## Features Overview

### Home Page
- Quick stats and overview
- Quick action buttons for personal/event booking
- Featured bodyguards (top rated, available now)

### Search Page
- Real-time search by name, skills, or location
- Advanced filters:
  - Availability status
  - Individual vs Team
  - Minimum rating
  - Maximum price
- Results with key information

### Bodyguard Detail Page
- Full profile view
- Skills, certifications, and specialties
- Pricing information
- Booking button
- Contact options

### Booking Page
- Select booking type (personal or event)
- Date and time selection
- Location input
- Event-specific fields (for event bookings)
- Pricing calculator
- Booking request submission

### Bookings Page
- View all bookings
- Filter by status (pending, confirmed, completed, cancelled)
- Booking details and contact options

## Development Notes

- The app uses mock data stored locally - no backend required
- All bookings are simulated (no actual API calls)
- Mobile-first responsive design
- Touch-friendly UI with proper spacing for mobile devices

## Future Enhancements

- Real backend integration
- User authentication
- Payment processing
- Real-time notifications
- Map integration for location selection
- Chat/messaging functionality
- Reviews and ratings system
- Push notifications

