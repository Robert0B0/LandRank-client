import React from "react";
import {
	makeStyles,
	Modal,
	Fab,
	Grid,
	FormControl,
	FormLabel,
	FormControlLabel,
	Backdrop,
	Fade,
	Container,
	Typography,
	Checkbox,
	TextField,
	MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

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
		width: "55rem",
		height: "35rem",
	},
	inputItem: {
		margin: theme.spacing(1),
		width: "100px",
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

export default function CustomerModalCRUD(props) {
	const classes = useStyles();
	const {
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
	} = props;
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
				timeout: 100,
			}}
		>
			<Fade in={openModal}>
				<Container className={classes.containerModal}>
					<Typography
						variant="h4"
						style={{ textAlign: "center", paddingTop: "40px" }}
					>
						Customer Info:
					</Typography>
					<hr />
					<FormControl>
						<Grid container spacing={1}>
							<Grid xs={4}>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Personal details:
								</FormLabel>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									required
									id="outlined-number-name"
									label="Full Name"
									variant="outlined"
									type="text"
									value={customerDetails.name}
									name="name"
									onChange={handleInputChange}
									error={customerDetails.name === ""}
									helperText={customerDetails.name === "" && "Name is required"}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-number-address"
									label="Address "
									variant="outlined"
									type="text"
									value={customerDetails.address}
									name="address"
									onChange={handleInputChange}
								/>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Company details:
								</FormLabel>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											checked={customerDetails.judicialPerson}
											onChange={(e) =>
												setCustomerDetails({
													...customerDetails,
													judicialPerson: e.target.checked,
												})
											}
											name="judicialPerson"
										/>
									}
									label="Judicial Person"
									style={{ margin: "5px" }}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									disabled={!customerDetails.judicialPerson}
									id="outlined-number-company-name"
									label="Company Name"
									variant="outlined"
									type="text"
									value={customerDetails.companyName}
									name="companyName"
									onChange={handleInputChange}
									error={
										customerDetails.judicialPerson &&
										customerDetails.companyName === ""
									}
									helperText={
										customerDetails.judicialPerson &&
										customerDetails.companyName === "" &&
										"Company name required"
									}
								/>
							</Grid>
							<Grid xs={4}>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Contact details:
								</FormLabel>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									required
									id="outlined-number-phoneNumber"
									label="Phone Number"
									variant="outlined"
									type="number"
									value={customerDetails.phoneNumber}
									name="phoneNumber"
									onChange={handleInputChange}
									error={customerDetails.phoneNumber.length < 10}
									helperText={
										customerDetails.phoneNumber.length < 10 &&
										"Valid phone number required"
									}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-email"
									label="Email"
									variant="outlined"
									type="email"
									value={customerDetails.email}
									name="email"
									onChange={handleInputChange}
								/>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Lands of Interest:
								</FormLabel>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-preferences"
									label="Preferences"
									variant="outlined"
									type="text"
									value={customerDetails.preferences}
									name="preferences"
									onChange={handleInputChange}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-landsOfInterest"
									select
									label="Intended for"
									variant="outlined"
									type="text"
									value={customerDetails.landsOfInterest}
									name="landsOfInterest"
									onChange={handleInputChange}
								>
									<MenuItem value={"Housing"}>Housing</MenuItem>
									<MenuItem value={"House complex"}>House complex</MenuItem>
									<MenuItem value={"WareHouse"}> WareHouse</MenuItem>
									<MenuItem value={"Factory"}>Factory</MenuItem>
									<MenuItem value={"Agricultural"}>Agricultural</MenuItem>
									<MenuItem value={"Park"}>Park</MenuItem>
									<MenuItem value={"Car parking"}>Car parking</MenuItem>
									<MenuItem value={"Commercial"}>Commercial</MenuItem>
									<MenuItem value={"Other"}>Other</MenuItem>
								</TextField>
							</Grid>
							<Grid xs={3}>
								<FormLabel
									component="legend"
									style={{
										textAlign: "center",
										marginTop: "20px",
										marginBottom: "10px",
									}}
								>
									Payment details:
								</FormLabel>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-number-budget"
									label="Maximum Budget €"
									variant="outlined"
									type="text"
									value={customerDetails.budget.toLocaleString()}
									name="budget"
									onChange={handleInputChange}
									error={customerDetails.budget <= 0}
									helperText={
										customerDetails.budget <= 0 ? "Budget is required" : ""
									}
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											checked={customerDetails.fullPayment}
											onChange={(e) =>
												setCustomerDetails({
													...customerDetails,
													fullPayment: e.target.checked,
												})
											}
											name="fullPayment"
										/>
									}
									label="Full Payment"
									style={{ margin: "5px" }}
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											checked={customerDetails.immediatePayment}
											onChange={(e) =>
												setCustomerDetails({
													...customerDetails,
													immediatePayment: e.target.checked,
												})
											}
											name="immediatePayment"
										/>
									}
									label="Immediate Payment"
									style={{ margin: "5px" }}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Bank"
									variant="outlined"
									type="text"
									value={customerDetails.bank}
									name="bank"
									onChange={handleInputChange}
								/>
							</Grid>
						</Grid>
					</FormControl>
					<hr />
					<Grid container justifyContent="flex-end">
						{!update ? (
							<>
								<Fab variant="extended" color="primary" onClick={handleCreate}>
									<AddIcon />
									Add Customer
								</Fab>
								<Fab
									variant="extended"
									color="primary"
									className={classes.removeIcon}
									onClick={closeCreate}
								>
									<ArrowBackIcon />
									Back
								</Fab>
							</>
						) : (
							<>
								<Fab
									variant="extended"
									color="primary"
									onClick={handleUpdate}
									style={{ marginRight: "10px" }}
								>
									<EditIcon />
									Modify
								</Fab>
								<Fab
									variant="extended"
									color="secondary"
									onClick={() => setOpenDelete(true)}
								>
									<DeleteForeverIcon />
									Remove
								</Fab>
								<Fab
									variant="extended"
									color="primary"
									className={classes.removeIcon}
									onClick={closeEdit}
								>
									<ArrowBackIcon />
									Back
								</Fab>
							</>
						)}
					</Grid>
				</Container>
			</Fade>
		</Modal>
	);
}
