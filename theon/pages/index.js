import React from 'react'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from '../components/Navbar'
import HomeBanner from "../components/HomeBanner";
import Footer from "../components/Footer"
import Wallets from "../components/Wallets";

export default function Home() {


return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >

        <Navbar/>
        <HomeBanner/>
        <Wallets/>
    
      </main>

      <footer >
        <Footer/>
      </footer>
    </div>
  );
}