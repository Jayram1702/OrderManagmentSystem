import React, { useState } from "react";
import { Box, Fade, Modal, Stepper, Step, StepLabel } from "@mui/material";
import moment from "moment";

function CustomerDetailsModal({
	show,
	viewHandleModal,
	rowData,
	action,
	tableData,
}) {
	const isView = action === "view";
	console.log("view", rowData, tableData);

	const steps = ["Open", "In Progress", "Completed"];
	const [inputValue, setInputValue] = useState({ ...rowData });

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "50%",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

  const stepperValuesByStatuses={
    'open':0,
    'inprogress':1,
    'completed':2
  }

	return (
		<>
			<Modal open={show} onClose={viewHandleModal}>
				<Fade in={show}>
					<Box sx={style}>
						<div style={{ backgroundColor: "white", padding: "20px" }}>
							<h2
								style={{
									display: "flex",
									fontSize: "25px",
									fontWeight: 600,
									fontFamily: "sans-serif",
									justifyContent: "center",
									backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
									color: "transparent",
									backgroundClip: "text",
									WebkitBackgroundClip: "text",
								}}>
								Customer Order Details
							</h2>
							<p style={{color:'Blue',textIndent: '30px',textTransform: 'uppercase'}}>Customer Name: {inputValue?.name}</p>
							<p style={{color:'Blue',textIndent: '30px',textTransform: 'uppercase'}}>Material Name: {inputValue?.material}</p>
							<p style={{color:'Blue',textIndent: '30px',textTransform: 'uppercase'}}>Quantity: {inputValue?.quantity}</p>
							<p style={{color:'Blue',textIndent: '30px',textTransform: 'uppercase'}}>Price: {inputValue?.price}</p>
							<h3 style={{
									display: "flex",
									fontSize: "25px",
									fontWeight: 600,
									fontFamily: "sans-serif",
									justifyContent: "center",
									backgroundImage: "linear-gradient(to left, #553c9a, #b393d3)",
									color: "transparent",
									backgroundClip: "text",
									WebkitBackgroundClip: "text",
								}}>Order Status: {inputValue?.status}</h3>
							<Stepper activeStep={stepperValuesByStatuses[inputValue?.status]}>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
                    <StepLabel>{moment(steps).format('YYYY-MM-DD')}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}

export default CustomerDetailsModal;
