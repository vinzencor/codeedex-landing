import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DesktopScreen } from "./components/DesktopScreen/DesktopScreen";
import { Desktop as OurWorks } from "./components/OurWorks/OurWorks";
import { CaseStudy } from "./components/CaseStudy/CaseStudy";
import { AdminPortal } from "./components/Admin/AdminPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesktopScreen />} />
        <Route path="/our-works" element={<OurWorks />} />
        <Route path="/case-study/:projectId" element={<CaseStudy />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
