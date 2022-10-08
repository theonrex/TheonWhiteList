import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import {WalletConnects} from "./WalletConnect";

function NavBar() {
	const router = useRouter();

	// ...
	return (
		<>
			<div className="navbar-bg">
				<>
					{["xl"].map((expand) => (
						<Navbar key={expand} expand={expand} className="mb-3 container">
							<Container fluid>
								<Navbar.Brand href="/"> TheonNFTS</Navbar.Brand>
								<div className="nav_t">
									<Navbar.Toggle
										aria-controls={`offcanvasNavbar-expand-${expand}`}
									/>
								</div>

								<Navbar.Offcanvas
									id={`offcanvasNavbar-expand-${expand}`}
									aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
									placement="end"
								>
									<Offcanvas.Header closeButton>
										<Offcanvas.Title
											id={`offcanvasNavbarLabel-expand-${expand}`}
										>
											TheonNFTS
										</Offcanvas.Title>
									</Offcanvas.Header>
									<Offcanvas.Body>
										<Nav className="justify-content-end flex-grow-1 pe-3">
											<Nav.Link
												href="/"
												className={
													"underline" +
													(router.pathname === "/" ? " active" : "")
												}
											>
												Home
											</Nav.Link>
											<Nav.Link
												href="/marketplace"
												className={
													router.pathname == "/marketplace" ? "active" : ""
												}
											>
												Marketplace
											</Nav.Link>
											<Nav.Link
												href="/collection"
												className={
													"underline" +
													(router.pathname === "/collection" ? " active" : "")
												}
											>
												Collection
											</Nav.Link>
											<Nav.Link
												href="/community"
												className={`${
													"underline" +
													(router.pathname === "/community" ? " active" : "")
												} `}
											>
												Community{" "}
											</Nav.Link>
											<Nav.Link
												href="/#"
												className={`${
													"underline" +
													(router.pathname === "/connectwallet"
														? " activebtn"
														: "")
												} `}
											>
												<Button className="orange-btn ">
													{" "}
													<WalletConnects />
												</Button>
											</Nav.Link>
										</Nav>
									</Offcanvas.Body>
								</Navbar.Offcanvas>
							</Container>
						</Navbar>
					))}
				</>
			</div>
		</>
	);
}

export default NavBar;
