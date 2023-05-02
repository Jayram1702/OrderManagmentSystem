import React from 'react'

import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();

	const handleSignupClick = () => {
		navigate("/signup"); // navigate to signup page
	};

  return (
    <div>
      <img style={{width:500, height:500}} src='https://previews.123rf.com/images/pavlostv/pavlostv1805/pavlostv180500401/101741080-oops-404-error-page-not-found-futuristic-robot-concept-%E2%80%93-vector.jpg' alt='Not Found 404' />
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
    </div>
  )
}
