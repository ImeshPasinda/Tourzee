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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/places" element={<List/>}/>
        <Route path="/places/:id" element={<Place/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/planatrip" element={<Planatrip/>}/>
        <Route path="/emergencySafety" element={<Emergencysafety/>}/>
        <Route path="/urgentHelp" element={<UrgentHelp/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
