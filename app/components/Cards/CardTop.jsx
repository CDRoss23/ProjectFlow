import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900], // Color principal
    },
    secondary: {
      main: '#EF6C00',
    },
  },
});

function CardTop({ title }) {
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ width: "99%", 
                    maxWidth: "99vw", 
                    minWidth: 700,
                    height: 65,
                    backgroundColor: theme.palette.primary.main, 
                    color: 'white' }}
            className='MainCard'
    >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}

export default CardTop;
