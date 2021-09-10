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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LandTableRow from "../Components/Land/LandTableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import Notification from "../Components/Notification";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CloseDeal from "../Components/Land/CloseDeal";

import { LandCompare } from "../context/compare";
import { createAPIEndpoint, ENDPOINTS } from "../api/index";
import { SpecificLand } from "../context/SpecificLand";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
import moment from "moment";

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

export default function EstateLands(props) {
	const classes = useStyles();
	const user = useContext(AuthContext);
	const focusLand = useContext(SpecificLand);
	const history = useHistory();
	const compareContext = useContext(LandCompare);

	const [openModal, setOpenModal] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openCloseDeal, setOpenCloseDeal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState(false);
	const [errors, setErrors] = useState({});
	const [notify, setNotify] = useState({ isOpen: false });
	const [sort, setSort] = useState("Price Ascending");
	const [dealRecord, setDealRecord] = useState({
		landAddress: "",
		landCardinal: "",
		landType: "",
		landArea: "",
		totalPrice: "",
		pricePerSquareMeter: "",
		commissionPercentage: "",
		commission: "",
		profit: "",
		sellerCompany: "",
		customerName: "",
		customerCompany: "",
		dealDate: "",
		removeSeller: false,
		removeCustomer: false,
		agentName: user.name,
		agentID: user.id,
	});
	const [landDetails, setLandDetails] = useState({
		landAreaID: null,
		areaMeasure: 0,
		address: "",
		city: "",
		cityDistance: 0,
		pricePerSquareMeter: 0,
		totalPrice: 0,
		sellerId: null,
		customersIds: null,
		commission: 0,
		auction: false,
		cardinal: "",
		inTown: false,
		agriculturaLand: false,
		pavedRoads: false,
		needsDemolition: false,
		needsDeforestation: false,
		denivelated: false,
		electricity: false,
		water: false,
		sewage: false,
		internet: false,
		usedFor: "",
		rateStars: "",
		description: "",
	});
	const [landList, setLandsList] = useState([]);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.fetchAll()
			.then((res) => {
				let lands = res.data;
				switch (sort) {
					case "Price Ascending":
						lands.sort((a, b) =>
							a.totalPrice > b.totalPrice
								? 1
								: a.totalPrice < b.totalPrice
								? -1
								: 0
						);
						break;
					case "Price Descending":
						lands.sort((a, b) =>
							a.totalPrice < b.totalPrice
								? 1
								: a.totalPrice > b.totalPrice
								? -1
								: 0
						);
						break;
					case "Price m^2 Ascending":
						lands.sort((a, b) =>
							a.pricePerSquareMeter > b.pricePerSquareMeter
								? 1
								: a.pricePerSquareMeter < b.pricePerSquareMeter
								? -1
								: 0
						);
						break;
					case "Price m^2 Descending":
						lands.sort((a, b) =>
							a.pricePerSquareMeter < b.pricePerSquareMeter
								? 1
								: a.pricePerSquareMeter > b.pricePerSquareMeter
								? -1
								: 0
						);
						break;
					case "Area Ascending":
						lands.sort((a, b) =>
							a.areaMeasure > b.areaMeasure
								? 1
								: a.areaMeasure < b.areaMeasure
								? -1
								: 0
						);
						break;
					case "Area Descending":
						lands.sort((a, b) =>
							a.areaMeasure < b.areaMeasure
								? 1
								: a.areaMeasure > b.areaMeasure
								? -1
								: 0
						);
						break;
					case "Rating Ascending":
						lands.sort((a, b) =>
							a.rateStars > b.rateStars ? 1 : a.rateStars < b.rateStars ? -1 : 0
						);
						break;
					case "Rating Descending":
						lands.sort((a, b) =>
							a.rateStars < b.rateStars ? 1 : a.rateStars > b.rateStars ? -1 : 0
						);
						break;
				}

				setLandsList(lands);
			})
			.finally(setLoading(false))
			.catch((err) => console.log(err))
			.finally(setLoading(false));
	}, [sort]);

	const editLand = (id) => {
		focusLand.landAreaID = id;
		history.push("/");
	};

	const addToCompare = (id) => {
		if (compareContext.landA !== id && compareContext.landB !== id) {
			let foundLand = landList.find((land) => land.landAreaID === id);
			compareContext.landA = compareContext.landB;
			compareContext.landB = foundLand;
		}

		setNotify({ isOpen: true, message: "Land Added to Comparison" });
	};

	const handleDealInputChange = (e) => {
		if (e.target.name === "removeSeller") {
			setDealRecord({
				...dealRecord,
				removeSeller: e.target.checked,
			});
		} else if (e.target.name === "removeCustomer") {
			setDealRecord({
				...dealRecord,
				removeCustomer: e.target.checked,
			});
		} else if (e.target.name === "customerName") {
			let item = dealRecord.customerList.filter(
				(item) => item.customer.name === e.target.value
			);
			setDealRecord({
				...dealRecord,
				customerID: item[0].customer.customerID,
				customerName: item[0].customer.name,
				customerCompany: item[0].customer.judicialPerson
					? item[0].customer.companyName
					: "",
				customerPhoneNumber: item[0].customer.phoneNumber,
				customerEmail: item[0].customer.email,
			});
		} else {
			const { value, name } = e.target;
			setDealRecord({ ...dealRecord, [name]: value });
		}
	};

	const DealOpenModal = (id) => {
		let land = landList.find((land) => land.landAreaID === id);
		setDealRecord({
			landID: land.landAreaID,
			landAddress: land.address,
			landCardinal: land.cardinal,
			landType: land.usedFor,
			landArea: land.areaMeasure,
			totalPrice: land.totalPrice,
			pricePerSquareMeter: land.pricePerSquareMeter,
			commissionPercentage: land.commission,
			commission: ((land.totalPrice * land.commission) / 100).toFixed(2),
			sellerID: land.seller.sellerID,
			sellerName: land.seller ? land.seller.name : "Needs assignment",
			sellerCompany: land.seller
				? land.seller.companyName
					? land.seller.companyName
					: ""
				: "Needs assignment",
			sellerPhoneNumber: land.seller
				? land.seller.phoneNumber
				: "Needs assignment",
			sellerEmail: land.seller ? land.seller.email : "Needs assignment",
			customerList: land.potentialDeal,
			customerID: "",
			customerName: "",
			customerCompany: "",
			customerPhoneNumber: "",
			customerEmail: "",
			removeSeller: false,
			removeCustomer: false,
			dealDate: Date.now(),
		});
		setOpenCloseDeal(true);
	};

	const DealCreate = () => {
		let deal = {
			landAddress: dealRecord.landAddress,
			landCardinal: dealRecord.landCardinal,
			landType: dealRecord.landType,
			landArea: dealRecord.landArea,
			totalPrice: dealRecord.totalPrice,
			pricePerSquareMeter: dealRecord.pricePerSquareMeter,
			commissionPercentage: dealRecord.commissionPercentage,
			commission: dealRecord.commission,
			sellerName: dealRecord.sellerName,
			sellerCompany: dealRecord.sellerCompany,
			sellerPhoneNumber: dealRecord.sellerPhoneNumber,
			sellerEmail: dealRecord.sellerEmail,
			customerName: dealRecord.customerName,
			customerCompany: dealRecord.customerCompany,
			customerPhoneNumber: dealRecord.customerPhoneNumber,
			customerEmail: dealRecord.customerEmail,
			dealDate: moment(dealRecord.dealDate).format("DD-MM-YYYY"),
			agentId: user.user.id,
			agentName: user.user.userName,
		};

		if (dealRecord.removeCustomer) {
			createAPIEndpoint(ENDPOINTS.CUSTOMER)
				.delete(dealRecord.customerID)
				.catch((err) => console.log(err));
		}
		if (dealRecord.removeSeller) {
			createAPIEndpoint(ENDPOINTS.SELLER)
				.delete(dealRecord.sellerID)
				.catch((err) => console.log(err));
		}
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.delete(dealRecord.landID)
			.catch((err) => console.log(err));

		createAPIEndpoint(ENDPOINTS.DEAL)
			.create(deal)
			.then((res) => {
				setNotify({ isOpen: true, message: "Deal Finished" });
			})
			.catch((err) => {
				console.log(err);
				setNotify({ isOpen: true, message: "Creation Error" });
			});
		setOpenCloseDeal(false);
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
								<Typography variant="h4">Loading Land Areas...</Typography>
							</Grid>
						</Grid>
						<LinearProgress />
					</>
				) : (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Land Areas</Typography>
							</Grid>
							<Grid xs={6}>
								<TextField
									select
									style={{ width: "250px" }}
									value={sort}
									label="Sort Lands By :"
									variant="outlined"
									onClick={(e) => handleSort(e.target.value)}
								>
									<MenuItem value={"Price Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Price Ascending
									</MenuItem>
									<MenuItem value={"Price Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Price Descending
									</MenuItem>
									<MenuItem value={"Price m^2 Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Price per m^2 Ascending
									</MenuItem>
									<MenuItem value={"Price m^2 Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Price per m^2 Descending
									</MenuItem>
									<MenuItem value={"Area Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Area Ascending
									</MenuItem>
									<MenuItem value={"Area Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Area Descending
									</MenuItem>
									<MenuItem value={"Rating Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Rating Ascending
									</MenuItem>
									<MenuItem value={"Rating Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Rating Descending
									</MenuItem>
								</TextField>
							</Grid>
						</Grid>
						<hr />
					</>
				)}
				{!loading ? (
					<TableContainer className={classes.tableContainer}>
						<Table className={classes.table}>
							<TableBody>
								{landList.map((land) => (
									<LandTableRow
										key={land.id}
										setNotify={setNotify}
										editLand={editLand}
										setOpenDelete={setOpenDelete}
										land={land}
										addToCompare={addToCompare}
										user={user}
										DealOpenModal={DealOpenModal}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : !landList.length ? (
					<Typography variant="h4">No Lands added yet.</Typography>
				) : (
					<Typography variant="h4">Loading Land Areas List.</Typography>
				)}
			</Container>
			<Notification {...{ notify, setNotify }} />
			<CloseDeal
				{...{
					openCloseDeal,
					setOpenCloseDeal,
					handleDealInputChange,
					dealRecord,
					DealCreate,
				}}
				land={landDetails}
				agentName={user.name}
				agentID={user.id}
			/>
		</>
	);
}
