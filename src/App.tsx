import { SignIn } from "./features/signin/SignIn";
import { Profile } from "./features/profile/Profile";
import About from "./features/about/About";
import { Leaderboard } from "./features/leaderboard/leadrboard";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./features/signup/SignUp";
import Home from "./features/home/Home";
import SpellingLetters from "./features/game/spellingLetters";
import Games from "./features/games/Games";
import NavBar from "./components/NavBar/NavBar";
import Wordle from "./features/game//Wordle/wordle";
import { useSelector } from "react-redux";
import { selectUser, signOut } from "./features/signin/signinSlice";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useAppDispatch } from "./app/hooks";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const navigation = {
  brand: { name: "Signy", to: "/" },
  links: [
    { name: "Home", to: "/" },
    { name: "Games", to: "/games" },
    { name: "Account", to: "/profile" },
  ],
};
const { brand, links } = navigation;

function App() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  if (user?.access_token) {
    const token = user?.access_token;
    const decoded = jwt_decode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp! < currentTime) {
      dispatch(signOut());
      window.location.href = "/";
    }
  }

  return (
    <Router>
      <div className="App">
        <NavBar brand={brand} links={links} />
        <ReactNotifications />
        <header className="App-header">
          <Routes>
            {/* 
                List of routes with respective views
            */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/games/spellingLetters"
              element={<SpellingLetters />}
            />
            <Route path="/games/wordle" element={<Wordle />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
