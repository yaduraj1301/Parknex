import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./Layouts/Layout";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Slots } from "./Pages/SlotManagement/SlotManagement";
<<<<<<< HEAD
import { Reservations } from "./Pages/Reservations/Reservations";
=======
import { BookingHistory } from "./Pages/Records/BookingHistory"; // 👈 Import here
import { Records } from "./Pages/Records/Records";
>>>>>>> origin/dev

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all pages inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
<<<<<<< HEAD
          <Route path="reservations" element={<Reservations />} />
          <Route path="records" element={<Slots />} />
=======
          <Route path="reservations" element={<Slots />} />
          <Route path="records" element={<Records />} /> {/* 👈 Use here */}
>>>>>>> origin/dev
          <Route path="management" element={<Slots />} />
          <Route path="analysis" element={<Slots />} />
          <Route path="settings" element={<Slots />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
