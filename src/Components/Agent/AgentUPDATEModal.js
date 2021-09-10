import React from "react";
import {
	makeStyles,
	Modal,
	Fab,
	Grid,
	FormControl,
	Backdrop,
	Fade,
	Container,
	Typography,
	TextField,
	MenuItem,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
		width: "37rem",
		height: "27rem",
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

export default function AgentUPDATEModal(props) {
	const classes = useStyles();
	const {
		openModal,
		setOpenModal,
		userDetails,
		setUserDetails,
		handleInputChange,
		handleSubmit,
		closeModal,
		errors,
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
						style={{ textAlign: "center", paddingTop: "10px" }}
					>
						Agent Info:
					</Typography>
					<hr />
					<FormControl>
						<Grid container>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Full Name"
									variant="outlined"
									type="text"
									required
									value={userDetails.fullName}
									name="fullName"
									onChange={handleInputChange}
									error={errors.fullName !== ""}
									helperText={errors.fullName}
								/>
							</Grid>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="User Name"
									variant="outlined"
									type="text"
									required
									value={userDetails.userName}
									name="userName"
									onChange={handleInputChange}
									error={errors.userName !== ""}
									helperText={errors.userName}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Email"
									variant="outlined"
									type="text"
									required
									value={userDetails.email}
									name="email"
									onChange={handleInputChange}
									error={errors.email !== ""}
									helperText={errors.email}
								/>
							</Grid>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Phone Number"
									variant="outlined"
									type="text"
									required
									value={userDetails.phoneNumber}
									name="phoneNumber"
									onChange={handleInputChange}
									error={errors.phoneNumber !== ""}
									helperText={errors.phoneNumber}
								/>
							</Grid>
						</Grid>

						<TextField
							className={classes.inputItem}
							style={{ width: "250px" }}
							id="outlined-text-bank"
							label="Address"
							variant="outlined"
							type="text"
							required
							value={userDetails.address}
							name="address"
							onChange={handleInputChange}
							error={errors.address !== ""}
							helperText={errors.address}
						/>
						<Grid container>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Company Name"
									variant="outlined"
									type="text"
									required
									value={userDetails.companyName}
									name="companyName"
									onChange={handleInputChange}
									error={errors.companyName !== ""}
									helperText={errors.companyName}
								/>
							</Grid>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									id="outlined-text-bank"
									label="Zone focus"
									variant="outlined"
									type="text"
									required
									select
									value={userDetails.zone}
									name="zone"
									onChange={handleInputChange}
								>
									{Cardinals.map((cardinal, index) => (
										<MenuItem key={index} value={cardinal}>
											{cardinal}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
					</FormControl>
					<hr />
					<Grid container justifyContent="flex-end">
						<Fab
							variant="extended"
							color="primary"
							onClick={handleSubmit}
							style={{ marginRight: "10px" }}
						>
							<EditIcon />
							Modify
						</Fab>
						<Fab
							variant="extended"
							color="primary"
							className={classes.removeIcon}
							onClick={closeModal}
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
