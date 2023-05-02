import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Field, Form, Formik, replace } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { url } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function LoginForm({ flag, setFlag }) {
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		passward: "",
	};

	//  validating login credentials
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		passward: Yup.string()
			.matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
				"Password must have different characters"
			)
			.required("Invalid Password"),
	});

	//Api function to submit the login crdentails

	const handleSubmit = (values, { resetForm }) => {
		console.log("hey", values);
		axios
			.post(url.API + "Login", values)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					Cookies.set("deportment", response.data.deportment, { expires: 10 });
					Cookies.set('id', response.data.id);
					toast.success(' Wow Login successfull!', {
						position: "top-left",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						});
						setTimeout(()=>{
							if (response.data.deportment === "Admin") {
								navigate("/admin", {replace: true});
							} else {
								navigate("/user",  {replace: true});
							}
						}, 400)
				}
				resetForm();
			})
			.catch((e) => {
				toast.error(' sorry Wrong Credentails!', {
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					});
				console.log(e);
			});
	};

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
					<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Welcome_heading.svg/1022px-Welcome_heading.svg.png" alt="welcome Img" />
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						<Form>
							<Box noValidate sx={{ mt: 1 }}>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
								/>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="passward"
									label="Password"
									type={showPassword ? "text" : "password"}
									id="password"
									autoComplete="current-password"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}>
									Sign In
								</Button>
								<Grid container>
									<Grid item>
											Don't have an account 
											<Link href ="/signup" variant="body2">
												Sign Up
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Form>
					</Formik>
					<ToastContainer
						position="top-left"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
