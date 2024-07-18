import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ShaykhDet from "./pages/shaykhDet/ShaykhDet";
import LogIn from "./pages/login/LogIn";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/signUp/SignUp";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "./state-management/hooks";
import FavList from "./pages/favList/FavList";
import Settings from "./pages/settings/Settings";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { setArLang } from "./state-management/settingsSlice/settingsSlice";

const App = () => {
  const { user, userLoading } = useAppSelector((state) => state.userDet);
  const { lang } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lang === "ar") {
      dispatch(setArLang());
    }
  }, []);

  return (
    <Box bg={"main"} minH={"100vh"} color="white" overflowY={"hidden"}>
      <NavBar />

      {/* app routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shaykh" element={<ShaykhDet />} />
        <Route
          path="/login"
          element={
            userLoading ? (
              <Loading divMinHight="100vh" loaderSize={20} />
            ) : user ? (
              <PageNotFound />
            ) : (
              <LogIn />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userLoading ? (
              <Loading divMinHight="100vh" loaderSize={20} />
            ) : user ? (
              <PageNotFound />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/profile/:userId"
          element={
            userLoading ? (
              <Loading divMinHight="100vh" loaderSize={20} />
            ) : user ? (
              <Profile />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/favlist/:userId"
          element={
            userLoading ? (
              <Loading divMinHight="100vh" loaderSize={20} />
            ) : user ? (
              <FavList />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
