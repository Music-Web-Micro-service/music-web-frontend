import React from "react";
import {ButtonBase, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/GetApp";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {Link, useLocation} from "react-router-dom";
import "./Nav.css";

const Nav: React.FC = () => {
  const location = useLocation();

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="container">
      <div className="nav-sidebar">
        <div className="nav-header">MelodyBay</div>
        <List>
          <ButtonBase component={Link} to="/" className={`button-base ${getActiveClass("/")}`}>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </ButtonBase>
          <ButtonBase
            component={Link}
            to="/favorite"
            className={`button-base ${getActiveClass("/favorite")}`}
          >
            <ListItem>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Favorite" />
            </ListItem>
          </ButtonBase>
          <ButtonBase
            component={Link}
            to="/download-history"
            className={`button-base ${getActiveClass("/download-history")}`}
          >
            <ListItem>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Download History" />
            </ListItem>
          </ButtonBase>
          <Divider />
          <ButtonBase
            component={Link}
            to="/new-playlist"
            className={`button-base ${getActiveClass("/new-playlist")}`}
          >
            <ListItem>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="New Playlist" />
            </ListItem>
          </ButtonBase>
        </List>
      </div>
    </div>
  );
};

export default Nav;
