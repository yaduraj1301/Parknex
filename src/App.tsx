import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./Layouts/Layout";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Slots } from "./Pages/Management/Management";
// import { BookingHistory } from "./Pages/Records/BookingHistory"; // 👈 Import here
import { Records } from "./Pages/Records/Records";
import { Settings } from "./Pages/Settings/Settings";
import { Reservations } from "./Pages/Reservations/Reservations"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all pages inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<Reservations/>} />
          <Route path="records" element={<Records />} /> {/* 👈 Use here */}
          <Route path="management" element={<Slots />} />
          <Route path="analysis" element={<Slots />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
