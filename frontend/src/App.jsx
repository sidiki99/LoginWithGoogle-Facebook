import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import GoogleLogin from "./GoogleLogin";
import Dashboard from "./Dashboard";

function App() {
  return (
    <GoogleOAuthProvider clientId="932365894491-7s1o62dciltcn8r7q20ihoijspbcckp8.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleLogin />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;