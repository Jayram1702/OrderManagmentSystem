import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled, alpha } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import InputBase from "@mui/material/InputBase";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { url } from "../config";
import axios from "axios";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Layout from "../Layout/Layout";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Cookies from "js-cookie";
import moment from "moment";

const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	"& .MuiSwitch-track": {
		borderRadius: 22 / 2,
		"&:before, &:after": {
			content: '""',
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			width: 16,
			height: 16,
		},
		"&:before": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		"&:after": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "none",
		width: 16,
		height: 16,
		margin: 2,
	},
}));

// Theme for table row header

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

// Theme for Table Row Data

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

// Theme and styling for searchbar

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

// Styling for modal to create the user
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 25,
	p: 4,
};

//button style for add user
const buttonstyle = {
	display: "flex",
	float: "right",
};


export default function AdminUserInfo({ handleCloseModal }) {
	const initialValues = {
		fullName: "",
		mobileNumber: "",
		email: "",
		passward: "",
	};

	const validationSchema = Yup.object().shape({
		fullName: Yup.string()
			.matches(/^[a-zA-Z]{3,}$/, "Only alphabets accepted")
			.required("Name is required"),
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		mobileNumber: Yup.string()
			.matches(/^[0-9]{10}$/, "Invalid mobile number")
			.required("Phone number should be minimum 10 Digits"),
		passward: Yup.string()
			.matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
				"Password must have different characters"
			)
			.required("Invalid Password"),
	});

	//pagination and display data objects in the table
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	//function to change the page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	// function to set the rows of data to display
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	//function objects to open add user model by using hooks
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (values, { resetForm }) => {
		// event.preventDefault();
		console.log("Ram", values);
		await axios.post(url.API + "AddUser", values);
		console.log("sucesss", values);
		handleCloseModal();
		resetForm();
	};

	const [rowData, setRowData] = useState([]);
	const [actionBtnClicked, setActionBtnClicked] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	// Api to get the all the users data
	const getUserData = () => {
		axios
			// .get(url.API + "getUsers?search_result=" + searchValue)
			.get(url.API + "AllUsers")
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log("jay", res.data);
					Cookies.set('fullName');
					console.log("Ravi",searchValue)
					// const dateFormat = {...res.data.date.moment('YYYY-MM-DD')}
					// if(res.data.da)
					setRowData(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const name = Cookies.get('fullName')

	//Filtering the data in search bar
	const onChangeSearchValue = (e) => {
		axios
			.get(url.API + `Byname/${name}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
		setSearchValue(e.target.value);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		console.log('search',searchValue)
	};
	
// button to enable and disable the user
	const getActionStatus = (id, action) => {
		const path = action ? url.API + `${id}/Disable` : url.API + `${id}/Enable`;
		axios
			.post(path)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log("onOffbutton", actionBtnClicked);
					setActionBtnClicked(!actionBtnClicked);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

		// 'asc' or 'desc'
		const [sortOrder, setSortOrder] = useState("asc");
		// data to sort
		const [sortKey, setSortKey] = useState("");
	
		const sortByKey = (key) => {
			const sortedData = [...rowData].sort((a, b) => {
				if (a[key] < b[key]) {
					return sortOrder === "asc" ? -1 : 1;
				}
				if (a[key] > b[key]) {
					return sortOrder === "asc" ? 1 : -1;
				}
				return 0;
			});
			setRowData(sortedData);
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
			setSortKey(key);
		};


		//password state to enable and disbale
		const [showPassword, setShowPassword] = useState(false);
		const handleClickShowPassword = () => setShowPassword((show) => !show);
		const handleMouseDownPassword = (event) => {
			event.preventDefault();
		};
	
	
		//rendering everytime to get the data for serachvalue and button status
		useEffect(() => {
			getUserData();
		}, [actionBtnClicked, searchValue]);

	console.log("AdminUserDetails")

	return (
		<>
			<Layout />
			<div
				className="container"
				style={{
					position: "absolute",
					top: "50%",
					maxWidth: "1340px",
					// right: '50%',
					transform: "translate(30%, -50%)",
				}}>
				<div className="row">
					{/* search bar content*/}
					<div className="col">
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
								onChange={onChangeSearchValue}
							/>
						</Search>
					</div>
					{/* Add user content */}
					<div className="col">
						<Button
							variant="contained"
							size="medium"
							onClick={handleOpen}
							sx={buttonstyle}>
							Add User
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}>
								<Form>
									<Box sx={style}>
										<Grid container direction={"column"} spacing={2}>
											<Grid item>
												<Field
													as={TextField}
													name="fullName"
													required
													fullWidth
													id="fullName"
													label="Full Name"
												/>
											</Grid>
											<Grid item>
												<Field
													as={TextField}
													required
													fullWidth
													id="mobileNumber"
													label="Phone Number"
													name="mobileNumber"
												/>
											</Grid>
											<Grid item>
												<Field
													as={TextField}
													required
													fullWidth
													id="email"
													label="Email Address"
													name="email"
													autoComplete="email"
												/>
											</Grid>
											<Grid item>
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
											</Grid>
											<Grid item>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}>
													<Button variant="contained" onClick={handleClose}>
														Cancel
													</Button>
													<Button
														type="submit"
														variant="contained"
														color="primary">
														Signup
													</Button>
												</div>
											</Grid>
										</Grid>
									</Box>
								</Form>
							</Formik>
						</Modal>
					</div>
				</div>
				<br />
				{/* table to display the user in the admin dahsboard */}
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ width: "100%" }}>
					<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<StyledTableRow sx={{ textAlign: "right" }}>
									<StyledTableCell onClick={() => sortByKey("fullName")} sx={{width:150, textAlign:'center'}}>
									FullName
									{sortKey === "fullName" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "fullName" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
									<StyledTableCell onClick={() => sortByKey("email")} sx={{width:150, textAlign:'center'}}>
									Email
									{sortKey === "email" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "email" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
									<StyledTableCell onClick={() => sortByKey("date")} sx={{width:150, textAlign:'center'}}>
									Date
									{sortKey === "date" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "date" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
									<StyledTableCell onClick={() => sortByKey("mobileNumber")} sx={{width:150, textAlign:'center'}}>
									Mobile Number
									{sortKey === "mobileNumber" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "mobileNumber" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
									<StyledTableCell onClick={() => sortByKey("deportment")}sx={{width:150, textAlign:'center'}}>
									Role
									{sortKey === "deportment" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "dportment" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
									<StyledTableCell sx={{width:150, textAlign:'center'}} >Action</StyledTableCell>
								</StyledTableRow>
							</TableHead>
							<TableBody>
								{rowData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => (
										<StyledTableRow key={row.id}>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.fullName}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.email}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{moment(row.date).format('YYYY-MM-DD')}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.mobileNumber}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.deportment}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>
												<FormControlLabel
													control={
														<Android12Switch
															checked={row.activeInactiveStatus}
															onClick={() => {
																getActionStatus(
																	row.id,
																	row.activeInactiveStatus
																);
															}}
														/>
													}
												/>
											</StyledTableCell>
										</StyledTableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					{/* Pagination and rows to limit the data and display */}
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rowData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		</>
	);
}
