import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../Nav";
import PlayMusicBar from "../../components/PlayMusicBar";
import { useTrack } from "../../hook/TrackHook";
import HomeTabs from "./tabs";


export default function HomePage() {
  return (
    <Box className="app-container" display={"flex"} flexDirection={"row"} width={1}>
      <Nav />
      <Box display={"flex"} flexDirection={"column"} sx={{width: window.innerWidth - 250}}>
        <HomeTabs></HomeTabs>
        <Box className="main-content">
          {/* Outlet makes render route */}
          <Outlet />
        </Box>
      </Box>
    </Box>

  );
}

//TODO fix this
// export default function HomePage() {
//   return (<TrackProvider>
//     <Box className="app-container" display={"flex"} flexDirection={"row"} width={1}>
//       <Nav />
//       <Box display={"flex"} flexDirection={"column"} sx={{width: window.innerWidth - 250}}>
//         <HomeTabs></HomeTabs>
//         <Box className="main-content">
//           {/* Outlet makes render route */}
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//     <MusicBarComponent />
//   </TrackProvider>
//   );
// }

const MusicBarComponent = () => {
  const {isPlaying} = useTrack();
  const [hasPlayed] = useState(true);
  return <>{isPlaying ? <PlayMusicBar /> : hasPlayed && <PlayMusicBar />}</>;
};