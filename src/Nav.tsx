import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {ButtonBase, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Nav.css";

import {DownloadOutlined, FavoriteBorderOutlined, HomeOutlined} from "@mui/icons-material";
import NewPlaylistDialog from "./pages/home-page/NewPlaylistDialog";

type Playlist = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
};

let playlistRoutes = [];
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
                <HomeOutlined />
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
                <FavoriteBorderOutlined />
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
                <DownloadOutlined />
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
