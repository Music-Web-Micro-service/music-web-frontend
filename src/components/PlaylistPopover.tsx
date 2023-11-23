import React from "react";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Divider from "@mui/material/Divider";

interface Playlist {
  id: string;
  name: string;
}

interface PlaylistPopoverProps {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onPlaylistSelect: (playlistId: string) => void;
  onCreateNewPlaylist: () => void;
}

const PlaylistPopover: React.FC<PlaylistPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  playlists,
  onPlaylistSelect,
  onCreateNewPlaylist,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List dense>
        <ListItem
          button
          onClick={onCreateNewPlaylist}
          sx={{
            "& .MuiListItemIcon-root": {minWidth: "auto", marginRight: "8px"}, // Adjust the spacing here
          }}
        >
          <ListItemIcon>
            <PlaylistAddIcon sx={{color: "#1a1a1a"}} />
          </ListItemIcon>
          <ListItemText primary="Create playlist" />
        </ListItem>
        <Divider />
        {playlists.map((playlist) => (
          <ListItem button key={playlist.id} onClick={() => onPlaylistSelect(playlist.id)}>
            <ListItemText primary={playlist.name} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default PlaylistPopover;
