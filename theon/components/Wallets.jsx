import React from "react";
import TrustWalletLogo from "../public/trustwallet.png";
import BinanceLogo from "../public/binance.png";
import MetaMsakLogo from "../public/metamask.png";
import SafepalLogo from "../public/safepal.png";
import Marquee from "react-fast-marquee";

//Nft images
import Nft1 from "../public/nft1.png";
import Nft2 from "../public/nft2.png";
import Nft3 from '../public/nft3.png'
import Nft4 from '../public/nft4.png'
import Nft5 from '../public/nft5.png'
import Nft6 from '../public/nft6.png'
import Nft7 from "../public/apes.png";
import Nft8 from '../public/aped.png'



const Wallets = () => {
	return (
		<div className="container Trade_wallet">
			<h1 className="wallets_support">wallets we support</h1>
			<header className="Trade_wallet_header">
				Trade with the world's most trusted and fastest Wallets
			</header>
			<div className="rowx">
				<div className="wallet_container container">
					<div className="col25">
						<img src={TrustWalletLogo.src} alt="" />
						<p>Trust Wallet</p>
					</div>
					<div className="col25">
						<img src={BinanceLogo.src} alt="" />
						<p>Binance</p>
					</div>
					<div className="col25">
						<img src={MetaMsakLogo.src} alt="" />
						<p>MetaMask</p>
					</div>
					<div className="col25">
						<img src={SafepalLogo.src} alt="" />
						<p>SafePal Wallet</p>
					</div>
				</div>
			</div>
			<div className="Collection_nft">
				<h1>Our Collection</h1>
				<Marquee gradientWidth={0}>
					<img src={Nft1.src} alt="nft" />
					<img src={Nft2.src} alt="nft" />
					<img src={Nft3.src} alt="nft" />
					<img src={Nft4.src} alt="nft" />
					<img src={Nft5.src} alt="nft" />
					<img src={Nft6.src} alt="nft" />
					<img src={Nft7.src} alt="nft" />
					<img src={Nft8.src} alt="nft" />
				</Marquee>
			</div>
			<div className="rowx how_to">
				<header> Create And Sell Your NFTs </header>
				<div className="col33">
					<img src="https://img.icons8.com/nolan/64/wallet.png" />
					<h3>Set up your wallet</h3>{" "}
					<p>
						Once you’ve set up your wallet of choice, connect it to OpenSea by
						clicking the wallet icon in the top right corner. Learn about the
						wallets we support.
					</p>
				</div>
				<div className="col33">
					<img src="https://img.icons8.com/nolan/64/upload.png" />

					<h3>Upload & Create Collection</h3>
					<p>
						Upload your work then Click My Collections and set up your
						collection. Add social links, a description, profile & banner
						images, and set a secondary sales fee.
					</p>
				</div>
				<div className="col33">
					<img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-sale-ecommerce-kiranshastry-gradient-kiranshastry.png" />

					<h3>List them for sale</h3>
					<p>
						Choose between auctions, fixed-price listings, and declining-price
						listings. You choose how you want to sell your NFTs, and we help you
						sell them
					</p>
				</div>
			</div>
		</div>
	);
};

export default Wallets;
