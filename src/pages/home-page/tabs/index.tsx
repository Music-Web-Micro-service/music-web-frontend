import React, {useState} from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
  Checkbox,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  Link,
} from "@mui/material";
import SearchBar from "./search-bar";
import {Email, EmailOutlined, Google, Lock, Visibility, VisibilityOff} from "@mui/icons-material";
import VerificationCodeInput from "../VerificationCodeInput";

const loginModalStyle: React.CSSProperties = {
  top: "20%",
  left: "35%",
  right: "auto",
  bottom: "auto",
  width: "520px",
  height: "500px",
  marginRight: "-50%",
  // transform: "translate(-50%, -50%)",
};

const forgetPasswordModalStyle: React.CSSProperties = {
  top: "20%",
  left: "35%",
  right: "auto",
  bottom: "auto",
  width: "520px",
  height: "280px",
  marginRight: "-50%",
};

export default function HomeTabs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const handleCodeSent = () => {
    setIsCodeSent(!isCodeSent);
  };
  const handleForgetPassword = () => {
    setIsForgetPassword(!isForgetPassword);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleLogin = () => {
    console.log("login");
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
          <Button variant="contained" sx={{marginRight: "10px"}}>
            Sign up
          </Button>
          <Button onClick={handleModalOpen} variant="outlined" sx={{marginRight: "20px"}}>
            Log in
          </Button>

          <Modal
            open={modalOpen}
            style={isForgetPassword ? forgetPasswordModalStyle : loginModalStyle}
          >
            {/* {isCodeSent && isForgetPassword ? (<></>) : isForgetPassword ? <></> : <></>} */}
            {!isForgetPassword ? (
              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "20px 40px 20px 40px",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "background.paper",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h5" component="h2" marginBottom={4} fontWeight={700}>
                  Login to your account
                </Typography>
                <Button
                  startIcon={<Google />}
                  variant="outlined"
                  sx={{height: "45px", textTransform: "none"}}
                >
                  {" "}
                  Log in with Google
                </Button>
                <Divider
                  sx={{
                    width: "95%",
                    alignSelf: "center",
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <Typography sx={{opacity: 0.5}}>or continue with email</Typography>
                </Divider>
                <Box sx={{width: "90%", alignSelf: "center"}}>
                  <form onSubmit={handleLogin}>
                    <TextField
                      id="standard-basic"
                      label="Email"
                      sx={{width: "100%"}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControl
                      sx={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "100%",
                      }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        startAdornment={
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      sx={{marginBottom: "10px"}}
                    >
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                        onChange={handleRememberMe}
                        sx={{width: "100%"}}
                      />
                      <Link href="#" onClick={handleForgetPassword}>
                        <Typography
                          margin={"16px 0px 16px 0px"}
                          alignSelf={"center"}
                          whiteSpace={"nowrap"}
                        >
                          Forget password?
                        </Typography>{" "}
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      sx={{width: "1", marginBottom: "10px"}}
                      variant="contained"
                    >
                      Log in
                    </Button>
                  </form>
                </Box>

                <Typography variant="body2" textAlign={"center"}>
                  {" "}
                  Don't have an account?{" "}
                  <Link href="#" onClick={handleModalClose}>
                    Create an account
                  </Link>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "20px 40px 20px 40px",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "background.paper",
                  // alignItems: "center",
                }}
              >
                <Box sx={{marginBottom: "20px"}}>
                  <Typography variant="h5" marginBottom={"0px"} fontWeight={700}>
                    Forgot your password?
                  </Typography>
                  <Typography variant="body2" sx={{opacity: "50%"}}>
                    {isCodeSent
                      ? "Enter the code you received from your email address"
                      : "Enter your email address to get a code to reset your password"}
                  </Typography>
                </Box>
                {isCodeSent ? (
                  <>
                    <Box sx={{alignSelf: "center", margin: "20px 0px"}}>
                      <VerificationCodeInput></VerificationCodeInput>
                    </Box>
                    <Typography variant="body2" whiteSpace={"nowrap"} textAlign={"center"}>
                      <span style={{opacity: 0.5}}>Didn't receive a code? </span>
                      <Link href="#" onClick={handleCodeSent}>
                        <span style={{fontWeight: 700}}>Resend code</span>
                      </Link>
                    </Typography>
                  </>
                ) : (
                  <>
                    {" "}
                    <TextField
                      id="standard-basic"
                      label="Email"
                      sx={{width: "1", marginBottom: "20px"}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button sx={{width: "1"}} variant="contained" onClick={handleCodeSent}>
                      Send code
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}
