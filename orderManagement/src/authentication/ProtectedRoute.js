import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


// function for the routes to navigate based upon the roles.
const ProtectedRoute = (props) => {
	const navigate = useNavigate();
	const [isLogIn, setIsLogIn] = useState(false);
	const CheckRole = () => {
		const role = Cookies.get("deportment");
	// checking the role 
		if (role === undefined) {
			setIsLogIn(false);
			return navigate("/login");
		}
	// navigating based upon the role
		if (isLogIn && role === "Admin") {
			return navigate("/admin");
		} else if (isLogIn && role === "User") {
			return navigate("/user");
		}
		setIsLogIn(true);
	};
	useEffect(() => {
		CheckRole();
	}, [isLogIn]);
	return <React.Fragment>{isLogIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
