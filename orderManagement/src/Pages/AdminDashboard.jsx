import * as React from "react";
import Layout from "../Layout/Layout";
import Paper from "@mui/material/Paper";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	BarSeries,
	Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { olimpicMedals as data } from "../demo-data/data-visualization";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import activeImage from "../assets/images/active.png";
import inActiveImage from "../assets/images/inactive.jpg";
import { url } from "../config";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function AdminDashboard() {
	const [userStatus, setUserStatus] = useState({
		Active_Count: 0,
		Inactive_Count: 0,
	});

	// Api function for checking the count of the users who are enable and disable

	const getUserStatus = () => {
		console.log("hyderabad");
		axios
			.get(url.API + "ActiveInactiveStatus")
			.then((res) => {
				console.log(res);
				if (res.status == 200) {
					console.log("jay", res.data);
					setUserStatus(res.data);
					console.log(userStatus);
				}
			})
			.catch((error) => {
				console.log(" why error");
				console.log(error);
			});
	};

	const [data, setData] = useState([])

	//APi function to get the orders of the all the users

	const getOrdersCount = () => {
		console.log("telangana");
		axios
			.get(url.API + "UserOrdersCount")
			.then((res) => {
				console.log(res);
				if (res.status == 200) {
					console.log("barchat", res.data);
					setData(res.data);
					console.log(data);
				}
			})
			.catch((error) => {
				console.log("BAr users data Error");
				console.log(error);
			});
	};


// limiting the data to set for the barcharts
	const [limitStart, setLimitStart] = useState(0);
	const [limitEnd, setLimitEnd] = useState(5)

	// setting data limit of the orders count of users
	const onLimitChange =  (event) => {
    const selectedRange = event.target.value.split("-");
    const start = parseInt(selectedRange[0], 10) - 1;
    let end = parseInt(selectedRange[1], 10);
    if (end === data.length) {
      end = end - 1;
    }
    setLimitStart(start);
    setLimitEnd(end);
  };


	const limitData = Math.ceil(data.length/5);
	console.log('length',limitData)


	const dropBarLimit =() =>{
		const dropDowns = []
		for(let i=0; i<limitData; i++){
			const start = i*5+1;
			console.log(start);
			const end = start+4;
			dropDowns.push(
				<MenuItem key={i+1} value={`${start}-${end}`}>{`${start}-${end}`}</MenuItem> 
			)
		}
		return dropDowns;
	}
	// rendering every time to get the count of active and inactive users

	useEffect(() => {
		getUserStatus();
		getOrdersCount();
	}, []);

	const theme = useTheme();

	return (
		<>
			<Layout />
			<div
				className="container"
				style={{
					position: "absolute",
					borderColor: "#e6e1d5",
					top: "50%",
					width: "100%",
					// right: '50%',
					transform: "translate(40%, -50%)",
				}}>
				<div className="row">
					<div className="col">
						<Card
							sx={{
								display: "flex",
								backgroundColor: "#c3dec6",
								width: "350px",
							}}>
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<CardContent sx={{ flex: "1 0 auto" }}>
									<Typography component="div" variant="h5">
										Active Executives
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="div">
										{userStatus.Active_Count}
									</Typography>
								</CardContent>
							</Box>
							<CardMedia
								component="img"
								sx={{ width: 151 }}
								image={activeImage}
								alt="Live from space album cover"
							/>
						</Card>
					</div>
					<div className="col">
						<Card
							sx={{
								display: "flex",
								backgroundColor: "#dec3c3",
								width: "350px",
							}}>
							<Box sx={{display: "flex", flexDirection: "column" }}>
								<CardContent sx={{ flex: "1 0 auto" }}>
									<Typography component="div" variant="h5">
										InActive Executives
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="div">
										{userStatus.Inactive_Count}
									</Typography>
								</CardContent>
							</Box>
							<CardMedia
								component="img"
								sx={{ width: 151 }}
								image={inActiveImage}
								alt="Live from space album cover"
							/>
						</Card>
					</div>
				</div>
				<br />
			<br />
			<br />
			<div>
			{/* <Bar data={chartData} /> */}
			<br />
			</div>
			<FormControl sx={{width:"150px", height:"15px", display:'flex', float:'right'}}>
        <InputLabel id="limit-label">Graph Limit</InputLabel>
        <Select
          labelId="limit-label"
          onChange={onLimitChange}
        >
          {dropBarLimit()}
        </Select>
      </FormControl>
			<br />
			<br />
				<Paper sx={{width:'100%'}}>
					<Chart data={data.slice(limitStart, limitEnd)}>
						<ArgumentAxis />
						<ValueAxis/>
						<BarSeries
							name="Orders"
							barWidth={0.2}
							valueField='orderscount'
							argumentField="name"
							color="#797ddb"
						/>
						<Title text="Orders of Executives" />
						<Animation />
						<Stack />
					</Chart>
				</Paper>
			</div>
		</>
	);
}
