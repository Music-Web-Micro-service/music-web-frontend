import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import TrackTable from "../components/TrackTable";

interface Music {
  id: number;
  title: string;
  artist: string;
}

// TODO: This is only used for placeholder
const DownloadHistory: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<Music>({
    id: 1,
    title: "Song Name",
    artist: "Artist Name",
  });
  const [history, setHistory] = useState<Music[]>([
    {id: 2, title: "Song 1", artist: "Artist 1"},
    {id: 3, title: "Song 2", artist: "Artist 2"},
  ]);

  return (
    <Box sx={{padding: 3}}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        History
      </Typography>
      <br />
      <TrackTable tracks={[]} />
      <List>
        {history.map((song) => (
          <ListItem key={song.id}>
            <ListItemAvatar>
              <Avatar variant="square" sx={{borderRadius: "3%"}}>
                <HeadphonesIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={song.title}
              secondary={song.artist}
              primaryTypographyProps={{variant: "subtitle1"}}
              secondaryTypographyProps={{variant: "subtitle2", color: "text.secondary"}}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DownloadHistory;
