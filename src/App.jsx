import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetail from './pages/DestinationDetail';
import Maps from './pages/Maps';
import Msme from './pages/Msme';
import MsmeDetail from './pages/MsmeDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Culinary from './pages/Culinary';
import CulinaryDetail from './pages/CulinaryDetail';
import Planner from './pages/Planner';
import Profile from './pages/Profile';
import Accommodations from './pages/Accommodations';
import AccommodationDetail from './pages/AccommodationDetail';

function App() {
  return (
    <Router>
      <div className="flex-col min-h-screen w-full" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destinations" element={<Explore />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/msme" element={<Msme />} />
            <Route path="/msme/:id" element={<MsmeDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/culinary" element={<Culinary />} />
            <Route path="/culinary/:id" element={<CulinaryDetail />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/itinerary" element={<Planner />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/accommodations/:id" element={<AccommodationDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
