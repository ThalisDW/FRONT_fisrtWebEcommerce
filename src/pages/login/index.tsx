import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, TextField, useMediaQuery } from "@mui/material";

let description = ''

const ErrorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {


  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{ backgroundColor: "rgba(255, 195, 217, 0.5)" }}
    >
      <DialogTitle>Erro no Login</DialogTitle>
      <DialogContent>
        <p>{description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {

    if (username.length < 5 || password.length < 6) {
        description = `Digite um usuário e senha válido.`
       return setError(true);
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!data.message && data.result.length === 0) {
        description = 'Usuário ou senha inválidos.'
        setError(true);
      } else if (data.message && data.result.length === 1) {
        const infosUser = data.result;
        infosUser.map((el: any) => {
          if (el.user_token != null) {
            const token = el.user_token;
            const user_id = el.user_id;
            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user_id);
            window.location.assign('/Home')
          }
        });
      } else {
        description = `Ocorreu um erro ao fazer login: ${data.result.name}`
        setError(true);
        console.log(`${data.result}`);
      }
    } catch (error) {
      console.error("Erro ao processar o login:", error);
      description = `Ocorreu um erro ao fazer login: ${error}`
      setError(true);
    }
  };

  const handleCloseErrorModal = () => {
    setError(false);
  };

  const isXsScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
    <Box width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} padding={0}>
        <Grid container padding={0} borderRadius={5} boxShadow={10} sx={{backgroundColor:"#ffa1c4", height:isXsScreen? "40vh": '60vh', width:isXsScreen? "75vw": '30vw'}} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <Grid item xs={12} padding={'none'} margin={0} textAlign={'center'}>
            <TextField id="outlined-basic" InputLabelProps={{style: {color:"#ff005d", borderColor: "#ff005d"}}} value={username} onChange={(e)=> setUsername(e.target.value)} label="Usuário" variant="outlined" />
            </Grid>
            <Grid item xs={12} padding={0} margin={0} textAlign={'center'}>
            <TextField id="outlined-basic" InputLabelProps={{style: {color:"#ff005d", borderColor: "#ff005d"}}} value={password} onChange={(e)=> setPassword(e.target.value)} label="Senha" variant="outlined" />
            </Grid>
            <Grid item xs={12} padding={0} margin={0} textAlign={'center'}>
            <Button variant="contained" onClick={handleLogin} color="success">Login</Button>
            </Grid>
            {error && <ErrorModal isOpen={error} onClose={handleCloseErrorModal} />}
        </Grid>
        </Box>
    </>
  );
};
