import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { selectUser, signOut } from "./features/signin/signinSlice";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useAppDispatch } from "./app/hooks";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Suspense } from "react";
import routes from "./routes";
import Loader from "./components/Loader/Loader";

const navigation = {
  brand: { name: "Signy", to: "/" },
  links: [
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
      <Suspense fallback={<Loader />}>
        <NavBar brand={brand} links={links} />
        <ReactNotifications />
        <Routes>
          {routes.map((route, i) => (
            <Route {...route} key={i}></Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
