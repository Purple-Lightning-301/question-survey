import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "./user.recoil";
import { Route, Routes, useNavigate } from 'react-router-dom';
import App from "./App";
import Naming from "./pages/Naming";
import Survey from "./pages/candidates/Survey";
import AdminPage from "./pages/admin/Admin";

function ProtectedPage(props) {
  const username = useRecoilValue(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (username === "") {
      navigate("/naming");
    }
  }, [username]);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/naming" element={<Naming />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/khao-sat" element={<Survey />} />
      </Routes>
    </React.Fragment>
  );
}

export default ProtectedPage;