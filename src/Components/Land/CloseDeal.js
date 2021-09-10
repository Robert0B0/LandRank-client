import React, { useState, useContext } from "react";
import {
	makeStyles,
	Modal,
	Container,
	Fab,
	Fade,
	Grid,
	Backdrop,
	Typography,
	TextField,
	FormGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	Checkbox,
	CardContent,
	MenuItem,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InfoIcon from "@material-ui/icons/Info";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	containerModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "50rem",
		height: "32rem",
	},
}));

export default function CloseDeal(props) {
	const {
		openCloseDeal,
		setOpenCloseDeal,
		handleDeleteLand,
		agentName,
		agentID,
		DealCreate,
		dealRecord,
		handleDealInputChange,
	} = props;

	const classes = useStyles();
	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openCloseDeal}
				onClose={() => setOpenCloseDeal(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 100,
				}}
			>
				<Fade in={openCloseDeal}>
					<Container className={classes.containerModal}>
						<Typography
							variant="h4"
							style={{ textAlign: "center", paddingTop: "10px" }}
						>
							Close Land Transaction Deal:
						</Typography>
						<hr />
						<Grid container style={{ marginBottom: "20px" }}>
							<Grid item xs={3} style={{ marginRight: "50px" }}>
								<FormLabel
									component="legend"
									style={{
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Specifications:
								</FormLabel>
								<TextField
									style={{
										width: "200px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									id="outlined-text-address"
									label="Land Area"
									variant="outlined"
									name="landAddress"
									value={dealRecord.landAddress}
									onChange={(e) => handleDealInputChange(e)}
								/>
								<FormLabel
									component="legend"
									style={{
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Parties:
								</FormLabel>
								<TextField
									style={{
										width: "200px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									disabled
									id="outlined-text-seller"
									label="Land Seller"
									variant="outlined"
									name="sellerName"
									value={dealRecord.sellerName}
									onChange={(e) => handleDealInputChange(e)}
									required
									error={dealRecord.sellerName === "Needs assignment"}
								/>
								<TextField
									style={{
										width: "200px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									id="outlined-text-description"
									select
									label="Customer"
									required
									variant="outlined"
									name="customerName"
									value={dealRecord.customerName}
									onChange={(e) => handleDealInputChange(e)}
									error={dealRecord.customerName === "Needs assignment"}
									helperText="Select your customer"
								>
									{dealRecord.customerList
										? dealRecord.customerList.map((item) => (
												<MenuItem
													value={item.customer.name}
													key={item.customer.email}
												>
													{item.customer.judicialPerson ? (
														<BusinessIcon />
													) : (
														<AccountCircleIcon />
													)}
													&nbsp;&nbsp;&nbsp;{item.customer.name}
												</MenuItem>
										  ))
										: "No Potential Customers"}
								</TextField>
							</Grid>
							<Grid item xs={3} style={{ marginRight: "50px" }}>
								<FormLabel
									component="legend"
									style={{
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Monetary Info :
								</FormLabel>
								<TextField
									style={{
										width: "150px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									id="outlined-text-price"
									label="Price"
									variant="outlined"
									type="number"
									name="totalPrice"
									value={dealRecord.totalPrice}
									onChange={(e) => handleDealInputChange(e)}
									error={dealRecord.totalPrice <= 0}
								/>
								<TextField
									style={{
										width: "150px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									id="outlined-text-price^2"
									label="Price per m^2"
									variant="outlined"
									type="number"
									name="pricePerSquareMeter"
									value={dealRecord.pricePerSquareMeter}
									onChange={(e) => handleDealInputChange(e)}
									error={dealRecord.pricePerSquareMeter <= 0}
								/>
								<TextField
									style={{
										width: "150px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									id="outlined-text-comission%"
									label="Comission %"
									variant="outlined"
									type="number"
									name="commissionPercentage"
									value={dealRecord.commissionPercentage}
									onChange={(e) => handleDealInputChange(e)}
									error={dealRecord.commissionPercentage <= 0}
								/>
								<TextField
									style={{
										width: "150px",
										marginTop: "10px",
										marginLeft: "10px",
									}}
									id="outlined-text-comission"
									label="Commission €"
									variant="outlined"
									type="number"
									name="commission"
									value={dealRecord.commission}
									onChange={(e) => handleDealInputChange(e)}
									error={dealRecord.commission <= 0}
								/>
							</Grid>
							<Grid item xs={4}>
								<FormLabel
									component="legend"
									style={{
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Options :
								</FormLabel>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={dealRecord.removeSeller}
												onChange={(e) => handleDealInputChange(e)}
												name="removeSeller"
											/>
										}
										label="Remove Seller"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={dealRecord.removeCustomer}
												onChange={(e) => handleDealInputChange(e)}
												name="removeCustomer"
											/>
										}
										label="Remove Customer"
									/>
									<TextField
										style={{ marginTop: "10px" }}
										label="Deal Date"
										type="date"
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</FormGroup>
								<CardContent>
									<Typography variant="body1">
										<InfoIcon
											style={{ marginRight: "10px" }}
											color="primary"
											fontSize="large"
										/>
										Land Area will be removed and the transaction record will be
										stored in Deal Records.
									</Typography>
								</CardContent>
							</Grid>
						</Grid>
						<hr />
						<Grid container justifyContent="flex-end">
							<>
								<Fab
									variant="extended"
									color="primary"
									style={{ marginRight: "10px" }}
									onClick={DealCreate}
								>
									<DeleteForeverIcon />
									Close Deal
								</Fab>
								<Fab
									variant="extended"
									color="primary"
									className={classes.removeIcon}
									onClick={() => {
										setOpenCloseDeal(false);
									}}
								>
									<ArrowBackIcon />
									Back
								</Fab>
							</>
						</Grid>
					</Container>
				</Fade>
			</Modal>
		</>
	);
}
