import React, { useEffect, useState, useContext } from "react";
import {
	Container,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Fab,
	makeStyles,
	Typography,
	InputAdornment,
	TextField,
	Grid,
	Card,
} from "@material-ui/core";

import opencage from "opencage-api-client";

import AddIcon from "@material-ui/icons/Add";
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import LandModalCRUD from "../Land/LandModalCRUD";
import HeightIcon from "@material-ui/icons/Height";

import { getCenter } from "../../Functions/GetCenter";
import { getDistance } from "../../Functions/GetDistance";
import { getCardinal } from "../../Functions/GetCardinal";
import { calcArea, numberWithCommas } from "../../Functions/functions";
import { ENDPOINTS, createAPIEndpoint } from "../../api/index";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import CreateSellerModal from "../Land/CreateSellerModal";
import Notification from "../Notification";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	list: {
		marginTop: theme.spacing(1),
		overflow: "auto",
		maxHeight: 250,
		maxWidth: 600,
	},
	area: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	addIcon: {
		marginRight: theme.spacing(1),
	},
	removeIcon: {
		marginLeft: theme.spacing(2),
	},
	noMarker: {
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(5),
	},
	createButtons: {
		marginBottom: theme.spacing(2),
	},
	backIcon: {
		marginLeft: theme.spacing(1),
	},
	form: {
		marginTop: theme.spacing(1),
	},
	inputItem: {
		margin: theme.spacing(1),
		width: 200,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	containerModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "70rem",
		height: "42rem",
	},
	paper: {
		height: 50,
		width: 150,
		margin: theme.spacing(1),
	},
}));

const OpenCageKey = `1c1923023a2f4405a401ed5e758b764b`;

const cityCenter = {
	lat: 46.77412867609914,
	lng: 23.592646973597294,
};

const CoordstoString = (point) => {
	return point.lat.toString() + ", " + point.lng.toString();
};

export default function CreateLandArea(props) {
	const history = useHistory();
	const { markers, setMarkers, editing, setEditing, selectedLand } = props;
	const { user } = useContext(AuthContext);
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);
	const [notify, setNotify] = useState({ isOpen: false });
	const [details, setDetails] = useState({
		areaMeasure: 0,
		address: "",
		city: "",
		cityDistance: 0,
		pricePerSquareMeter: 0,
		totalPrice: 0,
		sellerId: null,
		sellerName: "",
		agentName: user ? user.name : "",
		agentId: user ? user.id : "",
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
	const [addressPoint, setAddressPoint] = useState(null);
	const [sellersList, setSellersList] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.SELLER)
			.fetchAll()
			.then((res) => {
				let sellerList = res.data;
				let sellers = sellerList.filter(
					(seller) => seller.landForSale === null
				);
				setSellersList(sellers);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		opencage
			.geocode({
				key: OpenCageKey,
				q: CoordstoString(getCenter(markers)),
			})
			.then((response) => {
				let results = response.results[0];
				setAddressPoint(results.formatted);
				setDetails({
					...details,
					address: results.formatted,
					city: results.components.city,
					cityDistance: getDistance(cityCenter, getCenter(markers)),
				});
			});
	}, [markers.length > 2]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setDetails({
			...details,
			[name]: value,
		});
	};

	const handlePriceChange = (e) => {
		let Total = e.target.value * Math.floor(details.areaMeasure);
		setDetails({
			...details,
			pricePerSquareMeter: e.target.value,
			totalPrice: Total,
		});
	};

	const handleSellerChange = (e) => {
		let seller = sellersList.filter(
			(seller) => seller.name === e.target.value
		)[0];
		setDetails({
			...details,
			sellerName: seller.name,
			seller: seller.sellerID,
		});
	};

	const handleCheckBoxChange = (e) => {
		setDetails({ ...details, [e.target.name]: e.target.checked });
	};

	const validateSubmit = () => {
		let temp = {};
		temp.details = details.usedFor === "" ? "Usage required" : "";
		temp.rateStars = details.rateStars === "" ? "Grade required" : "";
		temp.pricePerSquareMeter =
			details.pricePerSquareMeter === 0 ? "Price required" : "";
		temp.commission = details.commission === 0 ? "Commission required" : "";
		setErrors({ temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleCreateSubmit = () => {
		delete details.sellerName;
		if (validateSubmit()) {
			createAPIEndpoint(ENDPOINTS.LANDAREA)
				.create(details)
				.then((res) => {
					setMarkers([]);
					setOpenModal(false);
					setNotify({ isOpen: true, message: "Land Created" });
					setDetails({
						areaMeasure: 0,
						address: "",
						city: "",
						cityDistance: 0,
						pricePerSquareMeter: 0,
						totalPrice: 0,
						sellerId: null,
						agentName: null,
						agentId: null,
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
				})
				.catch((err) => {
					setNotify({ isOpen: true, message: "Submit Error" });
					console.log(err);
				});
			setOpenModal(false);
		} else {
			console.log("Not a valid Submit");
		}
	};

	const handleEditSubmit = () => {
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.update(editing.id, { ...details, LandAreaID: editing.id })
			.then((res) => {
				setMarkers([]);
				setOpenModal(false);
				setNotify({ isOpen: true, message: "Land Updated" });
			})
			.catch((err) => {
				setNotify({ isOpen: true, message: "Submit Error" });
				console.log(err);
			});
		resetLand();
	};

	const nextStepAction = () => {
		if (editing.edit) {
			setDetails({
				address: selectedLand.address,
				sellerId: selectedLand.sellerId,
				customersIds: selectedLand.customersIds,
				commission: selectedLand.commission,
				commission: selectedLand.commission,
				inTown: selectedLand.inTown,
				agriculturaLand: selectedLand.agriculturaLand,
				pavedRoads: selectedLand.pavedRoads,
				needsDemolition: selectedLand.needsDemolition,
				needsDeforestation: selectedLand.needsDeforestation,
				denivelated: selectedLand.denivelated,
				electricity: selectedLand.electricity,
				water: selectedLand.water,
				sewage: selectedLand.sewage,
				internet: selectedLand.internet,
				usedFor: selectedLand.usedFor,
				rateStars: selectedLand.rateStars,
				description: selectedLand.description,
				pricePerSquareMeter: selectedLand.pricePerSquareMeter,
				geoPins: markers,
				totalPrice: (
					calcArea(markers) * selectedLand.pricePerSquareMeter
				).toFixed(0),
				cityDistance: getDistance(getCenter(markers), cityCenter),
				inTown: details.cityDistance > 1 ? false : true,
				cardinal: getCardinal(getCenter(markers), cityCenter),
				areaMeasure: calcArea(markers).toFixed(0),
				agentId: user.id,
				agentName: user.userName,
				city: selectedLand.city,
			});
		} else {
			setDetails({
				...details,
				geoPins: markers,
				inTown: details.cityDistance > 1 ? false : true,
				cardinal: getCardinal(getCenter(markers), cityCenter),
				areaMeasure: calcArea(markers).toFixed(0),
				agentId: user.id,
				agentName: user.userName,
				cityDistance: getDistance(getCenter(markers), cityCenter),
			});
		}

		setOpenModal(true);
	};

	const createComplete = () => {
		setMarkers([]);
		setOpenModal(false);
		setNotify({ isOpen: true, message: "Land Created" });
		console.log("createComplete");
	};

	const goToSeller = () => {
		history.push("/sellers");
	};

	const resetLand = () => {
		console.log("reset");

		console.log(details);
	};

	return (
		<>
			<Container className={classes.createButtons}>
				{!editing.edit ? (
					<>
						<Fab
							variant="extended"
							color="primary"
							disabled={markers.length < 3 ? true : false}
							onClick={user ? nextStepAction : () => history.push("/login")}
						>
							<AddIcon />
							Next
						</Fab>
						<Fab
							disabled={markers.length < 1 ? true : false}
							variant="extended"
							color="secondary"
							className={classes.removeIcon}
							onClick={() => setMarkers([])}
						>
							<HighlightOffIcon />
							Clear markers
						</Fab>
					</>
				) : (
					<>
						<Fab
							variant="extended"
							color="primary"
							disabled={markers.length < 3 ? true : false}
							onClick={user ? nextStepAction : () => history.push("/login")}
						>
							<EditIcon />
							Edit Details
						</Fab>
						<Fab
							variant="extended"
							color="secondary"
							className={classes.removeIcon}
							onClick={() => {
								setMarkers([]);
								setEditing(false);
							}}
						>
							<HighlightOffIcon />
							End Editing
						</Fab>
					</>
				)}

				<Grid container>
					<Grid xs={5}>
						<TextField
							disabled
							className={classes.area}
							id="standard-number"
							label="Land Area"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{numberWithCommas(Math.floor(calcArea(markers)))} m^2
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid xs={4}>
						<TextField
							disabled
							className={classes.area}
							id="standard-number"
							label="Distance"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{markers.length > 2
											? (
													getDistance(cityCenter, getCenter(markers)) / 1000
											  ).toFixed(2)
											: 0}{" "}
										Km
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid xs={2}>
						<TextField
							disabled
							className={classes.area}
							id="standard-number"
							label="Cardinal"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{getCardinal(getCenter(markers), cityCenter)}
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>

				<TextField
					disabled
					className={classes.area}
					id="standard-number"
					label="Address"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								{markers.length > 2 ? addressPoint : "Address"}
							</InputAdornment>
						),
					}}
				/>

				<List className={classes.list}>
					{markers.length > 0 ? (
						markers.map((marker, index) => (
							<ListItem
								key={index}
								button
								onClick={() => {
									navigator.clipboard.writeText(
										marker.lat + " , " + marker.lng
									);
									setNotify({
										isOpen: "true",
										message: "coordinates copied to clipboard",
									});
								}}
							>
								<ListItemIcon>
									<RoomIcon />#
								</ListItemIcon>
								<div>
									<ListItemText>lat: {marker.lat}</ListItemText>
									<ListItemText>lng: {marker.lng}</ListItemText>
									{index + 1 < markers.length && (
										<h3>
											<HeightIcon />
											{getDistance(marker, markers[index + 1])} meters
										</h3>
									)}
								</div>
							</ListItem>
						))
					) : (
						<Card>
							<Typography variant="h4" className={classes.noMarker}>
								Place at least three markers ( 3
								<RoomIcon />) on map and trace an area.
							</Typography>
						</Card>
					)}
				</List>
			</Container>
			<LandModalCRUD
				{...{
					editing,
					openModal,
					setOpenModal,
					details,
					setDetails,
					sellersList,
					handleInputChange,
					handleSellerChange,
					handlePriceChange,
					handleCheckBoxChange,
					handleCreateSubmit,
					handleEditSubmit,
					goToSeller,
				}}
			/>
			<Notification {...{ notify, setNotify }} />
		</>
	);
}
