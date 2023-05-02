import { Link } from "react-router-dom";
import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarContent,
} from "react-pro-sidebar";
import {
	FaAngleDoubleLeft,
	FaAngleDoubleRight,
	FaTachometerAlt,
	FaRegLaughWink,
} from "react-icons/fa";
import Cookies from "js-cookie";

const Sidebar = ({
	collapsed,
	toggled,
	handleToggleSidebar,
	handleCollapsedChange,
}) => {
	const role = Cookies.get("deportment");

	return (
		<ProSidebar
			className="AppSidebar dark"
			collapsed={collapsed}
			toggled={toggled}
			onToggle={handleToggleSidebar}
			breakPoint="md"
			style={{ height: "100vh", color: "white", position:'fixed' }}>
			{/* Sidebar Header*/}
			<SidebarHeader style={{ backgroundColor: "#418394" }}>
				<Menu iconShape="circle">
					{collapsed ? (
						<MenuItem
							icon={<FaAngleDoubleRight />}
							onClick={handleCollapsedChange}></MenuItem>
					) : (
						<MenuItem
							suffix={<FaAngleDoubleLeft />}
							onClick={handleCollapsedChange}>
							<div
								style={{
									padding: "9px",
									textTransform: "uppercase",
									fontWeight: "bold",
									fontSize: 15,
									letterSpacing: "1px",
								}}>
								Recykal
							</div>
						</MenuItem>
					)}
				</Menu>
			</SidebarHeader>
			{/* Content */}
			<SidebarContent style={{ backgroundColor: "#418394" }}>
				<Menu iconShape="circle">
					<MenuItem icon={<FaTachometerAlt />}>
						Dashboard
						{role === "Admin" ? <Link to="/admin" /> : <Link to="/user" />}
					</MenuItem>
					<MenuItem icon={<FaRegLaughWink />}>
						{role === "Admin" ? "Users" : "Orders"}
						{role === "Admin" ? (
							<Link to="/userinfo" />
						) : (
							<Link to="/orderinfo" />
						)}
					</MenuItem>
				</Menu>
			</SidebarContent>
		</ProSidebar>
	);
};

export default Sidebar;
