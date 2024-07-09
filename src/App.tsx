import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ShaykhDet from "./pages/shaykhDet/ShaykhDet";
import LogIn from "./pages/login/LogIn";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/signUp/SignUp";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box bg={"main"} minH={"100vh"} color="white" overflowY={"hidden"}>
      <NavBar />

      {/* app routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shaykh" element={<ShaykhDet />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:profId" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
