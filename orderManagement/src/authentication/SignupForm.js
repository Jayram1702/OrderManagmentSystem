import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { red } from "@mui/material/colors";
import { url } from "../config";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
	ErrorMessage: {
		color: red[500],
	},
});


export default function SignUp() {

  const navigate = useNavigate();

	const initialValues = {
		fullName: "",
		mobileNumber: "",
		email: "",
		passward: "",
	};

	// validating the feilds for the signup
	const validationSchema = Yup.object().shape({
		fullName: Yup.string()
			.matches(/^[a-zA-Z]{3,}$/, "Only alphabets accepted")
			.required("Name is required"),
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		mobileNumber: Yup.string()
			.matches("^[6789][0-9]{9}$", "Invalid mobile number")
			.required("Phone number should be minimum 10 Digits"),
		passward: Yup.string()
			.matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
				"Password must have different characters"
			)
			.required("Invalid Password"),
	});

	// Api function for validating the signup crdentials
	const handleSubmit = async (values, { resetForm }) => {
		// event.preventDefault();
		console.log("Ram", values);
		await axios
			.post(url.API + "UserSignUp", values)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setTimeout(() => {
						navigate("/login", { replace: true });
					}, 300);

					console.log("User Created");

					resetForm();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// to visible for the password
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTneRg2WVrQsuEBCXBjGHOy_vV57s2p6soL0Q&usqp=CAU" alt="signup img" />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						<Form>
							<Box noValidate sx={{ mt: 3 }}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Field
											as={TextField}
											autoComplete="given-name"
											name="fullName"
											required
											fullWidth
											id="fullName"
											label="Full Name"
											autoFocus
										/>
										<div style={{ color: "red" }}>
											<ErrorMessage name="fullName" />
										</div>
									</Grid>
									<Grid item xs={12}>
										<Field
											as={TextField}
											required
											fullWidth
											id="mobileNumber"
											label="Phone Number"
											name="mobileNumber"
										/>
										<div style={{ color: "red" }}>
											<ErrorMessage name="mobileNumber" />
										</div>
									</Grid>
									<Grid item xs={12}>
										<Field
											as={TextField}
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
										/>
										<div style={{ color: "red" }}>
											<ErrorMessage name="email" />
										</div>
									</Grid>
									<Grid item xs={12}>
										<Field
											as={TextField}
											required
											fullWidth
											name="passward"
											label="Password"
											type={showPassword ? "text" : "password"}
											id="password"
											autoComplete="new-password"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}>
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
																
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										<div style={{ color: "red" }}>
											<ErrorMessage name="password" />
										</div>
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}>
									Sign Up
								</Button>
								<Grid container justifyContent="flex">
									<Grid item>
										Already have an account
										<Link href="/login" variant="body2">
											Sign in
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Form>
					</Formik>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
