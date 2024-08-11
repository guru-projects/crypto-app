import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
  } from '@mui/material/styles';
  import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Carousel from './Carousel';
  
  let theme = createTheme({
    typography: {
    h2:{
        fontWeight: 600
    },
}
  });
  theme = responsiveFontSizes(theme);


// Banner Component
const Banner = () => {
  return (
    <div className="bg-[url('../../bg.jpg')] h-96">
        <ThemeProvider theme={theme} >
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%', // Optional: Assuming you want white text over the background
          }}>
            <div className='text-center'>
                <Typography variant="h2" >
                  Welcome to Crypto App
                </Typography>
                <Typography variant="subtitle2">
                  This is a simple React app to fetch cryptocurrency prices.
                </Typography>
            </div>
            <Carousel />
          </Container>
        </ThemeProvider>
    </div>
  );
};

export default Banner;
