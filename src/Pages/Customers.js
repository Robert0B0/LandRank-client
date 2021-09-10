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
	TextField,
	MenuItem,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { createAPIEndpoint, ENDPOINTS } from "../api/index";
import { AuthContext } from "../context/auth";
import { LandCompare } from "../context/compare";
import { SpecificLand } from "../context/SpecificLand";
import { useHistory } from "react-router-dom";
import CustomerModalCRUD from "../Components/Customer/CustomerModalCRUD";
import CustomerDeleteModal from "../Components/Customer/CustomerDeleteModal";
import CustomerTableRow from "../Components/Customer/CustomerTableRow";
import Notification from "../Components/Notification";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
	inputItem: {
		margin: theme.spacing(1),
		width: 200,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	removeIcon: {
		marginLeft: theme.spacing(2),
	},
	containerModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "40rem",
		height: "35rem",
	},
	inputItem: {
		margin: theme.spacing(1),
		width: 200,
	},
	tableContainer: {
		maxHeight: 500,
	},
}));

export default function Customers() {
	const classes = useStyles();
	const { user } = useContext(AuthContext);
	const focusLand = useContext(SpecificLand);
	const compareContext = useContext(LandCompare);
	const history = useHistory();

	const [openModal, setOpenModal] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState(false);
	const [errors, setErrors] = useState({});
	const [notify, setNotify] = useState({ isOpen: false });
	const [sort, setSort] = useState("Name Ascending");
	const [customerDetails, setCustomerDetails] = useState({
		agentID: user ? user.id : "",
		agentName: user ? user.userName : "",
		profilePic: "",
		name: "",
		phoneNumber: "",
		judicialPerson: false,
		companyName: "",
		address: "",
		email: "",
		budget: 0,
		bank: "",
		fullPayment: false,
		immediatePayment: false,
		preferences: "",
		potentialDeal: null,
	});
	const [customerList, setCustomerList] = useState([]);
	const [landsList, setLandsList] = useState([]);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.CUSTOMER)
			.fetchAll()
			.then((res) => {
				let customers = res.data;

				switch (sort) {
					case "Name Ascending":
						customers.sort((a, b) =>
							a.name[0] > b.name[0] ? 1 : a.name[0] < b.name[0] ? -1 : 0
						);
						break;
					case "Name Descending":
						customers.sort((a, b) =>
							a.name[0] < b.name[0] ? 1 : a.name[0] > b.name[0] ? -1 : 0
						);
						break;
					case "Budget Ascending":
						customers.sort((a, b) =>
							a.budget > b.budget ? 1 : a.budget < b.budget ? -1 : 0
						);
						break;
					case "Budget Descending":
						customers.sort((a, b) =>
							a.budget < b.budget ? 1 : a.budget > b.budget ? -1 : 0
						);
						break;
				}
				setCustomerList(res.data);
			})
			.catch((err) => console.log(err));
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.fetchAll()
			.then((res) => {
				setLandsList(res.data);
			})
			.finally(setLoading(false))
			.catch((err) => console.log(err));
	}, [customerDetails, openModal, notify]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCustomerDetails({
			...customerDetails,
			[name]: value,
		});
	};

	const validateSubmit = () => {
		let temp = {};
		temp.name = customerDetails.name === "" ? "Name required" : "";
		temp.phoneNumber =
			customerDetails.phoneNumber === "" ? "Phone required" : "";
		temp.budget = customerDetails.budget === "" ? "Phone required" : "";
		setErrors({ temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleCreate = () => {
		if (validateSubmit()) {
			createAPIEndpoint(ENDPOINTS.CUSTOMER)
				.create(customerDetails)
				.then((res) => setNotify({ isOpen: true, message: "Customer Created" }))
				.catch((err) => {
					setNotify({ isOpen: true, message: "Error, Could not Create" });
					console.log(err);
				});
			setOpenModal(false);
			resetCustomer();
		} else {
			console.log("Not a valid submit");
		}
	};

	const handleUpdate = () => {
		if (validateSubmit()) {
			createAPIEndpoint(ENDPOINTS.CUSTOMER)
				.update(customerDetails.customerID, customerDetails)
				.then((res) => {
					setNotify({ isOpen: true, message: "Customer Modified" });
				})
				.catch((err) => {
					setNotify({ isOpen: true, message: "Customer Data Not Valid" });
				});
			setOpenModal(false);
			resetCustomer();
		} else {
			console.log("Not a valid submit");
		}
	};

	const handleDealsUpdate = (id, dealsList) => {
		let customer = customerList.filter((l) => l.customerID == id)[0];
		if (dealsList.length !== 0) {
			customer.potentialDeal = [];
			dealsList.forEach((deal) => {
				customer.potentialDeal.push({
					customerID: id,
					landAreaID: deal.landAreaID,
				});
			});
		} else {
			customer.potentialDeal = [];
		}

		createAPIEndpoint(ENDPOINTS.CUSTOMER)
			.update(id, customer)
			.then((res) => {
				setNotify({ isOpen: true, message: "Customer Modified" });
			})
			.catch((err) => {
				setNotify({ isOpen: true, message: "Customer Data Not Valid" });
			});
	};

	const handleDelete = () => {
		createAPIEndpoint(ENDPOINTS.CUSTOMER)
			.delete(customerDetails.customerId)
			.catch((err) => console.log(err));
		setOpenDelete(false);
		setOpenModal(false);
		resetCustomer();
		setNotify({ isOpen: true, message: "Customer Removed" });
	};

	const createCustomer = () => {
		setUpdate(false);
		resetCustomer();
		setOpenModal(true);
	};

	const editCustomer = (id) => {
		let foundCustomer = customerList.find(
			(customer) => customer.customerID === id
		);
		setCustomerDetails({
			...foundCustomer,
			customerID: foundCustomer.customerID,
		});
		setUpdate(true);
		setOpenModal(true);
	};

	const closeCreate = () => {
		setOpenModal(false);
		setNotify({ isOpen: true, message: "Customer Info Stored Temporarily" });
	};

	const closeEdit = () => {
		resetCustomer();
		setOpenModal(false);
		setUpdate(false);
		setNotify({ isOpen: true, message: "Customer Unchanged" });
	};

	const resetCustomer = () => {
		setCustomerDetails({
			agentID: user.id,
			agentName: user.userName,
			profilePic: "",
			name: "",
			phoneNumber: "",
			judicialPerson: false,
			companyName: "",
			address: "",
			email: "",
			budget: 0,
			bank: "",
			fullPayment: false,
			immediatePayment: false,
			preferences: "",
			potentialDeal: null,
		});
	};

	const editLand = (id) => {
		focusLand.landAreaID = id;
		console.log("id in lands:", focusLand);
		history.push("/");
	};

	const addToCompare = (id) => {
		if (compareContext.landA !== id && compareContext.landB !== id) {
			let foundLand = landsList.find((land) => land.landAreaID === id);
			compareContext.landA = compareContext.landB;
			compareContext.landB = foundLand;
		}
		setNotify({ isOpen: true, message: "Land Added to Comparison" });
	};

	const handleSort = (by) => {
		setSort(by);
		setNotify({ isOpen: true, message: "sorted by " + by });
	};

	return (
		<>
			<Container>
				{loading ? (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Loading Customer data...</Typography>
							</Grid>
						</Grid>
						<LinearProgress />
					</>
				) : (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Customers</Typography>
							</Grid>
							<Grid xs={6}>
								<TextField
									select
									style={{ width: "250px", marginRight: "25px" }}
									value={sort}
									label="Sort Lands By :"
									variant="outlined"
									onClick={(e) => handleSort(e.target.value)}
								>
									<MenuItem value={"Name Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Name Ascending
									</MenuItem>
									<MenuItem value={"Name Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Name Descending
									</MenuItem>
									<MenuItem value={"Budget Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Budget Ascending
									</MenuItem>
									<MenuItem value={"Budget Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Budget Descending
									</MenuItem>
								</TextField>
								<Fab
									variant="extended"
									color="primary"
									onClick={user ? createCustomer : () => history.push("/login")}
								>
									<AddIcon />
									Add a Customer
								</Fab>
							</Grid>
						</Grid>
						<hr />
					</>
				)}
				{!loading ? (
					<TableContainer className={classes.tableContainer}>
						<Table className={classes.table}>
							<TableBody>
								{customerList.map((customer) => (
									<CustomerTableRow
										key={customer.name}
										lands={landsList}
										{...{
											customer,
											editCustomer,
											setOpenDelete,
											setNotify,
											handleDealsUpdate,
											editLand,
											addToCompare,
											user,
										}}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : !customerList.length ? (
					<Typography variant="h4">No Sellers added yet.</Typography>
				) : (
					<Typography variant="h4">Loading Customer List.</Typography>
				)}
			</Container>
			<CustomerModalCRUD
				{...{
					update,
					openModal,
					setOpenModal,
					setOpenDelete,
					customerDetails,
					setCustomerDetails,
					handleInputChange,
					handleCreate,
					handleUpdate,
					closeEdit,
					closeCreate,
				}}
			/>
			<CustomerDeleteModal
				name={customerDetails.name}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				handleDelete={handleDelete}
			/>
			<Notification {...{ notify, setNotify }} />
		</>
	);
}
