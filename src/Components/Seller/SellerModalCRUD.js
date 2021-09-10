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
import RoomIocn from "@material-ui/icons/Room";

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

export default function SellerModalCRUD(props) {
	const classes = useStyles();
	const {
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
						Seller Info:
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
									value={sellerDetails.name}
									name="name"
									onChange={handleInputChange}
									error={sellerDetails.name === ""}
									helperText={sellerDetails.name === "" && "Name is required"}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-number-address"
									label="Address "
									variant="outlined"
									type="text"
									value={sellerDetails.address}
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
											checked={sellerDetails.judicialPerson}
											onChange={(e) =>
												setSellerDetails({
													...sellerDetails,
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
									disabled={!sellerDetails.judicialPerson}
									id="outlined-number-company-name"
									label="Company Name"
									variant="outlined"
									type="text"
									value={sellerDetails.companyName}
									name="companyName"
									onChange={handleInputChange}
									error={
										sellerDetails.judicialPerson &&
										sellerDetails.companyName === ""
									}
									helperText={
										sellerDetails.judicialPerson &&
										sellerDetails.companyName === "" &&
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
									value={sellerDetails.phoneNumber}
									name="phoneNumber"
									onChange={handleInputChange}
									error={sellerDetails.phoneNumber.length < 10}
									helperText={
										sellerDetails.phoneNumber.length < 10 &&
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
									value={sellerDetails.email}
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
									Land for sale:
								</FormLabel>
								<TextField
									className={classes.inputItem}
									style={{ width: "450px" }}
									id="outlined-text-landsOfInterest"
									select
									label="Lands"
									variant="outlined"
									type="text"
									value={sellerDetails.landAreaID}
									name="landAreaID"
									onChange={handleInputChange}
									error={sellerDetails.landAreaID === ""}
									helperText={
										sellerDetails.landAreaID === "" && "land required"
									}
								>
									<MenuItem value={0}>None</MenuItem>
									{landsList &&
										landsList.map(
											(land) =>
												land.sellerID !== null && (
													<MenuItem
														key={land.landAreaID}
														value={land.landAreaID}
													>
														<RoomIocn />
														{land.usedFor +
															" land; area: " +
															land.areaMeasure.toLocaleString() +
															" m^2; price €" +
															land.totalPrice.toLocaleString()}
													</MenuItem>
												)
										)}
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
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											checked={sellerDetails.prefFullPayment}
											onChange={(e) =>
												setSellerDetails({
													...sellerDetails,
													prefFullPayment: e.target.checked,
												})
											}
											name="prefFullPayment"
										/>
									}
									label="Prefers Full Payment"
									style={{ margin: "5px" }}
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											checked={sellerDetails.prefImmediatePayment}
											onChange={(e) =>
												setSellerDetails({
													...sellerDetails,
													prefImmediatePayment: e.target.checked,
												})
											}
											name="prefImmediatePayment"
										/>
									}
									label="Prefers Immediate Payment"
									style={{ margin: "5px" }}
								/>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Bank"
									variant="outlined"
									type="text"
									value={sellerDetails.bank}
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
									Add Seller
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
