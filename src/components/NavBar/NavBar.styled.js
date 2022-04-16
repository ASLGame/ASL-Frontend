import styled from "styled-components";

export const Theme = {
  colors: {
    bg: `#fff`,
    dark: `#24292e`,
    light: `#EEEEEE`,
    red: `#ff5851`,
    purple: `#4D4CAC`,
    dropdown: `#F5F5FB`,
  },
  fonts: {
    body: `IBM Plex Sans, sans-serif`,
    heading: `Montserrat`,
  },
};

export const Navbar = styled.nav`
  background: ${Theme.colors.purple};
  font-family: ${Theme.fonts.heading};
  font-style: normal;
  color: ${Theme.colors.light};
  display: flex;
  align-items: center;
  width: 100%;
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
`;

export const Brand = styled.a`
  font-size: 25px;
  margin-left: 1rem;
  padding-right: 1rem;
`;

export const MobileBrand = styled.a`
  // font-size: 2px;
  margin-left: 1rem;
  padding-right: 1rem;
`;

// export const Ul = styled.ul`
//   // display: flex;
//   // flex-direction: row;
//   // flex-wrap: nowrap;
//   // overflow-x: auto;
//   // align-items: center;
//   // justify-items: flex-start;
//   // -webkit-overflow-scrolling: touch;
// `;

export const Dropdown = styled.ul``;

export const DropCont = styled.ul`
  background: ${Theme.colors.dropdown};
  border: solid ${Theme.colors.purple};
  display: none;
  height: 110px;
  width: 120px;
  color: black;
  position: absolute;
  left: 77%;
  padding: 12px 16px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  a {
    color: black;
    display: block;
  }
`;

export const Input = styled.input`
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  background: ${Theme.colors.purple};
  border: 0;
  box-shadow: 0;
  border-radius: 0px;
  font-size: 1.5em;
  color: white;
`;

// export const Ur = styled.ul`
//   display: flex;
//   flex-wrap: nowrap;
//   width: 100%;
//   overflow-x: hidden;
//   align-items: flex-start;
//   justify-content: space-evenly;
//   -webkit-overflow-scrolling: touch;
// `;

export const Li = styled.li`
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  height: 100%;
  font-size: 22px;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  display: flex;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px;
  text-decoration: none;
  white-space: nowrap;
`;

export const LiMobile = styled.li`
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  height: 100%;
  font-size: 14px;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  display: flex;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px;
  text-decoration: none;
  white-space: nowrap;
`;
