import Paper from '@mui/material/Paper';

function Bottom() {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        border: 0,
        mx: 'auto',
        fontSize: 50,
        p: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      This is a Bottom.
    </Paper>
  );
}

export default Bottom;
