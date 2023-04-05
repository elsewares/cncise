import './App.css';
import {Copyright} from './components/Copyright';

import React, {useState, useEffect} from "react";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {TextField} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Oswald',
      'Fira Sans',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(', ')
  }
});

function App() {
  
  const [email, setEmail] = useState('');
  
  async function handleOnClick() {
    console.log(email);
    const res = await fetch('https://api.openai.com/v1/edits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'input': email,
        'instruction': 'Make this email concise with a professional tone.',
        'n': 5
      })
    });
    const data = await res.json();
    console.log(data);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h3" color="inherit" noWrap>cncise</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Stack
          sx={{pt: 4, pl: 5, pr: 5}}
          width={'100%'}
          direction="column"
          spacing={2}
          justifyContent="right"
        >
          <TextField
            id="outlined-multiline-static"
            label="Email for Review"
            multiline
            minRows={8}
            fullWidth={true}
            placeholder={"Paste your email here"}
            defaultValue={''}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Button variant="outlined" onClick={handleOnClick}>Make it Concise</Button>
        </Stack>
      </main>
      {/* Footer */}
      <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Make email concise again, one email at a time.
        </Typography>
        <Copyright/>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
