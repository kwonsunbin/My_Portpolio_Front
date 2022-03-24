import Paper from '@mui/material/Paper';

function Header() {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        border: 0,
        mx: 'auto',
        fontSize: 50,
        p: 5,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      My Portpolio
    </Paper>
  );
}

export default Header;
