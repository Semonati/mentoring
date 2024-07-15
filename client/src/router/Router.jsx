import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Highlight from "../components/Highlight";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/codeblock/:id" element={<Highlight />} />
    </Routes>
  );
};

export default Router;
