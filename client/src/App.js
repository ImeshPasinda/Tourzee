import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Planatrip from "./pages/planatrip/planatrip";
import Emergencysafety from "./pages/EmergencySafety/emergencySafetyScreen";
import UrgentHelp from "./pages/UrgentHelpDesk/urgenthelp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/places" element={<List/>}/>
        <Route path="/places/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/planatrip" element={<Planatrip/>}/>
        <Route path="/emergencySafety" element={<Emergencysafety/>}/>
        <Route path="/urgentHelp" element={<UrgentHelp/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
