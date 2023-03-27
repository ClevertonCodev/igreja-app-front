import React from "react";
import { Button } from "@mui/material";


interface Props {
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void,
    children?: React.ReactNode
  }
  
  function Botao({ onClick, type, children }: Props) {
    return (

      <Button 
      onClick={onClick}
      sx={{ marginTop: 1 }} 
      type={type}
      variant="outlined">
        {children}
      </Button>
    )
  }

export default Botao;