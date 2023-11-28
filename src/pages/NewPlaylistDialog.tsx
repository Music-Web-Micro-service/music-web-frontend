import React, {useState} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

interface NewPlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, isPublic: boolean) => void;
}

const NewPlaylistDialog: React.FC<NewPlaylistDialogProps> = ({open, onClose, onCreate}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleCreate = () => {
    onCreate(playlistName, playlistDescription, isPublic);
    setPlaylistName("");
    setPlaylistDescription("");
    setIsPublic(true);
    onClose();
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              name="public"
              color="primary"
            />
          }
          label="Public"
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
