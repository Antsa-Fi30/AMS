import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/shared/Login";
import Register from "./pages/shared/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
