import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useContext,
} from "react";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
	Polygon,
} from "@react-google-maps/api";

import mapStyles from "../mapStyles";

import {
	Grid,
	Typography,
	Button,
	Tooltip,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import CreateLandArea from "../Components/Land/CreateLandArea";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import EditIcon from "@material-ui/icons/Edit";
import ErrorIcon from "@material-ui/icons/Error";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import { getCenter } from "../Functions/GetCenter";
import { numberWithCommas } from "../Functions/NumCom";
import { createAPIEndpoint, ENDPOINTS } from "../api/index";
import { AuthContext } from "../context/auth";
import { SpecificLand } from "../context/SpecificLand";
import Notification from "../Components/Notification";
import { LandCompare } from "../context/compare";
import LandModalDelete from "../Components/Land/LandModalDelete";
import SellerInfo from "../Components/Land/SellerInfo";

const libraries = ["geometry, places"];
const mapContainerStyle = {
	width: "57vw",
	height: "77vh",
};
const mapSettings = {
	center: {
		lat: 46.77121,
		lng: 23.623634,
	},
	zoom: 12,
	options: {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: true,
		mapTypeControl: true,
	},
	mapTypeId: "satellite",
};

const cityCenter = {
	lat: 46.77412867609914,
	lng: 23.592646973597294,
};

const GoogleMapsKey = process.env.REACT_APP_GOOGLE_API_KEY;

export default function MapHome() {
	const { user } = useContext(AuthContext);

	const compareContext = useContext(LandCompare);
	const focusLand = useContext(SpecificLand);

	const [markers, setMarkers] = useState([]);
	const [polyArea, setPolyArea] = useState();
	const [coords, setCoords] = useState([]);
	const [editing, setEditing] = useState({ edit: false, id: null });
	const [editDetails, setEditDetails] = useState({});
	const [openDelete, setOpenDelete] = useState(false);
	const [lands, setLands] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: GoogleMapsKey,
		libraries,
	});
	const [notify, setNotify] = useState({ isOpen: false });
	const [selectedLand, setSelectedLand] = useState({});
	const [selected, setSelected] = useState(null);
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [openSellerInfo, setOpenSellerInfo] = useState(false);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.fetchAll()
			.then((res) => {
				if (res.data.length > 0) {
					setLands(res.data);
				}
			})
			.finally(() => {
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [markers, notify]);

	useEffect(() => {
		if (focusLand.landAreaID !== 0) {
			console.log("load selected");
			let focusedLand = lands.find(
				(l) => l.landAreaID === focusLand.landAreaID
			);
			setSelectedLand({ ...focusedLand });
			selectedLand.landAreaID !== undefined &&
				setSelectedMarker(getCenter(selectedLand.geoPins));
			console.log("selected:", selectedLand);
		}
	}, [lands, loading]);

	const onMapClick = useCallback((event) => {
		setMarkers((current) => [
			...current,
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const DragMarker = (e, index) => {
		let newMarkers = markers;
		newMarkers[index].lat = e.latLng.lat();
		newMarkers[index].lng = e.latLng.lng();
		setMarkers([...newMarkers]);
	};

	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	function coordinate(coordinates) {
		let x = coordinates.map((c) => c.latitude);
		let y = coordinates.map((c) => c.longitude);

		let minX = Math.min.apply(null, x);
		let maxX = Math.max.apply(null, x);

		let minY = Math.min.apply(null, y);
		let maxY = Math.max.apply(null, y);

		return {
			latitude: (minX + maxX) / 2,
			longitude: (minY + maxY) / 2,
		};
	}

	const addToCompare = (id) => {
		if (compareContext.landA !== id && compareContext.landB !== id) {
			let foundLand = lands.find((land) => land.landAreaID === id);
			compareContext.landA = compareContext.landB;
			compareContext.landB = foundLand;
		}

		setNotify({ isOpen: true, message: "Land Added to Comparison" });
	};

	const handleDeleteLand = (id) => {
		createAPIEndpoint(ENDPOINTS.LANDAREA)
			.delete(id)
			.then((res) => {
				setNotify({ isOpen: true, message: "Land Removed" });
				setOpenDelete(false);
				setSelectedMarker(null);
			})
			.catch((err) => console.log(err));
	};

	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading maps";

	return (
		<>
			<Typography variant="h4">
				Map {loading && " - Loadings land Areas..."}
			</Typography>
			<hr />
			<Grid container spacing={1}>
				<Grid xs={8}>
					<GoogleMap
						tilt={0}
						mapTypeId={"satellite"}
						mapContainerStyle={mapContainerStyle}
						zoom={mapSettings.zoom}
						center={mapSettings.center}
						options={mapSettings.options}
						onClick={onMapClick}
						onLoad={onMapLoad}
					>
						{markers.map((marker, index) => (
							<Marker
								key={index}
								position={{ lat: marker.lat, lng: marker.lng }}
								draggable={true}
								raiseOnDrag={true}
								/* onDragEnd={(e) => console.log(e.latLng.lat(), e.latLng.lng())} */
								onDragEnd={(e) => DragMarker(e, index)}
							/>
						))}
						{selected && (
							<InfoWindow
								position={{ lat: selected.lat, lng: selected.lng }}
								onCloseClick={() => setSelected(null)}
							>
								<div>
									<h2>your placement</h2>
								</div>
							</InfoWindow>
						)}
						<Polygon
							path={markers}
							options={{
								fillColor: "lightblue",
								fillOpacity: 0.75,
								strokeColor: "orange",
								strokeOpacity: 1,
								strokeWeight: 3,
							}}
						/>
						{lands.length !== 0 &&
							lands.map((land) => {
								return (
									<>
										<Polygon
											key={land.id}
											path={land.geoPins}
											options={{
												fillColor: "lightGreen",
												fillOpacity: 0.75,
												strokeColor: "orange",
												strokeOpacity: 1,
												strokeWeight: 3,
											}}
											center={"s"}
											marker={"m"}
											onClick={() => {
												setSelectedMarker(getCenter(land.geoPins));
												setSelectedLand(
													lands.find((l) => l.landAreaID === land.landAreaID)
												);
											}}
											onMouseOver={{ fillColor: "#green", strokeColor: "red" }}
										></Polygon>
										{
											<Marker
												position={getCenter(land.geoPins)}
												icon={{
													url: "/blueMark.png",
													scaledSize: new window.google.maps.Size(30, 30),
													origin: new window.google.maps.Point(0, 0),
													anchor: new window.google.maps.Point(15, 30),
												}}
											></Marker>
										}
									</>
								);
							})}
						<InfoWindow position={{ lat: cityCenter.lat, lng: cityCenter.lng }}>
							<h3>Cluj-Napoca</h3>
						</InfoWindow>
						{selectedMarker ? (
							<InfoWindow
								position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
								onCloseClick={() => {
									focusLand.landAreaID = 0;
									setSelectedMarker(null);
								}}
							>
								<>
									<Table size="small">
										<TableBody size="small">
											<TableRow>
												<TableCell>
													<Typography variant="h6">Address:</Typography>
												</TableCell>
												<TableCell>
													<Typography
														noWrap
														style={{
															maxWidth: "200px",
														}}
														variant="h6"
													>
														{selectedLand.address}
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">Seller:</Typography>
												</TableCell>
												<TableCell>
													{selectedLand.seller && (
														<Tooltip title="Seller Info">
															<Button onClick={() => setOpenSellerInfo(true)}>
																<Typography variant="h6">
																	{selectedLand.seller.judicialPerson ? (
																		<BusinessIcon />
																	) : (
																		<AccountCircleIcon />
																	)}
																	&nbsp; {selectedLand.seller.name}
																</Typography>
															</Button>
														</Tooltip>
													)}
													{!selectedLand.seller && (
														<Typography variant="h6">
															<ErrorIcon />
															Not assigned
														</Typography>
													)}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">Size:</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="h6">
														{selectedLand.areaMeasure &&
															numberWithCommas(selectedLand.areaMeasure)}{" "}
														m^2
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">Price:</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="h6">
														€
														{selectedLand.totalPrice &&
															selectedLand.totalPrice.toLocaleString()}
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">Usage:</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="h6">
														{selectedLand.usedFor}
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">Grade:</Typography>
												</TableCell>
												<TableCell>
													{selectedLand.rateStars && (
														<Rating
															readOnly
															size="large"
															name="rateStars"
															value={selectedLand.rateStars}
															style={{ marginLeft: "20px" }}
														/>
													)}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">Added by:</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="h6">
														{selectedLand.agentName === user.userName
															? "You (" + selectedLand.agentName + ")"
															: selectedLand.agentName}
													</Typography>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									{user.userName === selectedLand.agentName ? (
										<Tooltip title="Edit">
											<Button
												color="primary"
												variant="contained"
												onClick={() => {
													setMarkers(selectedLand.geoPins);
													setSelectedMarker(null);
													setEditing({
														edit: true,
														id: selectedLand.landAreaID,
													});
													console.log("selected:", selectedLand);
												}}
												style={{ marginLeft: "5px" }}
											>
												<EditIcon />
											</Button>
										</Tooltip>
									) : (
										<Tooltip title="Edit restricted">
											<Button
												variant="contained"
												disabled
												style={{ marginLeft: "5px" }}
											>
												<EditIcon />
											</Button>
										</Tooltip>
									)}
									<Tooltip title="Add to Compare">
										<Button
											variant="contained"
											color="primary"
											onClick={() => {
												addToCompare(selectedLand.landAreaID);
											}}
											style={{ marginLeft: "5px" }}
										>
											<CompareArrowsIcon />
										</Button>
									</Tooltip>
									{user.userName === selectedLand.agentName ? (
										<Tooltip title="Remove Land">
											<Button
												variant="contained"
												color="secondary"
												onClick={() => setOpenDelete(true)}
												style={{ marginLeft: "5px" }}
											>
												<DeleteIcon />
											</Button>
										</Tooltip>
									) : (
										<Tooltip title="Remove Land">
											<Button
												variant="contained"
												disabled
												style={{ marginLeft: "5px" }}
											>
												<DeleteIcon />
											</Button>
										</Tooltip>
									)}
									<Button
										style={{ marginLeft: "100px" }}
										variant="contained"
										onClick={() => {
											setSelectedMarker(null);
											focusLand.landAreaID = 0;
										}}
									>
										Close
									</Button>
								</>
							</InfoWindow>
						) : null}
					</GoogleMap>
				</Grid>
				<Grid xs={4} border>
					<CreateLandArea
						{...{ selectedLand, markers, setMarkers, editing, setEditing }}
					/>
				</Grid>
			</Grid>
			<LandModalDelete
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				LandId={selectedLand.landAreaID}
				handleDeleteLand={handleDeleteLand}
			/>
			<Notification {...{ notify, setNotify }} />
			<SellerInfo
				{...{ setOpenSellerInfo, openSellerInfo, setNotify }}
				seller={selectedLand.seller}
			/>
		</>
	);
}
