import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Loading.json'; // Adjust path to your JSON

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        style={{ height: 300, width: 300}} // Adjust size as needed
      />
    </div>
  );
};

// Simple styles to center the loader on screen
const styles = {
  loaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Background color of the loading screen
    zIndex: 9999,
  },
};

export default Loader;