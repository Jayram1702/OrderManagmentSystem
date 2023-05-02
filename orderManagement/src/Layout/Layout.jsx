import React, { useState } from "react";
import Sidebar from "../Pages/Sidebar";
import Navbar from "../Pages/Navbar";

function Layout() {
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);

	const handleCollapsedChange = () => {
		setCollapsed(!collapsed);
	};

	const handleToggleSidebar = (value) => {
		if (value !== toggled) {
			setToggled(value);
		}
	};

	return (
		<>
		<Navbar /> 
			 <div className={`app ${toggled ? "toggled" : ""}`}>
				<Sidebar
					collapsed={collapsed}
					toggled={toggled}
					handleToggleSidebar={handleToggleSidebar}
					handleCollapsedChange={handleCollapsedChange}
				/>

				<main>
					<div
						className="btn-toggle"
						onClick={() => handleToggleSidebar(true)}></div>
				</main>
			</div>
		</>
	);
}

export default Layout;
