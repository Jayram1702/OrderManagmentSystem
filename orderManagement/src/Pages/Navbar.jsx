import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import recykalLogo from "../assets/images/recykalp.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const role = Cookies.get('deportment');
function ResponsiveAppBar() {
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const darkTheme = createTheme({
		palette: {
			mode: "light",
			primary: {
				main: "#418394",
			},
		},
	});
	const navigateLogin = useNavigate();
// logging out by clearing the cookies
	const handleLogout = () => {
		Cookies.remove("deportment");
		Cookies.remove('id')
		navigateLogin('/login');
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="sticky">
				<Container style={{width : '100%', maxWidth : '100%'}}>
					<Toolbar disableGutters>
          <Box
            component="img"
            sx={{
            height: 65,
            }}
            alt="recykal logo."
            src={recykalLogo}/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}>
							Recykal
						</Typography>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow:2, textAlign:"center"}}>
							{role === 'Admin'? 'Admin Dashboard':'Executive Dashboard'}
						</Typography>

						<Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								<MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}
export default ResponsiveAppBar;
