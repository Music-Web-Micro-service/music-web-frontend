import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {createPlaylist} from "../../apis/PlaylistApis";

interface NewPlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
}

const NewPlaylistDialog: React.FC<NewPlaylistDialogProps> = ({ open, onClose, onCreate }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const navigate = useNavigate();

  const getUserId = () => {
    // TODO: This is only a fake data, should be updated after adding login logic
    return 1;
  };

  const handleCreate = async () => {
    try {
      await onCreate(playlistName, playlistDescription);
      setPlaylistName("");
      setPlaylistDescription("");
      onClose();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Playlist</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Playlist Name"
          type="text"
          fullWidth
          variant="standard"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPlaylistDialog;
