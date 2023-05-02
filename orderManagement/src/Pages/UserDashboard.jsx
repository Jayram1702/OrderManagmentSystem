import React from "react";
import Layout from "../Layout/Layout";
import Paper from "@mui/material/Paper";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	BarSeries,
	Title,
	Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { olimpicMedals as data } from "../demo-data/data-visualization";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import orderedImage from "../assets/images/order.png";
import inProgressImage from "../assets/images/inprogress.png";
import orderSucessImage from "../assets/images/orderSuccess.png";
import axios from "axios";
import { url } from "../config";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const user = Cookies.get('id')

const Root = (props) => (
	<Legend.Root
		{...props}
		sx={{ display: "flex", margin: "auto", flexDirection: "row" }}
	/>
);
const Label = (props) => (
	<Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
);
export const UserDashboard = () => {

  const[orderStatus, setOrderStatus ] = useState([{
		name:'Jayram',
    // Open:0,
    // Inprogress:0,
    // Completed:0
		open_count:10,
		inprogress_count:5,
		closed_count:5
  }]);

	// getting the orers count for the particular user
  const getOrderStatus = (user) =>{
    console.log("hyderabad");
     axios.get(url.API+`api/${user}/countByStatus`)
      .then((res)=>{
        console.log(res)
        if (res.status === 200){
          console.log("jay",res.data);
					const modifiedDtata = {...res.data,name:"India"}
          setOrderStatus(modifiedDtata);
          console.log(orderStatus,"Ravi");
        }
      })
      .catch((error)=>{
        console.log(" why error")
        console.log(error);
      })
    };

    useEffect (()=>{
      getOrderStatus(20);
    },[])

	return (
    <>
    <Layout />
		<div
			className="container"
			style={{
				position: "absolute",
				top: "50%",
				width: "100%",
				// right: '50%',
				transform: "translate(30%, -50%)",
			}}>
			<div className="row">
				<div className="col">
					<Card
						sx={{
							display: "flex",
							backgroundColor: "#c5e8e7",
							width: "350px",
						}}>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<CardContent sx={{ flex: "1 0 auto" }}>
								<Typography component="div" variant="h5">
									Placed Orders
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div">
										10
									{/* {orderStatus.open_count} */}
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 140 }}
							image={orderedImage}
							alt="Live from space album cover"
						/>
					</Card>
				</div>
				<div className="col">
					<Card
						sx={{
							display: "flex",
							backgroundColor: "#f5d49a",
							width: "350px",
						}}>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<CardContent sx={{ flex: "1 0 auto" }}>
								<Typography component="div" variant="h5">
									InProgress Orders
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div">
										5
									{/* {orderStatus.inprogress_count} */}
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 140 }}
							image={inProgressImage}
							alt="Live from space album cover"
						/>
					</Card>
				</div>
				<div className="col">
					<Card
						sx={{
							display: "flex",
							backgroundColor: "#cfe6c8",
							width: "350px",
						}}>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<CardContent sx={{ flex: "1 0 auto" }}>
								<Typography component="div" variant="h5">
									Success Orders
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div">
										5
									{/* // {orderStatus.closed_count} */}
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 140 }}
							image={orderSucessImage}
							alt="Live from space album cover"
						/>
					</Card>
				</div>
			</div>
			<br />
			<Paper>
				<Chart data={data}>
					<ArgumentAxis />
					<ValueAxis />
					<BarSeries
						barWidth={0.5}
						name="Orders"
						valueField="open_count"
						argumentField="name"
						color="#6d9c9b"
					/>
					<BarSeries
						barWidth={0.5}
						name="In Progress"
						valueField="inprogress_count"
						argumentField="name"
						color="#b3684d"
					/>
					<BarSeries
						barWidth={0.5}
						name="Orders Completed"
						valueField="closed_count"
						argumentField="name"
						color="#6c9c54"
					/>
					<Animation />
					<Legend
						position="bottom"
						rootComponent={Root}
						labelComponent={Label}
					/>
					<Title text="Orders Data" />
					<Stack />
				</Chart>
			</Paper>
		</div>
    </>
	);
};
