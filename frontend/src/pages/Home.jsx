import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Button, Container, Grid, Card, CardContent, Typography, TextField, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import Footer from '../components/Footer';
import { Security } from '@mui/icons-material';
import LearnMore from '../components/LearnMore';
import { Link } from 'react-router-dom';
import NewsletterSubscription from '../components/NewsletterSubscription';
import HeaderHome from '../components/HeaderHome';
import Chatbot from '../components/Buyer/Header/Chatbot';

// Import images
import productIMG1 from '../assets/HomeImg/cream.jpg';
import productIMG2 from '../assets/HomeImg/shell.jpg';
import productIMG3 from '../assets/HomeImg/milk.jpg';
import uploadedImage from '../assets/HomeImg/CoconutTree.jpg';
import coco from '../assets/HomeImg/coco.jpg';
import coco1 from '../assets/HomeImg/coco1.jpg';
import coco2 from '../assets/HomeImg/coco2.jpg';
import pineappleImg from '../assets/HomeImg/pineappleImg.jpg';
import bananaImg from '../assets/HomeImg/bananaImg.jpg';
import pepperImg from '../assets/HomeImg/pepperImg.jpg';
import papayaImg from '../assets/HomeImg/papayaImg.jpg';
import GMOImage from '../assets/HomeImg/GMO.jpg';
import availabilityImage from '../assets/HomeImg/24h.jpg';
import freshnessImage from '../assets/HomeImg/fresh.jpg';
import securityImage from '../assets/HomeImg/security.jpg';
import security1Image from '../assets/HomeImg/security1.jpg';
import wholesaleImage from '../assets/HomeImg/wholesale.jpg';
import Eco1 from '../assets/HomeImg/eco4.jpg';
import productIMG5 from '../assets/HomeImg/oil2.jpg';
import productIMG4 from '../assets/HomeImg/img22p.jpg';
import productIMG6 from '../assets/HomeImg/water.jpg';
import newImage from '../assets/HomeImg/bckgrund1.jpg';

const Home = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const handleScroll = () => {
    setHeaderExpanded(window.scrollY <= 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    
    <div className="flex flex-col min-h-screen">
      <div>
      <HeaderHome />
      
      {/* App Bar */}
      {/* <AppBar
        position="fixed"
        className={`transition-all duration-500 ${headerExpanded ? 'h-32' : 'h-16'}`}
        // sx={{ backgroundColor: '#DCFCE7' }} 
        sx={{ backgroundColor: '#FFFFFF' }} 
      > */}
        {/*<Toolbar className="flex justify-between">
          <div className="text-2xl font-bold text-black">Sobha Plantations</div>  */}
          {/* <div className={`transition-all duration-500 ${searchBarVisible ? 'w-full bg-white bg-opacity-50' : ''}`}>
            {searchBarVisible ? (
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                className="w-full"
              />
            ) : (
              <IconButton onClick={() => setSearchBarVisible(true)}>
                <SearchIcon sx={{ color: 'black' }} />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>*/}


      {/* Main Content */}
      <main className="flex-grow">
{/* Hero Section */}
<section className="relative flex flex-col items-start justify-center h-screen p-8 text-white">
  {/* Background Image */}
  <div
    style={{
      backgroundImage: `url(${uploadedImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1, // Ensure the background is behind other content
    }}
    className="animate-fade-in"
  />

  <h1 className="rotate-typing text-90px md:text-8xl lg:text-10xl"> 
    {Array.from("Sobha Plantations").map((letter, index) => (
      <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
        {letter === " " ? "\u00A0" : letter}
      </span>
    ))}
  </h1>

  <p className="max-w-2xl mt-2 text-lg md:text-xl"> {/* Decreased margin-top here */}
    Welcome to Sobha Plantation: Your trusted partner in premium coconut
    cultivation, ensuring quality and sustainability. Discover transparency,
    real-time updates, and the best coconut products straight from
    Kurunegala.
  </p>

  <Button
  component={Link}
        to="/learn-more"
  variant="outlined"
  className="mt-4"
  sx={{
    borderColor: 'white',
    color: 'white',
    padding: '12px 24px',
    marginLeft: '200px',
    marginTop: '8px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2), 0px 0px 10px rgba(255, 255, 255, 0.5)', // Added white glow
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      backgroundColor: 'white',
      color: 'white',
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3), 0px 0px 12px rgba(255, 255, 255, 0.7)', // Stronger shadow and white glow on hover
      transform: 'translateY(-2px)',
    },
  }}
  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
>
  Learn More
</Button>

  {/* Add Keyframes for Animation */}
  <style jsx>{`
    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: scale(1.1);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .animate-fade-in {
      animation: fade-in 5s ease forwards;
    }
  `}</style>
</section>


      {/* Inter-crops Section */}
      <section className="py-20 bg-gray-100">
        <Container>
          {/* Horizontal line above the title */}
          <hr className="mb-4 border-t-2 border-gray-400" />

          <h2 className="mb-10 text-5xl font-bold text-center text-gray-800">Inter-crops That Enrich Our Farms</h2>
          <p className="mb-10 text-lg text-center text-gray-600">
            Discover how our diverse inter-crops enhance productivity, sustainability, and flavor.
          </p>
          <Grid container spacing={4} className="mt-10">
            {[
              { name: 'Pineapple', img: pineappleImg, description: 'Juicy and sweet, perfect for fresh dishes.' },
              { name: 'Banana', img: bananaImg, description: 'Energy-boosting fruit packed with nutrients.' },
              { name: 'Papaya', img: papayaImg, description: 'Refreshing and rich in vitamins for healthy diets.' },
              { name: 'Pepper', img: pepperImg, description: 'Adds spice and flavor, enhancing any meal.' }
            ].map((crop) => (
              <Grid item xs={12} sm={6} md={3} key={crop.name}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                  className="hover:transform hover:scale-105"
                >
                  <CardMedia
                    component="img"
                    alt={crop.name}
                    height="160"
                    image={crop.img}
                    sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                  />
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1D6660' }}>
                      {crop.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="mt-2">
                      {crop.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      className="mt-4"
                      sx={{
                        borderColor: '#1D6660',
                        color: '#1D6660',
                        transition:'transform 0.3s ease, box-shadow 0.3s ease',
                       '&:hover': {
                        color: '#1D6660',
                        transform: 'translateY(-4px)',
                      },
                      }}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>


      {/* Newsletter Section */}
      
<NewsletterSubscription/>

    {/* Services Section */}
    <section className="py-20 bg-light-gray">
      <Container>
      <h2 
      className="mb-10 text-4xl font-semibold text-center" 
    >
      Explore Our Services...
    </h2>
    <Grid container spacing={4}>
      {/* First Row: Three Services */}
      {[ 
        { title: 'GMO-Free', imgSrc: GMOImage, description: 'We provide products that are 100% GMO-free, ensuring quality and safety.' },
        { title: '24/7 Availability', imgSrc: availabilityImage, description: 'Our services are available 24/7 to cater to your needs at any time.' },
        { title: 'Freshness', imgSrc: freshnessImage, description: 'Experience the freshness of our products, sourced daily.' }
      ].map(({ title, imgSrc, description }) => (
        <Grid item xs={12} sm={4} key={title}>
          <Card
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              height: '350px', // Set a fixed height for uniformity
              backgroundColor: 'white', // Default background color
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Increase shadow on hover
              e.currentTarget.classList.add('bg-gradient-to-r', 'from-green-300', 'to-blue-400'); // Add gradient classes on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'; // Scale back on mouse leave
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Reset shadow on mouse leave
              e.currentTarget.classList.remove('bg-gradient-to-r', 'from-green-300', 'to-blue-400'); // Remove gradient classes on mouse leave
            }}
          >
            <CardMedia
              component="img"
              alt={title}
              height="180" // Set a fixed height for uniformity
              image={imgSrc}
              style={{
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                objectFit: 'contain', // Ensure the entire image fits
                width: '100%',
              }}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '16px' }}>
              <Typography variant="h5" style={{ fontWeight: 'bold', color: '#1D6660', marginBottom: '10px' }}>{title}</Typography>
              <Typography variant="body2" color="textSecondary" style={{ flexGrow: 1, marginTop: '10px', fontWeight: 'bold' }}>{description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Second Row: Two Services Centered */}
    <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
      {[
        { title: 'Secure Checkpoint', imgSrc: securityImage, description: 'Your data and transactions are secure with our advanced checkpoints.' },
        { title: 'Eco-Friendly Practices', imgSrc: Eco1, description: 'We prioritize eco-friendly practices to protect our environment.' }
      ].map(({ title, imgSrc, description }) => (
        <Grid item xs={12} sm={4} key={title}>
          <Card
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '350px',
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Increase shadow on hover
              e.currentTarget.classList.add('bg-gradient-to-r', 'from-green-300', 'to-blue-400'); // Add gradient classes on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'; // Scale back on mouse leave
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Reset shadow on mouse leave
              e.currentTarget.classList.remove('bg-gradient-to-r', 'from-green-300', 'to-blue-400'); // Remove gradient classes on mouse leave
            }}
          >
            <CardMedia
              component="img"
              alt={title}
              height="180" // Set a fixed height for uniformity
              image={imgSrc}
              style={{
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                objectFit: 'contain', // Ensure the entire image fits
                width: '100%',
              }}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '16px' }}>
              <Typography variant="h5" style={{ fontWeight: 'bold', color: '#1D6660', marginBottom: '10px' }}>{title}</Typography>
              <Typography variant="body2" color="textSecondary" style={{ flexGrow: 1, marginTop: '10px', fontWeight: 'bold' }}>{description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</section>


{/* Products Section */}
<section className="py-1 bg-gray-100">
  <div className="container px-4 mx-auto lg:px-0">
  
  <h2 className="mb-1 text-4xl font-semibold text-center" >
    Our Coconut Products Collection </h2>
<div className="max-w-2xl mx-auto mb-12 text-center">
  {/* <p className="text-lg font-medium leading-relaxed text-gray-700 md:text-xl">
    Discover our curated selection of premium coconut-based products, where natural purity meets refined craftsmanship. Each product, from rich coconut oil to refreshing coconut water, is a testament to our dedication to quality, offering you the finest in tropical wellness and indulgence.
  </p> */}
</div>


    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 1500 }}
      loop={true} // Allow infinite looping of slides
      spaceBetween={30} // Space between slides
      slidesPerView={1} // Show one slide at a time on very small screens
      breakpoints={{
        640: {
          slidesPerView: 2, // Show two slides at small screens
        },
        1024: {
          slidesPerView: 3, // Show three slides at medium screens
        },
      }}
      className="w-full mt-10 h-96" // Increased height for better visibility
      style={{ overflow: "hidden" }} // Hide overflow to ensure smooth swiping
      // Add transition effect for smooth swiping
      onSlideChange={() => console.log("Slide changed")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {[ 
        { src: productIMG1, name: 'Coconut Cream', description: 'Rich cream for cooking and desserts.' },
        { src: productIMG2, name: 'Coconut Shells', description: 'Eco-friendly crafts and products.' },
        { src: productIMG3, name: 'Coconut Milk', description: 'Creamy milk for smoothies and curries.' },
        { src: productIMG4, name: 'Coconut Oil (Cold-Pressed)', description: 'Pure oil for cooking and skincare.' },
        { src: productIMG5, name: 'Coconut Oil (Refined)', description: 'Versatile oil for culinary needs.' },
        { src: productIMG6, name: 'Coconut Water', description: 'Refreshing natural electrolyte drink.' },
      ].map((product, index) => (
        <SwiperSlide key={index} className="relative">
          <img 
            src={product.src} 
            alt={`Product image for ${product.name}`} 
            className="object-cover w-full h-full transition-transform duration-300 rounded-lg shadow-md hover:scale-105" // Full width and height
          />
          {/* Caption for the product */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 rounded-b-lg">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-sm text-white">{product.description}</p> {/* Set text color to white */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>


      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto text-left mb-15">
      <h2 className="relative inline-block mb-10 text-4xl font-bold text-center text-gray-800">
      <span className="absolute inset-0 transition-all duration-300 transform scale-110 -translate-y-3 bg-gray-200 rounded-md opacity-30"></span>
      <span className="relative z-10 text-gray-800">Our Commitment</span>
      <span className="block w-full h-1 transition-transform duration-300 transform translate-y-2 bg-green-500 rounded-full"></span>
    </h2>
    </div>
        <Container style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', padding: '20px', 
          borderRadius: '12px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '95%' }}>
            
          <Grid container spacing={4}>

            {/* Left Column: Mission & Vision Text */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom className="mt-10">
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph style={{ fontSize: '18px', fontWeight: 'bold', color: '#1D6660' }}>
                "Leading with Sustainability, Quality, and Innovation."
              </Typography>
              <Typography variant="body1" paragraph>
                To be a leading coconut cultivation and product provider, recognized for our commitment to sustainability, quality, and innovation, while fostering economic growth and improving the livelihoods of our community and stakeholders.
              </Typography>
              
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph style={{ fontSize: '18px', fontWeight: 'bold', color: '#1D6660' }}>
                "Excellence in Cultivation, Quality in Every Product."
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to cultivate and produce the highest quality coconut products through sustainable practices, innovative solutions, and efficient operations. We aim to provide our customers with fresh, GMO-free products while ensuring transparency, fostering strong buyer relationships, and supporting environmental conservation. We strive to achieve excellence in every aspect of our business, from plantation management to market distribution, contributing to a greener and healthier planet.
              </Typography>
            </Grid>

            {/* Right Column: Images */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img 
                    src={coco} 
                    alt="Coconut Mite" 
                    className="object-cover w-full h-64" 
                    style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <img 
                    src={coco2} 
                    alt="Maintenance" 
                    className="object-cover w-full h-64 mt-4" 
                    style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                  />
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Container>
      </section>


        {/* Footer Section */}
        <Footer />
        <Chatbot/>



      </main>
      <style jsx>{`
  .rotate-typing {
    display: inline-block;
    overflow: hidden; /* Hides letters until they are revealed */
    white-space: nowrap;
  }

  @keyframes rotate {
    0% { 
      opacity: 0; 
      transform: rotateY(-90deg); /* Start rotated */
    }
    100% { 
      opacity: 1; 
      transform: rotateY(0); /* End upright */
    }
  }

  .rotate-typing span {
    display: inline-block;
    animation: rotate 0.5s forwards; /* Rotate animation */
  }
`}</style>

    </div>
    </div>
  );
};

export default Home;
