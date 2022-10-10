import React from 'react'
import styles from "../styles/Home.module.css";
import HomeBanner from "../components/HomeBanner";
import Footer from "../components/Footer"
import Wallets from "../components/Wallets";

export default function Home({ children }) {
  return (
    <div>
    
      <main>
        <HomeBanner />
        <Wallets />
      </main>

     
    </div>
  );
}