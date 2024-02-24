import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/GetApp";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {ButtonBase, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Nav.css";

import NewPlaylistDialog from "./pages/home-page/NewPlaylistDialog";
import {createPlaylist} from "../src/apis/PlaylistApis";

type Playlist = {
  id: number;
  name: string;
  description: string;
};

const Nav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);

  const getUserId = () => {
    // TODO: This is only a fake data, should be updated after adding login logic
    return 1;
  };

  const handleNewPlaylistClick = () => {
    setIsDialogOpen(true);
  };

  const handleCreatePlaylist = async (name: string, description: string) => {
    try {
      const userId = getUserId();
      const response = await createPlaylist(userId, name, description);
      const newPlaylist = response.data;

      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylistId(playlist.id);
    const playlistSlug = encodeURIComponent(playlist.name.replace(/\s+/g, "-").toLowerCase());
    navigate(`/playlist?list=${playlistSlug}`);
  };

  const getActiveClass = (path: string, playlistId?: number) => {
    if (location.pathname === path) {
      return "active";
    }

    if (playlistId && location.search.includes(`list=${playlistId}`)) {
      return "active";
    }

    return "";
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
            onClick={handleNewPlaylistClick}
            className={`button-base ${getActiveClass("/new-playlist")}`}
          >
            <ListItem>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="New Playlist" />
            </ListItem>
          </ButtonBase>
          {playlists.map((playlist) => (
            <ButtonBase
              onClick={() => handleSelectPlaylist(playlist)}
              className={`button-base ${getActiveClass("", playlist.id)}`}
              key={playlist.id}
            >
              <ListItem>
                <ListItemText primary={playlist.name} />
              </ListItem>
            </ButtonBase>
          ))}
        </List>
      </div>
      <NewPlaylistDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
};

export default Nav;
