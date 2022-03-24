import Paper from '@mui/material/Paper';

function Empty() {
  return (
    <Paper
      sx={{
        fontSize: 60,
        width: '100%',
        height: '100%',
        minHeight: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    ></Paper>
  );
}

export default Empty;
