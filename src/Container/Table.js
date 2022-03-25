import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

function createTableData(name, ticker, price, count, haveInUSD) {
  return { name, ticker, price, count, haveInUSD };
}

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

export default function BasicTable(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    ticker: '',
    count: '',
  });
  const [removeValues, setRemoveValues] = useState({
    name: '',
    ticker: '',
    count: '',
  });

  useEffect(() => {
    const remove = async () => {
      await axios.delete(
        `http://${process.env.BACK_IP}:8000/api/v1/coins/${removeValues.ticker}`
      );
    };
    if (removeValues.ticker !== '') {
      remove();
      setRemoveValues({
        name: '',
        ticker: '',
        count: '',
      });
      window.location.reload();
    }
  }, [removeValues]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const { data } = props;
  const rows = data.map((d) => {
    return createTableData(
      d['name'],
      d['ticker'],
      d['price'],
      d['count'],
      d['haveInUSD']
    );
  });
  //  const tableData = createTableData(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Ticker</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">USD</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.ticker}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.haveInUSD}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    setRemoveValues({
                      name: `${row.name}`,
                      ticker: `${row.ticker}`,
                      count: `${row.count}`,
                    });
                  }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            key="add"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell colSpan={5} align="right">
              <Paper>
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                  <OutlinedInput
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                  <FormHelperText>Name</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                  <OutlinedInput
                    value={values.ticker}
                    onChange={handleChange('ticker')}
                  />
                  <FormHelperText>Ticker</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                  <OutlinedInput
                    value={values.count}
                    onChange={handleChange('count')}
                  />
                  <FormHelperText>Amount</FormHelperText>
                </FormControl>
              </Paper>
            </TableCell>

            <TableCell>
              <Button
                variant="contained"
                className={classes.button}
                onClick={async () => {
                  await axios.post(`http:/${process.env.BACK_IP}:8000/api/v1/coins/`, {
                    name: values.name,
                    ticker: values.ticker,
                    count: values.count,
                  });
                  window.location.reload();
                }}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
