import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React, {useState} from "react";
import PlayTrack from "./PlayTrack";
import "../styles/TrackTable.css";

export type Track = {
  trackId: number;
  title: string;
  musicResourceId: number;
  musicUrl: string;
  imageUrl: string;
  artistId: number;
  artistName: string;
  duration: number;
};

type TrackTableProps = {
  tracks: Track[];
};

function TrackTable({tracks}: TrackTableProps) {
  const [sortField, setSortField] = useState<"name" | "time">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedTracks = tracks.sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === "time") {
      return sortDirection === "asc" ? a.duration - b.duration : b.duration - a.duration;
    }
    return 0;
  });

  const handleSortChange = (field: "name" | "time") => {
    if (field === sortField) {
      setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Table className="TrackTable">
      <TableHead className="TableHeader">
        <TableRow>
          <TableCell style={{display: "flex", justifyContent: "flex-end"}}>
            <Button style={{marginRight: "30px"}} onClick={() => handleSortChange("name")}>
              Name
            </Button>
            <Button onClick={() => handleSortChange("time")}>duration</Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="TableBody">
        {sortedTracks.map((track) => (
          <TableRow key={track.trackId}>
            <TableCell colSpan={3} style={{border: "none"}}>
              <PlayTrack
                trackId={track.trackId}
                musicResourceId={track.musicResourceId}
                title={track.title}
                artist={track.artistName}
                artistId={track.artistId}
                duration={track.duration}
                musicUrl={track.musicUrl}
                imageUrl={track.imageUrl}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TrackTable;
