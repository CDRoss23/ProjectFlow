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

function CustomCard({ title, description, buttonText, onButtonClick }) {
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ width: "100%", 
                    maxWidth: "80vw", 
                    minWidth: 300,
                    height: 170,
                    backgroundColor: theme.palette.primary.main, 
                    color: 'white' }}
            className='MainCard'
    >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color='secondary' onClick={onButtonClick} variant="contained">
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default CustomCard;
