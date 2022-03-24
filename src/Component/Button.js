import Paper from '@mui/material/Paper';

function Button() {
  return (
    <Paper
      sx={{
        mx: 'auto',
        width: '80%',
        height: 30,
        p: 1,
        m: 1,
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      Button
    </Paper>
  );
}

export default Button;
