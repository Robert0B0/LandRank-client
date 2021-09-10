import React from "react";
import {
	makeStyles,
	Modal,
	Container,
	Fab,
	Fade,
	Grid,
	Backdrop,
	Typography,
	TableCell,
	Button,
	Tooltip,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
		width: "55rem",
		height: "10rem",
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

export default function SellerInfo(props) {
	const { openSellerInfo, setOpenSellerInfo, setNotify, seller } = props;

	const classes = useStyles();
	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openSellerInfo}
				onClose={() => setOpenSellerInfo(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 100,
				}}
			>
				<Fade in={openSellerInfo}>
					<Container className={classes.containerModal}>
						{seller && (
							<>
								{" "}
								<TableCell component="th" scope="row">
									{seller.judicialPerson ? (
										<BusinessIcon />
									) : (
										<AccountCircleIcon />
									)}
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography variant="h6">{seller.name}</Typography>
								</TableCell>
								<TableCell align="right">
									<Tooltip title="copy Number">
										<Button
											onClick={() =>
												setNotify({
													isOpen: true,
													message: "Number Copied to clipboard",
												})
											}
										>
											<Typography variant="h6">
												{formatPhoneNumber(seller.phoneNumber)}
											</Typography>
										</Button>
									</Tooltip>
								</TableCell>
								<TableCell align="right">
									<Tooltip title="copy Email">
										<Button
											onClick={() =>
												setNotify({
													isOpen: true,
													message: "Email Copied to clipboard",
												})
											}
										>
											<Typography variant="h6">{seller.email}</Typography>
										</Button>
									</Tooltip>
								</TableCell>
							</>
						)}

						<hr />
						<Grid container justifyContent="flex-end">
							<Fab
								variant="extended"
								color="primary"
								className={classes.removeIcon}
								onClick={() => setOpenSellerInfo(false)}
							>
								<ArrowBackIcon />
								Back
							</Fab>
						</Grid>
					</Container>
				</Fade>
			</Modal>
		</>
	);
}
