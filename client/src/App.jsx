import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPanel from "./pages/StudentPanel";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
