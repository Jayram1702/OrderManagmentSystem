import {
	Box,
	Fade,
	FormControl,
	Grid,
	MenuItem,
	Modal,
	TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Cookies from "js-cookie";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { url } from "../config";

function UserOrderInfoModal({
	show,
	editHandleModal,
	setRowData,
	rowData,
	action,
	setTableData,
	tableData,
}) {
	const isEdit = action === "edit";
	
	console.log("chocoModal", rowData, tableData);
	
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 300,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const orderId = Cookies.get('orderId')

	const initialValues = {
		orderId,
		quantity: "",
		price: "",
		orderStatus: "",
	};

	// Api fuction to update the order details
	// const handleEditSubmit = (values, { resetForm }) => {
	// 	console.log("hey", values);
	// 	axios
	// 		.post(url.API + "Edit", values)
	// 		.then((response) => {
	// 			console.log(response);
	// 			if (response.status === 200) {
	// 			resetForm();
	// 			}
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// };
	
	const options = ["Open", "Inprogress", "Completed"];
	const [optionValue, setOptionValue] = useState(options[0]);
	const [inputValue, setInputValue] = useState({ ...rowData });

	console.log("chocoInputValue", inputValue, rowData, optionValue);
	
	const handleSave = () => {
		// event.preventDefault()
		// values, {resetForm}
		const data = tableData;
	
		data.splice(rowData?.id - 1, rowData?.id, inputValue);
		setTableData(data);
		editHandleModal();
		console.log(inputValue, 'check')
	
		// axios.post(url.API + "Edit", inputValue) // <-- here you're sending `inputValue`
		// 	.then((response) => {
		// 		console.log(response.data);
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
	};

	console.log("chocoInputVAlue", inputValue, rowData);

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	return (
		<div>
			<Modal
				open={show}
				onClose={editHandleModal}
			>
				<Fade in={show}>
					<Box sx={style}>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSave}>
					<Form>
						<Grid container direction={"column"} spacing={2}>
							<Grid item>
								<Field
								as = {TextField}
									label="Quantity"
									variant="filled"
									type="number"
									required
									disabled={!isEdit}
									value={inputValue?.quantity}
									onChange={(e) => {
										setInputValue((prevState) => ({ ...prevState, quantity: e.target.value }));
									}}
								/>
							</Grid>
							<Grid item>
								<Field
								as = {TextField}
									label="Price"
									variant="filled"
									type="double"
									required
									value={inputValue?.price}
									disabled={!isEdit}
									onChange={(e) => {
										setInputValue((prevState) => ({ ...prevState, price: e.target.value }));
										console.log(inputValue,'edit')
									}}
								/>
							</Grid>
							<Grid item>
								<div>
									<FormControl sx={{ width: "220px" }}>
									<InputLabel id="demo-simple-select-helper-label">Order Status</InputLabel>
										<Select
										labelId="demo-simple-select-helper-label"
										onChange={(e) => {
											setInputValue((prevState) => ({ ...prevState, orderStatus: e.target.value }));
										}}>
											<MenuItem value="open">open</MenuItem>
											<MenuItem value="inprogress"> inprogress</MenuItem>
											<MenuItem value="completed">completed</MenuItem>
										</Select>
									</FormControl>
								</div>
							</Grid>
							<Grid item>
								<div style={{ display: "flex", justifyContent: "center" }}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										// onClick={handleSave}
										>
										Save <Link to="/orderinfo" />
									</Button>
								</div>
							</Grid>
						</Grid>
						</Form>
				</Formik>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default UserOrderInfoModal;
