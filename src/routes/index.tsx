import { lazy } from "react";
import { PathRouteProps } from "react-router-dom";
import { Path } from "../types/routes";

export interface R extends PathRouteProps {
  name: string;
  path: Path | string;
  protected?: boolean;
}

const Home = lazy(() => import("../features/home/Home"));
const About = lazy(() => import("../features/about/About"));
const HangMan = lazy(() => import("../features/game/games/HangMan/hangMan"));
const SpellingLetters = lazy(
  () => import("../features/game/games/spellingLetters/spellingLetters")
);
const SpellingWords = lazy(
  () => import("../features/game/games/spellingWords/spellingWords")
);
const Wordle = lazy(() => import("../features/game/games/Wordle/wordle"));
const Games = lazy(() => import("../features/games/Games"));
//const Leaderboard = lazy(() => import("../features/leaderboard/leaderboard"));
// const Profile = lazy(() => import("../features/profile/Profile"));
// const SignIn = lazy(() => import("../features/signin/SignIn"));
// const SignUp = lazy(() => import("../features/signup/SignUp"));
const HandSign = lazy(() => import("../features/HandSigns/HandSign"));
// const ForgotPasswordID = lazy(
//   () => import("../features/forgotPasswordID/forgotPasswordID")
// );
// const ForgotPassword = lazy(
//   () => import("../features/forgotPassword/forgotPassword")
// );

const routes: readonly R[] = [
  { element: <Home />, name: "Home", path: Path.Home },
  { element: <About />, name: "About", path: Path.About },
  { element: <HangMan />, name: "HangMan", path: Path.HangMan },
  {
    element: <SpellingLetters />,
    name: "SpellingLetters",
    path: Path.SpellingLetters,
  },
  {
    element: <SpellingWords />,
    name: "SpellingWords",
    path: Path.SpellingWords,
  },
  { element: <Wordle />, name: "Wordle", path: Path.Wordle },
  { element: <Games />, name: "Games", path: Path.Games },
  //{ element: <Leaderboard />, name: "Leaderboard", path: Path.Leaderboard },
  // { element: <Profile />, name: "Profile", path: Path.Profile },
  // { element: <SignIn />, name: "SignIn", path: Path.SignIn },
  // { element: <SignUp />, name: "SignUp", path: Path.SignUp },
  { element: <HandSign />, name: "HandSign", path: Path.HandSigns },
  // {
  //   element: <ForgotPasswordID />,
  //   name: "ForgotPasswordID",
  //   path: Path.ForgotPasswordID,
  // },
  // {
  //   element: <ForgotPassword />,
  //   name: "ForgotPassword",
  //   path: Path.ForgotPassword,
  // },
] as const;

export default routes;
