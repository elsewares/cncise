import './App.css';
import {Copyright} from './components/Copyright';
import React, {useState, useEffect, useRef} from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Paper, TextField} from "@mui/material";

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
  const [recipient, setRecipient] = useState('');
  const [intent, setIntent] = useState('');
  const [responses, setResponses] = useState([]);
  const focusRef = useRef();
  
  useEffect(() => {
    focusRef.current.focus();
  }, []);
  
  async function handleOnClick() {
    const res = await fetch('https://api.openai.com/v1/edits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        'model': 'text-davinci-edit-001',
        'input': email,
        'instruction': `Compose thoughtful response to the input, addressed to ${recipient} that expresses ${intent}`,
        'n': 3
      })
    });
    
    const data = await res.json();
    setResponses(data.choices);
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
            label="Email for Repsonse"
            multiline
            minRows={8}
            fullWidth={true}
            placeholder={"Paste your email here"}
            ref={focusRef}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              id="recipient"
              label="Recipient"
              onChange={(event) => setRecipient(event.target.value)}
              value={recipient}
              />
            <TextField
              id="intent"
              label="Intent"
              onChange={(event) => setIntent(event.target.value)}
              value={intent}
              />
          </Stack>
          <Button variant="outlined" onClick={handleOnClick}>Respond</Button>
          {responses.map((response, index) =>
            <Paper elevation={3} key={index} sx={{p: 2, bgcolor: 'background.paper'}}>
              {response.text}
            </Paper>
          )}
        </Stack>
      </main>
      {/* Footer */}
      <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Be concise, one email at a time.
        </Typography>
        <Copyright/>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
