import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./Layouts/Layout";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Slots } from "./Pages/SlotManagement/SlotManagement";
import { ReserveSlot } from "./Pages/Reservations/ReserveSlot/ReserveSlot";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all pages inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<ReserveSlot />} />
          <Route path="records" element={<Slots />} />
          <Route path="management" element={<Slots />} />
          <Route path="analysis" element={<Slots />} />
          <Route path="settings" element={<Slots />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
