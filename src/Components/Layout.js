import React, { useState, useContext, useEffect } from "react";
import {
	Typography,
	makeStyles,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	AppBar,
	Toolbar,
	Avatar,
	Button,
} from "@material-ui/core";

import CompareIcon from "@material-ui/icons/Compare";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LandscapeIcon from "@material-ui/icons/Landscape";
import NoteIcon from "@material-ui/icons/Note";
import MapIcon from "@material-ui/icons/Map";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import FaceIcon from "@material-ui/icons/Face";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import SettingsIcon from "@material-ui/icons/Settings";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import InfoIcon from "@material-ui/icons/Info";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { createAPIEndpoint, ENDPOINTS } from "../api/index";
import { format } from "date-fns";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: "flex",
		},
		page: {
			background: "f9f9f9",
			width: "100%",
			padding: theme.spacing(3),
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			textAlign: "center",
		},
		drawerPaper: {
			width: drawerWidth,
		},
		active: {
			background: "#f4f4f4",
		},
		title: { padding: theme.spacing(2) },
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
		toolbar: theme.mixins.toolbar,
		date: { flexGrow: 1 },
		avatar: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
	};
});

export default function Layout({ children }) {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const { user, login, logout } = useContext(AuthContext);
	const context = useContext(AuthContext);

	const navItems = [
		{
			text: "Map",
			icon: <MapIcon color="primary" />,
			path: "/",
		},
		{
			text: "Compare",
			icon: <CompareArrowsIcon color="primary" />,
			path: "/compare",
		},
		{
			text: "Lands",
			icon: <LandscapeIcon color="primary" />,
			path: "/lands",
		},
		{
			text: "Customers",
			icon: <FaceIcon color="primary" />,
			path: "/customers",
		},
		{
			text: "Sellers",
			icon: <BusinessCenterIcon color="primary" />,
			path: "/sellers",
		},
		{
			text: "Notes",
			icon: <NoteIcon color="primary" />,
			path: "/notes",
		},
		{
			text: "Agent Page",
			icon: <AccountBoxIcon color="primary" />,
			path: "/agentpage",
		},
		{
			text: "Deal Records",
			icon: <AccountBalanceIcon color="primary" />,
			path: "/deals",
		},
		{
			text: "About",
			icon: <InfoIcon color="primary" />,
			path: "/about",
		},
	];

	useEffect(() => {
		if (localStorage.getItem("jwtToken") !== null) {
			let token = localStorage.getItem("jwtToken");
			let auth = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};
			createAPIEndpoint(ENDPOINTS.AUTH)
				.auth(auth)
				.then((res) => {
					context.login(res.data, token);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			history.push("/login");
		}
	}, []);

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} elevation={0}>
				<Toolbar>
					<Typography variant="h6" noWrap className={classes.date}>
						{format(new Date(), "do MMMM Y")}
					</Typography>
					<Typography variant="h6" noWrap className={classes.date}>
						{navItems.path == location.pathname ? navItems.text : ""}
					</Typography>
					{user ? (
						<>
							<Button variant="contained">
								<Typography>{user.userName}</Typography>
							</Button>
							<Avatar src="./logo/512.png" className={classes.avatar} />
							<Button
								variant="contained"
								onClick={() => {
									logout();
									history.push("/login");
								}}
							>
								<Typography>Log out</Typography>
							</Button>
						</>
					) : (
						<Button variant="contained" onClick={() => history.push("/login")}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				anchor="left"
				classes={{ paper: classes.drawerPaper }}
			>
				<div>
					<Typography variant="h5" className={classes.title}>
						LandRank
					</Typography>
				</div>
				<hr />
				<List>
					{navItems.map((item) => (
						<ListItem
							key={item.text}
							button
							onClick={() => history.push(item.path)}
							className={location.pathname == item.path ? classes.active : null}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{item.text}</ListItemText>
						</ListItem>
					))}
				</List>
			</Drawer>
			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
			{/* <div>
				<h2>Footer zone</h2>
			</div> */}
		</div>
	);
}
