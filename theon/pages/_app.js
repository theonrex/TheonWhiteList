import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  //   useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  // }, []);


  // useEffect(() => {
  //   typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  // }, [])

  return <Component {...pageProps} />
}

export default MyApp
