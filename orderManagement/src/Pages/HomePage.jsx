import * as React from "react";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate("/login"); // navigate to login page
	};

	const handleSignupClick = () => {
		navigate("/signup"); // navigate to signup page
	};

	return (
		<div className="App">
			{/* Header section */}
			<header
				className="header"
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}>
				<div className="logo">
					<img
						src="https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS3362.png"
						alt="Company Logo"
					/>
				</div>
				<nav
					className="nav"
					style={{
						position: "absolute",
						top: "20px",
						right: "20px",
					}}>
					<button
						className="login-btn"
						onClick={handleLoginClick}
						style={{
							backgroundColor: "transparent",
							color: "#5fc9af",
							border: "2px solid #5fc9af",
							borderRadius: "30px",
							padding: "10px 20px",
							marginLeft: "10px",
							fontSize: "18px",
							fontWeight: "bold",
							cursor: "pointer",
							transition: "all 0.3s ease-in-out",
							backgroundColor: "#5fc9af",
							color: "#000000",
						}}>
						Log in
					</button>
					<button
						className="signup-btn"
						onClick={handleSignupClick}
						style={{
							backgroundColor: "transparent",
							color: "#5fc9af",
							border: "2px solid #5fc9af",
							borderRadius: "30px",
							padding: "10px 20px",
							marginLeft: "10px",
							fontSize: "18px",
							fontWeight: "bold",
							cursor: "pointer",
							transition: "all 0.3s ease-in-out",
							backgroundColor: "#5fc9af",
							color: "#000000",
						}}>
						Sign up
					</button>
				</nav>
			</header>

			{/* Main section */}
			<main>
				<div className="hero-section">
					<div className="hero-content">
						<h1
							style={{
								display: "flex",
								fontSize: "50px",
								fontWeight: 600,
								fontFamily: "sans-serif",
								justifyContent: "center",
								backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
								color: "transparent",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
							}}>
							Welcome to online ordering system
						</h1>
						<p
							style={{
								display: "flex",
								fontSize: "20px",
								fontWeight: 600,
								fontFamily: "sans-serif",
								justifyContent: "center",
								backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
								color: "transparent",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
							}}>
							Order your favorite items and have them delivered right to your
							door.
						</p>
						<button
							className="order-now-btn"
							onClick={handleSignupClick}
							style={{
								backgroundColor: "transparent",
								color: "#907ac2",
								border: "2px solid #907ac2",
								borderRadius: "30px",
								padding: "10px 20px",
								marginLeft: "10px",
								fontSize: "18px",
								fontWeight: "bold",
								cursor: "pointer",
								transition: "all 0.3s ease-in-out",
							}}>
							Order Now
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
