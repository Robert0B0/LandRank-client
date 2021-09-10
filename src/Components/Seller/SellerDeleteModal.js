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
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
		width: "25rem",
		height: "15rem",
	},
}));

export default function SellerDeleteModal(props) {
	const { openDelete, setOpenDelete, name, handleDelete } = props;

	const classes = useStyles();
	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 100,
				}}
			>
				<Fade in={openDelete}>
					<Container className={classes.containerModal}>
						<Typography
							variant="h5"
							style={{ textAlign: "center", paddingTop: "30px" }}
						>
							Are you Sure you want to remove <u>{name}</u> permanently?
						</Typography>
						<hr />
						<Grid container justifyContent="flex-end">
							<>
								<Fab
									variant="extended"
									color="secondary"
									onClick={handleDelete}
									style={{ marginRight: "10px" }}
								>
									<DeleteForeverIcon />
									Remove Seller
								</Fab>
								<Fab
									variant="extended"
									color="primary"
									className={classes.removeIcon}
									onClick={() => setOpenDelete(false)}
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
