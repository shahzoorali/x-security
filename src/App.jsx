import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BodyguardDetailPage from './pages/BodyguardDetailPage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bodyguard/:id" element={<BodyguardDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;

