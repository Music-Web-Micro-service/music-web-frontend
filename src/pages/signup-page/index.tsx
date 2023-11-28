import { Google } from "@mui/icons-material";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React from "react";


interface SignUpTextFieldProps {
  label: string;
  placeholder: string;
}

let SignUpTextFieldStyle: React.CSSProperties = {
  width: "80%",
  marginBottom: "20px",

};


function SignUpTextField(props: SignUpTextFieldProps){
  return (
    <Box sx={{ SignUpTextFieldStyle }}>
      <Typography variant="h6" fontSize={"12px"} fontWeight={700}>{ props.label}</Typography>
      <TextField fullWidth placeholder={ props.placeholder}></TextField>  
    </Box>
  );
};

export default function SignUpPage() {
  const [email, setEmail] = React.useState("");
  const [valid, setValid] = React.useState(true);
  const emailTypingHandleer = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };
    
  // const [password, setPassword] = React.useState("");
  //password validation check shouldn't be frontend

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };


  return (
    <Box className="signup-container" sx={{width:1, height:1}}>
      <Box className="signup-content" sx={{ width: 1, height: 1, display: "flex", justifyContent: "center" }}>
        <Box sx={{width:"40%", marginTop:"50px", padding:"30px", display:"flex", flexDirection:"column"}}>   
          <Typography variant="h4" className="signup-title" fontWeight={700} marginBottom={"20px"} textAlign={"center"}>
          Sign up to start listening
          </Typography>

          <Button
            startIcon={<Google />}
            variant="outlined"
            sx={{height: "45px", textTransform: "none", width: "80%", alignSelf: "center"}}
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
          />
          <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={SignUpTextFieldStyle}>
              <Typography variant="h6" fontSize={"12px"} fontWeight={700}>Email Address</Typography> 
              {valid ? <TextField onChange={emailTypingHandleer} fullWidth placeholder="name@domain.com"></TextField> : <TextField onChange={emailTypingHandleer} fullWidth placeholder="name@domain.com" helperText={"This email is invalid. Make sure it's written like example@email.com"} error></TextField>}          
            </Box>
            <Box sx={SignUpTextFieldStyle}>
              <Typography variant="h6" fontSize={"12px"} fontWeight={700}>What should we call you?</Typography>
              <TextField fullWidth placeholder="Enter a profile name"></TextField>
            </Box>
            
            <Box sx={SignUpTextFieldStyle}>
              <Typography variant="h6" fontSize={"12px"} fontWeight={700}>Password</Typography>
              <TextField fullWidth placeholder="Enter a password"></TextField>
            </Box>
                      
            <Box sx={SignUpTextFieldStyle}>
              <Typography variant="h6" fontSize={"12px"} fontWeight={700}>Date of Birth</Typography>
              <TextField fullWidth placeholder="DD/MM/YYYY"></TextField>  

            </Box>

            <Button variant="contained" sx={{width:"80%", height:"50px"}}>Sign Up</Button>             
          </form>
         
                  
        
        </Box>
        
       
      </Box>
    
    </Box>
  );
}
