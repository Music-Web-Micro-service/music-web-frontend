import React, {useState} from "react";
import {ButtonBase, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/GetApp";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Nav.css";

import NewPlaylistDialog from "./pages/NewPlaylistDialog";

type Playlist = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
};

const Nav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);

  const handleCreatePlaylist = (name: string, description: string, isPublic: boolean) => {
    const newPlaylist = {
      id: playlists.length + 1, // Simple ID assignment; replace with unique ID generation if needed
      name,
      description,
      isPublic,
    };
    // Add the new playlist to the list of playlists
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    setIsDialogOpen(false);
  };

  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylistId(playlist.id);
    // Create a slug from the playlist name
    const playlistSlug = encodeURIComponent(playlist.name.replace(/\s+/g, "-").toLowerCase());
    navigate(`/playlist?list=${playlistSlug}`);
  };

  const getActiveClass = (path: string, playlistId?: number) => {
    // Check if the current path or the selected playlist ID matches
    return location.pathname === path || playlistId === selectedPlaylistId ? "active" : "";
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
            onClick={() => setIsDialogOpen(true)}
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
