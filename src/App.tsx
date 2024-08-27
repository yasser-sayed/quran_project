import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/signUp/SignUp";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "./state-management/hooks";
import Settings from "./pages/settings/Settings";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { setArLang } from "./state-management/settingsSlice/settingsSlice";
import Reciter from "./pages/reciter/Reciter";
import SoundPlayer from "./components/sound/SoundPlayer";
import Search from "./pages/search/Search";
import Radio from "./pages/radio/Radio";
import { updateUser } from "./state-management/userDetSlice/userDetSlice";
import LikedReciters from "./pages/likedReciters/LikedReciters";
import PlayList from "./pages/playList/PlayList";

const App = () => {
  const { user, userLoading, isUpdated } = useAppSelector(
    (state) => state.userDet
  );
  const { lang, isEn } = useAppSelector((state) => state.settings);
  const { playList } = useAppSelector((state) => state.soundPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lang === "ar") {
      dispatch(setArLang());
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(updateUser({ userId: user.id as string, updates: user }));
    }
  }, [isUpdated]);

  return (
    <Box bg={"main"} minH={"100vh"} color="white">
      <NavBar />
      {/* app routes */}

      <div className="grid grid-cols-10">
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
            path="/profile/:userId/likedreciters"
            element={
              userLoading ? (
                <Loading divMinHight="100vh" loaderSize={20} />
              ) : user ? (
                <LikedReciters />
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
            path="/profile/:userId/playlist/:playListName"
            element={
              userLoading ? (
                <Loading divMinHight="100vh" loaderSize={20} />
              ) : user ? (
                <PlayList />
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

          <Route path="/search/" element={<Search />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/search/:srchVal" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>

      {/* audio SoundPlayer */}
      {playList.length ? <SoundPlayer /> : ""}
    </Box>
  );
};

export default App;
