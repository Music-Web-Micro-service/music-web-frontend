import {Box, TextField} from "@mui/material";
import {ChangeEvent, useRef} from "react";

export default function VerificationCodeInput() {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = event.target.value;

    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  return (
    <>
      {inputRefs.map((inputRef, index) => (
        <TextField
          key={index}
          inputRef={inputRef}
          onChange={(event) => handleInputChange(event, index)}
          variant="outlined"
          size="small"
          margin="dense"
          sx={{width: "40px", height: "40px", margin: "0 10px"}}
          inputProps={{inputMode: "numeric", pattern: "[0-9]", maxLength: 1, textalign: "center"}}
        />
      ))}
    </>
  );
}
