import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import { styled, alpha } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import InputBase from "@mui/material/InputBase";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, Stack, TextField } from "@mui/material";
import UserOrderInfoModal from "./UserOrderInfoModal";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { url } from "../config";
import Paper from '@mui/material/Paper';
import Layout from "../Layout/Layout";
import Cookies from "js-cookie";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CustomerDetailsModal from "./CustomerDetailsModal";

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
	// spacing:'10px',
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
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

//Table objects
const data = [
	{
		id: 1,
		name: "Suraj",
		material: "Iron",
		quantity: 100,
		price: 50,
		status: "open",
	},
	{
		id: 2,
		name: "Anand",
		material: "Iron",
		quantity: 50,
		price: 25,
		status: "inprogress",
	},
	{
		id: 3,
		name: "madhav",
		material: "Iron",
		quantity: 80,
		price: 30,
		status: "open",
	},
	{
		id: 4,
		name: "raghu",
		material: "Iron",
		quantity: 75,
		price: 60,
		status: "completed",
	},
	{
		id: 5,
		name: "dheeraj",
		material: "Iron",
		quantity: 55,
		price: 18,
		status: "open",
	},
	{
		id: 6,
		name: "ravi",
		material: "Iron",
		quantity: 85,
		price: 60,
		status: "inprogress",
	},
	{
		id: 7,
		name: "ramya",
		material: "Iron",
		quantity: 55,
		price: 15,
		status: "completed",
	},
];

const userId = Cookies.get("id");

console.log(userId)

export default function UserOrderInfo({ handleCloseModal }) {
	const initialValues = {
		userId,
		materialName: "",
		price: "",
		quantity: "",
	};

	const [tableData, setTableData] = useState(data);

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

	// create state variables for each input
	const [rowData, setRowData] = useState();
	const [isEdit, setIsEdit] = useState(false);
	const [isView, setIsView] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	// APi function to create the order 
	const handleSubmit =(values, { resetForm }) => {
		console.log("ORDERSQ  SVGHS", values);
		axios
		.post(url.API + "OrderCreation", values)
		.then((response) => {
			Cookies.set('orderId', response.data.orderId)
			console.log(response.data);
			console.log( 'orderIds',orderId)
			resetForm();
		})
		.catch((e) => {
			console.log(e);
		});
		console.log(" ORDERS sucesss", values);
		handleCloseModal();
		resetForm();
	};

	const onChangeSearchValue = (e) => {
		setSearchValue(e.target.value);
	};

	// 'asc' or 'desc'
	const [sortOrder, setSortOrder] = useState("asc");
	// data to sort
	const [sortKey, setSortKey] = useState("");

	const sortByKey = (key) => {
		const sortedData = [...tableData].sort((a, b) => {
			if (a[key] < b[key]) {
				return sortOrder === "asc" ? -1 : 1;
			}
			if (a[key] > b[key]) {
				return sortOrder === "asc" ? 1 : -1;
			}
			return 0;
		});
		setTableData(sortedData);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		setSortKey(key);
	};

	const orderId = Cookies.get('orderId')
	
	// to get order details
	const getOrderData = () => {
		console.log("jayjkWVB");
		axios
			.get(url.API + `AllOrdersByUserId/${userId}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log("userOrder", res.data);
					setTableData(res.data);
					console.log(rowData);
				}
			})
			.catch((error) => {
				console.log("hjdvhaevgr error");
				console.log(error);
			});
	};

	useEffect(() => {
		getOrderData();
	}, []);

	const [showEditModal, setShowEditModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);

	function editHandleModal(row, action) {
		setRowData(row);
		setIsEdit(action);
		// setIsView(action);
		setShowEditModal(!showEditModal);
	}
	function viewHandleModal(row, action) {
		setRowData(row);
		// setIsEdit(action);
		setIsView(action);
		setShowViewModal(!showViewModal);
	}

	console.log("edit button", showEditModal);

	console.log("view button", showViewModal);

	return (
		<>
			<Layout />
			<div
				className="container"
				style={{
					position: "absolute",
					top: "50%",
					width: "100%",
					transform: "translate(30%, -50%)",
				}}>
				<div className="row">
					{/* search bar content*/}
					<div className="col-md-4">
						<Search sx={{ backgroundColor: "#cbd5e1" }}>
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
						<Button variant="contained" onClick={handleOpen}  sx={buttonstyle}>
							Create Order
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
							<Formik
								initialValues={initialValues}
								onSubmit={handleSubmit}>
								<Form>
									<Box sx={style}>
										<Grid container direction={"column"} spacing={2}>
											<Grid item>
												<Field
													// sx={{margin:'10px'}}
													as={TextField}
													required
													fullWidth
													id="materialName"
													label="Materila Name"
													name="materialName"
												/>
											</Grid>
											<Grid item>
												<Field
													// sx={{margin:'10px'}}
													as={TextField}
													required
													fullWidth
													id="quantity"
													label="Quantity"
													name="quantity"
												/>
											</Grid>
											<Grid item>
												<Field
													// sx={{margin:'10px'}}
													as={TextField}
													required
													fullWidth
													id="price"
													label="Price"
													name="price"
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
														Save
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
							<StyledTableRow>
								<StyledTableCell onClick={() => sortByKey("id")} sx={{width:150, textAlign:'center'}} >
									ID
									{sortKey === "id" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "id" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
								<StyledTableCell onClick={() => sortByKey("material")} sx={{width:150, textAlign:'center'}} >
									Material
									{sortKey === "material" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "material" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
								<StyledTableCell onClick={() => sortByKey("quantity")} sx={{width:150, textAlign:'center'}} >
									Quantity
									{sortKey === "quantity" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "quantity" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
								<StyledTableCell onClick={() => sortByKey("price")} sx={{width:150, textAlign:'center'}} >
									Price
									{sortKey === "price" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "price" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
								<StyledTableCell onClick={() => sortByKey("status")} sx={{width:150, textAlign:'center'}} >
									Status
									{sortKey === "status" && sortOrder === "asc" && (
										<ArrowDownwardIcon />
									)}
									{sortKey === "status" && sortOrder === "desc" && (
										<ArrowUpwardIcon />
									)}
								</StyledTableCell>
								<StyledTableCell sx={{width:150, textAlign:'center'}}>Action</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{tableData &&
								tableData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => (
										<StyledTableRow key={row.id}>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.id}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.name}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.quantity}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.price}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>{row.status}</StyledTableCell>
											<StyledTableCell sx={{width:150, textAlign:'center'}}>
												<Stack spacing={2} direction="row">
												<Button
													variant="contained"
													color='success'
													onClick={() => editHandleModal(row, "edit")}>
													Edit
												</Button>
												<Button
													variant="contained"
													color="inherit"
													onClick={() => viewHandleModal(row, "view")}>
													Veiw
												</Button>
												</Stack>
											</StyledTableCell>
										</StyledTableRow>
									))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 15]}
					component="div"
					count={tableData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				</Paper>
				{showEditModal && (
					<UserOrderInfoModal
						show={showEditModal}
						editHandleModal={editHandleModal}
						rowData={rowData}
						setRowData={setRowData}
						action={isEdit}
						setTableData={setTableData}
						tableData={tableData}
					/>
					)}
					{showViewModal && (
						<CustomerDetailsModal
							show={showViewModal}
							viewHandleModal={viewHandleModal}
							rowData={rowData}
							setRowData={setRowData}
							action={isView}
							setTableData={setTableData}
							tableData={tableData}
						/>
					)}
			</div>
		</>
	);
}
