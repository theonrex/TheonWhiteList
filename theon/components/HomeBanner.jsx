import React from "react";
import { useEffect, useState } from "react";
import ApePng from "../public/apes.png";
import DateCount from "./DateCount";
// import { WalletConnects } from "./WalletConnect";
import App from "../Cweb3modal/App"

const HomeBanner = () => {
	return (
    <div className="container rowx">
      <div className="col50 homebanner_col">
        <h1 className="homebanner_h1">
          Discover collect & sell
          <span className="home_banner_span"> Extraordinary NFTs</span>
        </h1>
        <p className="homebanner_p">
          The leading NFT Marketplace on EthereumHome to the next generation of
          digital creators.Discover the best NFT collections.
        </p>

        <a target="_blank" href="https://goerlifaucet.com/">
          {" "}
          Get Goerli Testnet Eth
        </a>
        <a href="/signin">
          <button className="explore_btn"></button>
          <button className="explore_btn"> Click to Join </button>
        </a>
        <br />
      </div>
      <div className="col50 banner_img">
        <img src={ApePng.src} alt="apenft" />

        <div>
          {" "}
          <App />
        </div>
      </div>
      <div className="presale_starts">
        <DateCount />
      </div>
    </div>
  );
};

export default HomeBanner;
