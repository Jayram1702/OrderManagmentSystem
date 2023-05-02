import "./App.css";
import LoginForm from "./authentication/LoginForm";
import SignupForm from "./authentication/SignupForm";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUserInfo from "./Pages/AdminUserInfo";
import { Route, Routes } from "react-router-dom";
import UserOrderInfo from "./Pages/UserOrderInfo";
import { UserDashboard } from "./Pages/UserDashboard";
import Cookies from "js-cookie";
import HomePage from './Pages/HomePage';
import ProtectedRoute from '../src/authentication/ProtectedRoute';
import { Navigate } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
	const role = Cookies.get('deportment')
	console.log("Suk1",role);

	return (
		<>
			<Routes>
				<Route path ="/" element={<HomePage />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/user" element={<UserDashboard />} />
				<Route path="/userinfo" element={<AdminUserInfo />} />
				<Route path="/orderinfo" element={<UserOrderInfo />} />
			</Routes> 

{/* <Routes>
				<Route path ="/" element={<HomePage />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />
				<Route path="/admin" element={
				role ==='Admin'?
				(<ProtectedRoute><AdminDashboard /></ProtectedRoute>)
				:<NotFoundPage /> } />
				<Route path="/user" element={
				role ==='User'?
				(<ProtectedRoute><UserDashboard /></ProtectedRoute>)
				:<NotFoundPage /> } />
				<Route path="/userinfo" element={
				role ==='Admin'?
				(<ProtectedRoute><AdminUserInfo /></ProtectedRoute>)
				:<NotFoundPage /> } />
				<Route path="/orderinfo" element={
				role ==='User'?
				(<ProtectedRoute><UserOrderInfo /></ProtectedRoute>)
				:<NotFoundPage /> } />
				<Route path="*" element ={
					<NotFoundPage />} />
			</Routes>  */}

		</>
	);
}

export default App;
