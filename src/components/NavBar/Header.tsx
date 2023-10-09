import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as Signy } from "./signy.svg";
import { useNavigate, useLocation } from "react-router-dom";

function Header(props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}) {
  const brand: { name: string; to: string } = props?.brand;
  const links: Array<{ name: string; to: string }> = props?.links;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{
                color: "#c42b35",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
              PaperProps={{
                style: {
                  backgroundColor: "#fcf3f2",
                },
              }}
            >
              {links.map((page: any) => (
                <MenuItem
                  key={page?.name}
                  onClick={() => {
                    navigate(page?.to);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: page?.to === location?.pathname ? 700 : 400,
                      color: "#c42b35",
                    }}
                    textAlign="center"
                  >
                    {page?.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <IconButton
            // sx={{ display: { xs: "none", md: "flex" }, mr: 0 }}
            onClick={() => navigate("/")}
          >
            <Signy />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#c42b35",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {brand?.name}
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 0,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#c42b35",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {brand?.name}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {links?.map((page) => (
              <Button
                key={page?.name}
                onClick={() => {
                  navigate(page?.to);
                  handleCloseNavMenu();
                }}
                style={{
                  fontWeight: page?.to === location?.pathname ? 800 : 400,
                  color: "#c42b35",
                  fontSize: "18px",
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page?.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
