import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Button, Popover, Typography} from "@mui/material";
import SearchBar from "./search-bar";

export default function HomeTabs() {
  const [loginPop, setLoginPop] = useState(false);
  //标注位置
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const loginId = loginPop ? "login-popover" : undefined;
  const loginButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoginPop(true);
    setAnchorEl(event.currentTarget);
  };
  const loginButtonCloseHandler = () => {
    setAnchorEl(null);
    setLoginPop(false);
  };
  return (
    <Box sx={{width: "100%", height: "50px"}}>
      <Box
        sx={{
          display: "flex",
          borderBottom: 1,
          borderColor: "divider",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "1",
        }}
      >
        <SearchBar />
        <Box>
          <Button
            variant="contained"
            sx={{marginRight: "10px"}}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            sx={{marginRight: "20px"}}
            onClick={loginButtonHandler}
          >
            Log in
          </Button>
          <Popover
            id={loginId}
            open={loginPop}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            onClose={loginButtonCloseHandler}
          >
            <Typography sx={{p: 2}}>ESFESFESF TEST.</Typography>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
}
