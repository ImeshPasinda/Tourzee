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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/places" element={<List/>}/>
        <Route path="/trips" element={<Trip/>}/>
        <Route path="/places/:id" element={<Place/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/planatrip" element={<Planatrip/>}/>
        <Route path="/emergencySafety" element={<Emergencysafety/>}/>
        <Route path="/urgentHelp" element={<UrgentHelp/>}/>
        <Route path="/safetybeforego" element={<Safetybeforego/>}/>
        <Route path="/destinationsemergency" element={<DestinationsEmergency/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
