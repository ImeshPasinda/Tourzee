import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Place from "./pages/place/Place";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Planatrip from "./pages/planatrip/planatrip";
import Emergencysafety from "./pages/EmergencySafety/emergencySafetyScreen";
import UrgentHelp from "./pages/UrgentHelpDesk/urgenthelp";
import Safetybeforego from "./pages/SafetyBeforeGo/safetybeforego";
import DestinationsEmergency from "./pages/DestinationsInEmergency/destinationsEmergency";
import Trip from "./pages/trip/Trip";
import TripPage from "./pages/tripPage/TripPage";
import VirtualTour from "./pages/virtualTour/VirtualTour";
import VirtualTourPlaces from "./pages/virtualTourPlaces/VirtualTourPlaces";
import VirtualTourMap from "./pages/virtualTourMap/VirtualTourMap"
import Register from "./pages/register/Register";
import SocialSharing from "./pages/SocialSharing/SocialSharing";
import SocialSharingMain from "./pages/SocialSharingMain/SocialSharingMain";
import CommentSection from "./pages/CommentSection/CommentSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<List />} />
        <Route path="/trips" element={<Trip />} />
        <Route path="/places/:id" element={<Place />} />
        <Route path="/trips/:id" element={<TripPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/planatrip" element={<Planatrip />} />
        <Route path="/emergencySafety" element={<Emergencysafety />} />
        <Route path="/urgentHelp" element={<UrgentHelp />} />
        <Route path="/safetybeforego" element={<Safetybeforego />} />
        <Route path="/destinationsemergency" element={<DestinationsEmergency />} />
        <Route path="/virtualTour" element={<VirtualTour />} />
        <Route path="/virtualTour/virtualTourPlaces" element={<VirtualTourPlaces />} />
        <Route path="/virtualTour/:id" element={<VirtualTourMap />} />
        <Route path="/socialsharing" element={<SocialSharing />} />
        <Route path="/socialmain" element={<SocialSharingMain />} />
        <Route path="/comments/:id" element={<CommentSection />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
