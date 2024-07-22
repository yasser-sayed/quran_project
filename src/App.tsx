import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
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
import Reciter from "./pages/reciter/Reciter";
import SoundPlayer from "./components/sound/SoundPlayer";

const App = () => {
  const { user, userLoading } = useAppSelector((state) => state.userDet);
  const { lang, isEn } = useAppSelector((state) => state.settings);
  const { playList } = useAppSelector((state) => state.soundPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lang === "ar") {
      dispatch(setArLang());
    }
  }, []);

  return (
    <Box bg={"main"} minH={"100vh"} color="white">
      <NavBar />
      {/* app routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reciter/:reciterId" element={<Reciter />} />
        <Route
          path="/login"
          element={
            userLoading ? (
              <Loading divMinHight="100vh" loaderSize={20} />
            ) : user ? (
              <PageNotFound
                heading={isEn ? "oops!" : "اوبس!"}
                text={
                  isEn
                    ? "sorry you need to logout first"
                    : "نأسف يجب عليك تسجيل الخروج اولا"
                }
              />
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
              <PageNotFound
                heading={isEn ? "oops!" : "اوبس!"}
                text={
                  isEn
                    ? "sorry you need to logout first"
                    : "نأسف يجب عليك تسجيل الخروج اولا"
                }
              />
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
              <PageNotFound
                heading={isEn ? "oops!" : "اوبس!"}
                text={
                  isEn
                    ? "sorry you need to login first"
                    : "نأسف يجب عليك تسجيل الدخول اولا"
                }
              />
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
              <PageNotFound
                heading={isEn ? "oops!" : "اوبس!"}
                text={
                  isEn
                    ? "sorry you need to login first"
                    : "نأسف يجب عليك تسجيل الدخول اولا"
                }
              />
            )
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      {/* audio SoundPlayer */}
      {playList.length ? <SoundPlayer /> : ""}
    </Box>
  );
};

export default App;
