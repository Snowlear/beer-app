import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import TopBar from "../TopBar";
import { useAppContext } from "../../context/appContext";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { getTitle } = useAppContext();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Divider />
      <List>
        <Link component={RouterLink} to={`/`}>
          <ListItem disablePadding>
            <ListItemButton selected={getTitle() === "Home"}>
              <ListItemIcon>
                <HomeIcon
                  color={getTitle() === "Home" ? "primary" : "action"}
                />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link component={RouterLink} to={`/beer`}>
          <ListItem disablePadding>
            <ListItemButton selected={getTitle() === "Beer List"}>
              <ListItemIcon>
                <SportsBar
                  color={getTitle() === "Beer List" ? "primary" : "action"}
                />
              </ListItemIcon>
              <ListItemText primary="Beer List" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar
        title={getTitle()}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, background: "#f7f7f7" },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
