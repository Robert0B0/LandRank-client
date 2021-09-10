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

import SellerModalCRUD from "../Components/Seller/SellerModalCRUD";
import SellerDeleteModal from "../Components/Seller/SellerDeleteModal";
import SellerTableRow from "../Components/Seller/SellerTableRow";
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

export default function Sellers() {
	const classes = useStyles();
	const { user } = useContext(AuthContext);
	const compareContext = useContext(LandCompare);
	const focusLand = useContext(SpecificLand);
	const history = useHistory();

	const [openModal, setOpenModal] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState(false);
	const [errors, setErrors] = useState({});
	const [notify, setNotify] = useState({ isOpen: false });
	const [sort, setSort] = useState("Name Ascending");
	const [landsList, setLandsList] = useState([]);
	const [sellerDetails, setSellerDetails] = useState({
		agentID: user ? user.id : "",
		agentName: user ? user.userName : "",
		profilePic: "",
		name: "",
		landAreaID: "",
		landForSale: "",
		phoneNumber: "",
		judicialPerson: false,
		companyName: "",
		address: "",
		email: "",
		bank: "",
		prefFullPayment: false,
		prefImmediatePayment: false,
		sellerLands: null,
	});
	const [sellerList, setSellerList] = useState([]);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.SELLER)
			.fetchAll()
			.then((res) => {
				let sellers = res.data;

				switch (sort) {
					case "Name Ascending":
						sellers.sort((a, b) =>
							a.name[0] > b.name[0] ? 1 : a.name[0] < b.name[0] ? -1 : 0
						);
						break;
					case "Name Descending":
						sellers.sort((a, b) =>
							a.name[0] < b.name[0] ? 1 : a.name[0] > b.name[0] ? -1 : 0
						);
						break;
				}
				setSellerList(sellers);
			})
			.finally(setLoading(false))
			.catch((err) => console.log(err));
	}, [sellerDetails, notify]);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.fetchAll()
			.then((res) => {
				let lands = res.data;
				let filteredLands = lands.filter(
					(land) => land.seller === null && land.agentID === user.id
				);
				setLandsList(filteredLands);
			})
			.catch((err) => console.log(err));
	}, [sellerList]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSellerDetails({
			...sellerDetails,
			[name]: value,
		});
	};

	const validateSubmit = () => {
		let temp = {};
		temp.name = sellerDetails.name === "" ? "Name required" : "";
		temp.phoneNumber = sellerDetails.phoneNumber === "" ? "Phone required" : "";
		temp.landAreaID =
			sellerDetails.landAreaID === "" ? "Seller land required" : "";
		setErrors({ temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleCreate = () => {
		if (validateSubmit()) {
			console.log(sellerDetails);
			createAPIEndpoint(ENDPOINTS.SELLER)
				.create(sellerDetails)
				.finally(setLoading(false))
				.catch((err) => {
					setNotify({
						isOpen: true,
						message: "Error, Could not create Seller",
					});
					console.log(err);
				});
			setOpenModal(false);
			resetSeller();
			setNotify({ isOpen: true, message: "Seller Created" });
		} else {
			console.log("Not a valid submit");
		}
	};

	const handleUpdate = () => {
		console.log(sellerDetails);
		if (validateSubmit()) {
			createAPIEndpoint(ENDPOINTS.SELLER)
				.update(sellerDetails.sellerID, sellerDetails)
				.then((res) => {
					setNotify({ isOpen: true, message: "Seller Modified" });
				})
				.catch((err) => {
					console.log(err);
					setNotify({ isOpen: true, message: "Seller Data not Valid" });
				});
			console.log(sellerDetails);
			setOpenModal(false);
			resetSeller();
		} else {
			console.log("Not a valid submit");
		}
	};

	const handleDelete = () => {
		createAPIEndpoint(ENDPOINTS.SELLER)
			.delete(sellerDetails.sellerId)
			.catch((err) => console.log(err));
		setOpenDelete(false);
		setOpenModal(false);
		resetSeller();
		setNotify({ isOpen: true, message: "Seller Removed" });
	};

	const createSeller = (id) => {
		setUpdate(false);
		resetSeller();
		setOpenModal(true);
	};

	const editSeller = (id) => {
		let foundSeller = sellerList.find((seller) => seller.sellerID === id);
		setSellerDetails({ ...foundSeller, sellerID: foundSeller.sellerID });
		setUpdate(true);
		setOpenModal(true);
	};

	const closeCreate = () => {
		setOpenModal(false);
		setNotify({ isOpen: true, message: "Seller Info Stored Temporarily" });
	};

	const closeEdit = () => {
		resetSeller();
		setOpenModal(false);
		setUpdate(false);
		setNotify({ isOpen: true, message: "Seller Unchanged" });
	};

	const handleSort = (by) => {
		setSort(by);
		setNotify({ isOpen: true, message: "sorted by " + by });
	};

	const resetSeller = () => {
		setSellerDetails({
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
			sellerLands: null,
			landAreaID: "",
			landForSale: "",
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

	return (
		<>
			<Container>
				{loading ? (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Loading Seller Data...</Typography>
							</Grid>
						</Grid>
						<LinearProgress />
					</>
				) : (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Sellers</Typography>
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
								</TextField>
								<Fab
									variant="extended"
									color="primary"
									onClick={user ? createSeller : () => history.push("/login")}
								>
									<AddIcon />
									Add a Seller
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
								{sellerList.map((seller) => (
									<SellerTableRow
										key={seller.name}
										lands={landsList}
										{...{
											seller,
											editSeller,
											setOpenDelete,
											setNotify,
											addToCompare,
											editLand,
											user,
										}}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : !sellerList.length ? (
					<Typography variant="h4">No Sellers added yet.</Typography>
				) : (
					<Typography variant="h4">Loading Seller List.</Typography>
				)}
			</Container>
			<SellerModalCRUD
				{...{
					update,
					openModal,
					setOpenModal,
					setOpenDelete,
					sellerDetails,
					setSellerDetails,
					handleInputChange,
					handleCreate,
					handleUpdate,
					closeEdit,
					closeCreate,
					landsList,
				}}
			/>
			<SellerDeleteModal
				name={sellerDetails.name}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				handleDelete={handleDelete}
			/>
			<Notification {...{ notify, setNotify }} />
		</>
	);
}
