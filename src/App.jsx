import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewUser from "./components/NewUser.jsx";
import UserProfile from "./components/UserProfile.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createUser" element={<NewUser />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
