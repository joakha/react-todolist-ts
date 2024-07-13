import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

const Home = (): ReactElement => {

    return (
        <>
            <Container maxWidth="xl">
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Simple Todolist
                        </Typography>
                    </Toolbar>
                </AppBar>
                <h1>Welcome to my app!</h1>
            </Container>
        </>
    )

}

export default Home;