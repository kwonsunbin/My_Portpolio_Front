import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Header from '../Component/Header';
import Empty from '../Component/Empty';
import Table from './Table';
import Piechart from './PieChart';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@mui/material/Paper';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  margin: {
    backgroundColor: 'pink',
  },
  button: {
    backgroundColor: 'pink !important',
    width: '100%',
    height: '100%',
    minHeight: '60px',
    color: 'black !important',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
      color: 'white !important',
    },
  },
}));

function Main() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const get = async () => {
      const result = await axios.get(`http://localhost:8000/api/v1/coins/`);
      setData(result.data.data);
    };
    const updatePrices = async () => {
      await axios.put(`http://localhost:8000/api/v1/coins/`);
    };
    if (update) {
      updatePrices();
      setUpdate(false);
      window.location.reload();
    }
    get();
  }, [update]);

  return (
    <Grid container alignItems="center" className={classes.margin}>
      <Grid xs={1} />
      <ThemeProvider theme={darkTheme}>
        <Grid xs={10} alignItems="center">
          <Grid xs={12} align="center">
            <Header />
          </Grid>
          <Grid container xs={12} align="center">
            <Grid xs={3}>
              <Paper
                sx={{
                  borderRadius: 0,
                  border: 0,
                  fontSize: 60,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              />
            </Grid>
            <Grid xs={6}>
              <Paper>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    setUpdate(true);
                  }}
                >
                  Price Update
                </Button>
              </Paper>
            </Grid>
            <Grid xs={3}>
              <Paper
                sx={{
                  borderRadius: 0,
                  border: 0,
                  fontSize: 60,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              />
            </Grid>
          </Grid>

          <Grid xs={12} align="center">
            <Piechart data={data} />
          </Grid>
          <Grid xs={12} align="center">
            <Table data={data} />
          </Grid>

          <Grid xs={12} align="center">
            <Empty />
          </Grid>
        </Grid>
      </ThemeProvider>
      <Grid xs={1} className={classes.margin} />
    </Grid>
  );
}

export default Main;
