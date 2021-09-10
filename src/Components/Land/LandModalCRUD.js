import React, { useState } from "react";
import {
	Container,
	Fab,
	makeStyles,
	Typography,
	TextField,
	MenuItem,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Modal,
	Backdrop,
	Fade,
	Grid,
	Button,
} from "@material-ui/core";

import { numberWithCommas } from "../../Functions/functions";
import Rating from "@material-ui/lab/Rating";

import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	list: {
		marginTop: theme.spacing(1),
		overflow: "auto",
		maxHeight: 450,
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
		marginTop: theme.spacing(20),
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
		height: "44rem",
	},
	paper: {
		height: 50,
		width: 150,
		margin: theme.spacing(1),
	},
}));

const Cardinals = [
	"North",
	"North East",
	"East",
	"South East",
	"South",
	"South West",
	"West",
	"North West",
];

const Stars = [
	"Very Appealing",
	"Good",
	"Average",
	"Not Valuable",
	"Dispensable",
];

const Usage = [
	"Housing",
	"House complex",
	"WareHouse ",
	"Factory",
	"Agricultural",
	"Park",
	"Car parking",
	"Commercial",
	"Other",
];

export default function LandModalCRUD(props) {
	const {
		editing,
		openModal,
		setOpenModal,
		details,
		sellersList,
		handleCheckBoxChange,
		handleInputChange,
		handlePriceChange,
		goToSeller,
		handleEditSubmit,
		handleSellerChange,
		handleCreateSubmit,
	} = props;
	const classes = useStyles();

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={openModal}
			onClose={() => setOpenModal(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={openModal}>
				<Container className={classes.containerModal}>
					<Typography
						variant="h4"
						style={{ textAlign: "center", paddingTop: "10px" }}
					>
						Land Details:
					</Typography>
					<hr />
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<FormControl>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Pricing details:
								</FormLabel>
								<Grid>
									<TextField
										className={classes.inputItem}
										style={{ width: "150px" }}
										required
										id="outlined-number-price"
										label="€ Price per m^2 "
										variant="outlined"
										type="number"
										value={details.pricePerSquareMeter}
										name="pricePerSquareMeter"
										onChange={handlePriceChange}
										error={details.pricePerSquareMeter === 0}
										helperText={
											details.pricePerSquareMeter === 0 && "price required"
										}
									/>
									<TextField
										className={classes.inputItem}
										disabled
										id="outlined-number-area"
										label="Area m^2"
										variant="standard"
										type="number"
										value={Math.floor(details.areaMeasure)}
										style={{ marginTop: "8px", width: "100px" }}
									/>
									<TextField
										className={classes.inputItem}
										style={{ width: "150px" }}
										disabled
										id="outlined-number-Totalprice"
										label="€ Total Price"
										variant="standard"
										type="number"
										value={details.totalPrice}
									/>
								</Grid>
								<Grid>
									<TextField
										className={classes.inputItem}
										style={{ width: "150px" }}
										name="commission"
										id="outlined-number-Commission"
										label="% Commission"
										variant="outlined"
										type="number"
										value={details.commission}
										onChange={handleInputChange}
										error={details.commission === 0}
										helperText={
											details.commission === 0 && "commission required"
										}
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={details.auction}
												onChange={handleCheckBoxChange}
												name="auction"
											/>
										}
										label="Auction"
										style={{ margin: "5px" }}
									/>
								</Grid>
								<Grid>
									<FormLabel
										component="legend"
										style={{
											textAlign: "center",
											marginTop: "20px",
											marginBottom: "10px",
										}}
									>
										Location details:
									</FormLabel>
									<TextField
										className={classes.inputItem}
										style={{ width: "250px" }}
										required
										id="outlined-text-address"
										label="General Address"
										variant="outlined"
										value={details.address}
										name="address"
										onChange={handleInputChange}
									/>
									<TextField
										className={classes.inputItem}
										style={{ width: "150px" }}
										required
										id="outlined-text-city"
										label="City"
										variant="outlined"
										value={details.city}
										name="city"
										onChange={handleInputChange}
									/>
									<TextField
										className={classes.inputItem}
										style={{ width: "200px" }}
										number
										id="outlined-cityDistance"
										label="Distance from city center"
										variant="outlined"
										value={details.cityDistance}
										name="cityDistance"
										onChange={handleInputChange}
									/>

									<TextField
										className={classes.inputItem}
										style={{ width: "150px" }}
										id="outlined-select-cardinal"
										label="Cardinal"
										variant="outlined"
										value={details.cardinal}
										name="cardinal"
										/* onChange={handleInputChange} 
										error={details.cardinal === ""}
										helperText={details.cardinal === "" && "cardinal required"} */
									>
										{/* 	{Cardinals.map((cardinal, index) => (
											<MenuItem key={index} value={cardinal}>
												{cardinal}
											</MenuItem>
										))} */}
									</TextField>
								</Grid>
								<Grid>
									<FormLabel
										component="legend"
										style={{
											textAlign: "center",
											marginTop: "20px",
											marginBottom: "10px",
										}}
									>
										Involved Parties:
									</FormLabel>

									<TextField
										className={classes.inputItem}
										select
										id="outlined-select-seller"
										label="Seller"
										variant="outlined"
										value={details.sellerName}
										name="seller"
										onChange={handleSellerChange}
									>
										{sellersList.length > 0 ? (
											sellersList.map((seller, index) => (
												<MenuItem key={index} value={seller.name}>
													{seller.judicialPerson ? (
														<BusinessIcon />
													) : (
														<AccountCircleIcon />
													)}
													&nbsp;&nbsp;&nbsp;
													{seller.name}
												</MenuItem>
											))
										) : (
											<MenuItem>"No sellers available"</MenuItem>
										)}
									</TextField>

									<Fab
										style={{ marginTop: "10px", marginLeft: "10px" }}
										variant="extended"
										color=""
										onClick={goToSeller}
									>
										<AddIcon />
										Add Land Seller
									</Fab>
								</Grid>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Land attributes :
								</FormLabel>
								<Grid container>
									<Grid xs={6}>
										<FormLabel
											component="legend"
											style={{
												marginTop: "20px",
												marginBottom: "10px",
											}}
										>
											Specifications :
										</FormLabel>
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.inTown}
														onChange={handleCheckBoxChange}
														name="inTown"
													/>
												}
												label="In Town Area"
											/>

											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.pavedRoads}
														onChange={handleCheckBoxChange}
														name="pavedRoads"
													/>
												}
												label="Paved Roads"
											/>

											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.needsDemolitionService}
														onChange={handleCheckBoxChange}
														name="needsDemolitionService"
													/>
												}
												label="Needing demolition"
											/>

											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.agriculturalLand}
														onChange={handleCheckBoxChange}
														name="agriculturalLand"
													/>
												}
												label="Agricultural Land"
											/>

											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.denivelation}
														onChange={handleCheckBoxChange}
														name="denivelation"
													/>
												}
												label="Denivelated Land"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.needsDeforestation}
														onChange={handleCheckBoxChange}
														name="needsDeforestation"
													/>
												}
												label="Needing deforestation"
											/>
										</FormGroup>
									</Grid>
									<Grid xs={3}>
										<FormLabel
											component="legend"
											style={{
												marginTop: "20px",
												marginBottom: "10px",
											}}
										>
											Utilities :
										</FormLabel>
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.electricity}
														onChange={handleCheckBoxChange}
														name="electricity"
													/>
												}
												label="Electricity"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.water}
														onChange={handleCheckBoxChange}
														name="water"
													/>
												}
												label="Water"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.sewage}
														onChange={handleCheckBoxChange}
														name="sewage"
													/>
												}
												label="Sewage"
											/>
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														checked={details.internet}
														onChange={handleCheckBoxChange}
														name="internet"
													/>
												}
												label="Internet"
											/>
										</FormGroup>
									</Grid>

									<Grid style={{ paddingTop: "15px" }}>
										<TextField
											className={classes.inputItem}
											style={{ width: "200px" }}
											required
											select
											id="outlined-text-usedfor"
											label="Used for"
											variant="outlined"
											value={details.usedFor}
											name="usedFor"
											onChange={handleInputChange}
											error={details.usedFor === ""}
											helperText={details.usedFor === "" && "usage required"}
										>
											{Usage.map((use, index) => (
												<MenuItem key={index} value={use}>
													{use}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid>
										<Typography
											component="legend"
											style={{ marginLeft: "20px", marginTop: "10px" }}
										>
											Land Rate
										</Typography>
										<Rating
											size="large"
											name="rateStars"
											value={details.rateStars}
											onChange={handleInputChange}
											style={{ marginLeft: "20px" }}
										/>
									</Grid>
								</Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "410px" }}
									multiline
									maxRows={4}
									id="outlined-text-description"
									label="Summary"
									variant="outlined"
									value={details.description}
									name="description"
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<hr />
					<Grid container justifyContent="flex-end">
						{!editing.edit ? (
							<>
								<Fab
									variant="extended"
									color="primary"
									/* disabled={markers.length < 3 ? true : false} */
									onClick={handleCreateSubmit}
								>
									<AddIcon />
									Add Land Area
								</Fab>
							</>
						) : (
							<>
								<Fab
									variant="extended"
									color="primary"
									/* disabled={markers.length < 3 ? true : false} */
									onClick={handleEditSubmit}
								>
									<AddIcon />
									Update Land Area
								</Fab>
							</>
						)}
						<Fab
							variant="extended"
							color="secondary"
							className={classes.removeIcon}
							onClick={() => setOpenModal(false)}
						>
							<ArrowBackIcon />
							Back
						</Fab>
					</Grid>
				</Container>
			</Fade>
		</Modal>
	);
}
