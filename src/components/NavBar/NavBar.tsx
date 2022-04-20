import {
  Li,
  Brand,
  Navbar,
  // Ul,
  // Ur,
  Dropdown,
  DropCont,
  Input,
  MobileBrand,
  LiMobile,
} from "./NavBar.styled.js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSignIn, signOut } from "../../features/signin/signinSlice"; //use to check if user is signed in
import { ReactComponent as Signy } from "./signy.svg";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";

const NavBar = (props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}) => {
  const isAuth = useAppSelector(selectSignIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { brand, links } = props;
  const [width, setWidth] = useState(window.innerWidth);
  const NavLinks: any = () => {
    return (
      <>
        <div
          style={{
            width: "100%",
            display: "flex",
            marginLeft: "5%",
            justifyContent: "space-evenly",
          }}
        >
          {links.map((link: { name: string; to: string }) => {
            if (!isAuth && link.name === "Account") {
              if (window.innerHeight > 800) {
                return [
                  <Li key="Sign-In">
                    <a href="/signin">Sign In</a>
                  </Li>,
                ];
              } else {
                return [
                  <LiMobile key="Sign-In">
                    <a href="/signin">Sign In</a>
                  </LiMobile>,
                ];
              }
            } else {
              if (window.innerHeight > 800) {
                return (
                  <Li key={link.name}>
                    <a href={link.to}>{link.name}</a>
                  </Li>
                );
              } else {
                return (
                  <LiMobile key={link.name}>
                    <a href={link.to}>{link.name}</a>
                  </LiMobile>
                );
              }
            }
          })}
          <div className={styles.dropdown}>
            <span style={{ cursor: "pointer", fontSize: "2em" }}>...</span>
            {window.innerWidth > 1019 ? (
              <div className={styles.dropContentRight}>
                <DropLinks />
              </div>
            ) : (
              <div className={styles.dropContentLeft}>
                <DropLinks />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  var DropLinks: any = () => {
    const links = [
      <p style={{ cursor: "pointer" }} onClick={() => navigate("/leaderboard")}>
        Leaderboards
      </p>,
      <p></p>,
      <p style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>
        About Us
      </p>,
      <p></p>,
      <p style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
        Sign Up
      </p>,
    ];
    if (isAuth) {
      const links = [
        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboards
        </p>,
        <p></p>,
        <p style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>
          About Us
        </p>,
      ];
      return [
        links,
        <p></p>,
        <p
          onClick={() => {
            dispatch(signOut());
            navigate("/");
          }}
        >
          Sign Out
        </p>,
      ];
    } else {
      return links;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });
  return (
    <>
      <Navbar>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "2%",
            marginTop: "1%",
            paddingBottom: "1%",
          }}
          onClick={() => navigate("/")}
        >
          <Signy />
          {window.innerHeight > 800 ? (
            <Brand href={brand.to}>{brand.name}</Brand>
          ) : (
            <MobileBrand href={brand.to}>{brand.name}</MobileBrand>
          )}
        </div>
        <NavLinks />
      </Navbar>
    </>
  );
};

function dropdown() {
  let content = document.getElementById("content");
  if (content) {
    if (
      window.getComputedStyle(content).getPropertyValue("display") === "none"
    ) {
      content.style.display = "block";
    } else if (content?.style.display === "block") {
      content.style.display = "none";
    }
  }
}

export default NavBar;
