import React, { useState, useEffect, useContext } from "react";
import {
	Container,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	makeStyles,
	Typography,
	Tooltip,
	Button,
	Fab,
} from "@material-ui/core";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import {
	FaEquals,
	FaNotEqual,
	FaGreaterThan,
	FaLessThan,
	FaCheck,
} from "react-icons/fa";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import Rating from "@material-ui/lab/Rating";
import { SpecificLand } from "../context/SpecificLand";
import { useHistory } from "react-router-dom";
import { LandCompare } from "../context/compare";
import { GrClose } from "react-icons/gr";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function Compare() {
	const classes = useStyles();
	const focusLand = useContext(SpecificLand);
	const history = useHistory();

	const landContext = useContext(LandCompare);
	const [leftLand, setLeftLand] = useState({
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
	const [rightLand, setRightLand] = useState({
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

	useEffect(() => {
		if (
			landContext.landA.landAreaID !== null &&
			landContext.landB.landAreaID !== null
		) {
			setLeftLand(landContext.landA);
			setRightLand(landContext.landB);
		}
	}, []);

	const editLand = (id) => {
		focusLand.landAreaID = id;
		console.log("id in lands:", focusLand);
		history.push("/");
	};

	const clearComparison = () => {
		landContext.landA.landAreaID = null;
		landContext.landB.landAreaID = null;
		setLeftLand({
			address: "",
			cardinal: "",
			cityDistance: 0,
			totalPrice: 0,
			areaMeasure: 0,
			rateStars: 0,
			water: false,
			sewage: false,
			electricity: false,
			internet: false,
		});
		setRightLand({
			address: "",
			cardinal: "",
			cityDistance: 0,
			totalPrice: 0,
			areaMeasure: 0,
			rateStars: 0,
			water: false,
			sewage: false,
			electricity: false,
			internet: false,
		});
	};

	return (
		<div>
			<Grid container>
				<Grid item xs={6}>
					<Typography variant="h4">Compare Lands</Typography>
				</Grid>
				<Grid item xs={6}>
					<Fab variant="extended" color="primary" onClick={clearComparison}>
						<ClearIcon /> Reset Comparison
					</Fab>
				</Grid>
			</Grid>
			<hr />
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center" width="300px">
								<Typography variant="h5">Lands</Typography>
							</TableCell>
							<TableCell align="center" width="300px">
								<Typography variant="h5">
									Land A
									<Tooltip title="edit/view in map">
										<Button onClick={() => editLand(leftLand.landAreaID)}>
											<EditIcon />
										</Button>
									</Tooltip>
								</Typography>
							</TableCell>
							<TableCell align="center" width="300px">
								<Typography variant="h5">
									Land B
									<Tooltip title="edit/view in map">
										<Button onClick={() => editLand(leftLand.landAreaID)}>
											<EditIcon />
										</Button>
									</Tooltip>
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Address:</Typography>
							</TableCell>
							<TableCell align="center">
								<Typography variant="h5">{leftLand.address}</Typography>
							</TableCell>
							<TableCell align="center">
								<Typography variant="h5">{rightLand.address}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Relative Cardinal:</Typography>
							</TableCell>
							<TableCell align="center">
								<Typography variant="h5">{leftLand.cardinal}</Typography>
							</TableCell>

							<TableCell align="center">
								<Typography variant="h5">{rightLand.cardinal}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Length from city center:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.cityDistance > rightLand.cityDistance
										? { backgroundColor: "#F08080" }
										: { backgroundColor: "#90EE90" }
								}
							>
								<Typography variant="h5">
									{(leftLand.cityDistance / 1000).toFixed(2)} km
								</Typography>
							</TableCell>

							<TableCell
								align="center"
								style={
									leftLand.cityDistance < rightLand.cityDistance
										? { backgroundColor: "#F08080" }
										: { backgroundColor: "#90EE90" }
								}
							>
								<Typography variant="h5">
									{(rightLand.cityDistance / 1000).toFixed(2)} km
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Price:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.totalPrice > rightLand.totalPrice
										? { backgroundColor: "#F08080" }
										: { backgroundColor: "#90EE90" }
								}
							>
								<Typography variant="h5">
									€{leftLand.totalPrice.toLocaleString()}
								</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.totalPrice < rightLand.totalPrice
										? { backgroundColor: "#F08080" }
										: { backgroundColor: "#90EE90" }
								}
							>
								<Typography variant="h5">
									€{rightLand.totalPrice.toLocaleString()}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Area:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.areaMeasure > rightLand.areaMeasure
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{leftLand.areaMeasure.toLocaleString()} m^2
								</Typography>
							</TableCell>

							<TableCell
								align="center"
								style={
									leftLand.areaMeasure < rightLand.areaMeasure
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{rightLand.areaMeasure.toLocaleString()} m^2
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Rate:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.rateStars > rightLand.rateStars
										? { backgroundColor: "#90EE90" }
										: leftLand.rateStars < rightLand.rateStars
										? { backgroundColor: "#F08080" }
										: { backgroundColor: "#90EE90" }
								}
							>
								<Rating readOnly size="large" value={rightLand.rateStars} />
							</TableCell>

							<TableCell
								align="center"
								style={
									leftLand.rateStars > rightLand.rateStars
										? { backgroundColor: "#90EE90" }
										: leftLand.rateStars < rightLand.rateStars
										? { backgroundColor: "#F08080" }
										: { backgroundColor: "#90EE90" }
								}
							>
								<Rating readOnly size="large" value={leftLand.rateStars} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Water linked:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.water
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{leftLand.water ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>

							<TableCell
								align="center"
								style={
									rightLand.water
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{rightLand.water ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Sewage linked:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.sewage
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{leftLand.sewage ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>

							<TableCell
								align="center"
								style={
									rightLand.sewage
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{rightLand.sewage ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Electricity linked:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.electricity
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{leftLand.electricity ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>

							<TableCell
								align="center"
								style={
									rightLand.electricity
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{rightLand.electricity ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">
								<Typography variant="h5">Internet connection:</Typography>
							</TableCell>
							<TableCell
								align="center"
								style={
									leftLand.internet
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{leftLand.internet ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>

							<TableCell
								align="center"
								style={
									rightLand.internet
										? { backgroundColor: "#90EE90" }
										: { backgroundColor: "#F08080" }
								}
							>
								<Typography variant="h5">
									{rightLand.internet ? <FaCheck /> : <GrClose />}
								</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
