import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
  } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Spline from '@splinetool/react-spline';
import { Container } from '@mui/material';
import Carousel from './Carousel';
  
  let theme = createTheme({
    typography: {
    h2:{
        fontWeight: 700
    },
}
  });
  theme = responsiveFontSizes(theme);


// Banner Component
const Banner = () => {
  return (
    <div className="bg-[url('../../bg3.jpg')] min-h-96 bg-cover bg-no-repeat">
        <ThemeProvider theme={theme} >
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '100px',
            justifyContent: 'space-around',
            height: '100%', // Optional: Assuming you want white text over the background
          }}>
            <div className='text-center z-10 mt-40 text-slate-900'>
                <Typography variant="h2">
                  Welcome to Crypto App
                </Typography>
                <Typography variant="subtitle2">
                  This is a simple React app to fetch cryptocurrency prices.
                </Typography>
            </div>
            <div className='lg:h-screen absolute pl-20 lg:w-max overflow-hidden -mt-80 lg:-mt-20  -ml-80 md:-ml-20 lg:ml-60'>
              <Spline scene="https://prod.spline.design/9WtVgbVcF7JH2oKo/scene.splinecode" />
            </div>
            <div className='mt-80 mb-10'><Carousel/></div>
          </Container>
        </ThemeProvider>
    </div>
  );
};

export default Banner;
