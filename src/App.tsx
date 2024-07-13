import TodoList from "./components/TodoList";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useState } from "react";
import Home from "./components/Home"

function App() {

  const [tab, setValue] = useState<string>("1");

  const changeTab = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs style={{marginBottom:"30px"}} value={tab} onChange={changeTab} centered>
        <Tab label="Home" value="1" />
        <Tab label="Todolist" value="2" />
      </Tabs>

      {tab === "1" && <Home />}

      {tab === "2" &&
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container maxWidth="xl">
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">
                  Simple Todolist
                </Typography>
              </Toolbar>
            </AppBar>
            <TodoList />
          </Container>
        </LocalizationProvider>
      }
    </>
  )

}

export default App