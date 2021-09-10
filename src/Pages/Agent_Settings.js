import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Container,
	Grid,
	Fab,
	makeStyles,
	Table,
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	Card,
	CardContent,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Notification from "../Components/Notification";
import AgentUPDATEModal from "../Components/Agent/AgentUPDATEModal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RoomIcon from "@material-ui/icons/Room";
import { AuthContext } from "../context/auth";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import { set } from "date-fns";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	table: {
		margin: theme.spacing(10),
		marginLeft: theme.spacing(15),
		width: theme.spacing(100),
		height: theme.spacing(37),
	},
}));

function formatPhoneNumber(phoneNumberString) {
	var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
	var match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
	if (match) {
		return match[1] + "-" + match[2] + "-" + match[3];
	}
	return null;
}

export default function AgentPage() {
	const classes = useStyles();
	const { user } = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState({ ...user });
	const [openModal, setOpenModal] = useState(false);
	const [deals, setDeals] = useState([]);
	const [errors, setErrors] = useState({
		userName: "",
		fullName: "",
		phoneNumber: "",
		email: "",
		zone: "",
		companyName: "",
		address: "",
	});
	const [notify, setNotify] = useState({ isOpen: false });

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.DEAL)
			.fetchAll()
			.then((res) => {
				let deals = res.data.filter((deal) => deal.agentID === user.id);
				setDeals(deals);
			})
			.catch((err) => console.log(err));
	}, []);

	const editing = () => {
		setNotify({ isOpen: true, message: "Editing" });
		setOpenModal(true);
	};

	const validateUpdate = () => {
		let temp = {};
		temp.userName = user.userName !== "" ? "" : "User Name is required";
		temp.fullName = user.fullName !== "" ? "" : "Full Name is required";
		temp.companyName =
			user.companyName !== "" ? "" : "Company Name is required";
		temp.address = user.address !== "" ? "" : "Address is required";
		temp.email = user.email !== "" ? "" : "Email is required";
		temp.phoneNumber =
			user.phoneNumber !== "" ? "" : "Phone Number is required";
		temp.password = user.password !== "" ? "" : "Password is required";
		setErrors({ ...temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleSubmit = () => {
		if (validateUpdate()) {
			createAPIEndpoint(ENDPOINTS.USERUPDATE)
				.update(userDetails)
				.catch((err) => console.log(err));
			setNotify({ isOpen: true, message: "Agent Details Updated" });
		}
		console.log(userDetails);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	};

	const closeModal = () => {
		setOpenModal(false);
		setNotify({ isOpen: true, message: "Agent Details Unchanged" });
	};

	const dealsSum = (deals) => {
		let sum = 0;
		for (let i = 0; i < deals.length; i++) {
			sum += deals[i].commission;
		}
		return sum;
	};

	return (
		<Container>
			<Grid container>
				<Grid xs={6}>
					<Typography variant="h4">Agent Details</Typography>
				</Grid>
				<Grid xs={6}>
					<Fab variant="extended" color="primary" onClick={editing}>
						Modify
						<EditIcon />
					</Fab>
				</Grid>
			</Grid>
			<hr />
			<Card
				style={{
					marginLeft: "100px",
					marginTop: "50px",
					width: "800px",
					height: "250px",
				}}
			>
				<CardContent>
					<Grid container>
						<Grid item>
							<AccountCircleIcon
								style={{ height: "150", width: "150", marginRight: "20px" }}
							/>
						</Grid>
						<Grid item>
							{" "}
							<Typography variant="h5">
								Agent Name: <i>{user.fullName}</i>{" "}
							</Typography>
							<Typography variant="h6">
								UserName: <i>{user.userName}</i>{" "}
							</Typography>
							<Typography variant="h6">
								Email: <i>{user.email}</i>
							</Typography>
							<Typography variant="h6">
								Phone Number: <i>{user.phoneNumber}</i>
							</Typography>
							<Typography variant="h6">
								Address: <i>{user.address}</i>
							</Typography>
							<Typography variant="h6">
								Company: <i>{user.companyName}</i>
							</Typography>
							<Typography variant="h6">
								Zone Focus: <i>{user.zone}</i>
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Typography variant="h6" style={{ marginTop: "20px" }}>
				Total Deals: {deals.length}, Your total Profit: €
				{dealsSum(deals).toFixed(0).toLocaleString()}
			</Typography>
			<hr />
			{deals.map((deal) => (
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography variant="body1">
								Area: {deal.landArea.toLocaleString()} m^2
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="body1">
								Commission: €{deal.commission}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="body1">Usage: {deal.landType}</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="body1">Date: {deal.dealDate}</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			))}
			<AgentUPDATEModal
				{...{
					openModal,
					userDetails,
					userDetails,
					setUserDetails,
					handleInputChange,
					handleSubmit,
					closeModal,
					errors,
				}}
			/>
			<Notification {...{ notify, setNotify }} />
		</Container>
	);
}
