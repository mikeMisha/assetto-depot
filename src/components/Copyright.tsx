import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography
      bgcolor="primary.dark"
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {`Copyright © Assetto Depot ${new Date().getFullYear()}`}
    </Typography>
  );
}
