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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
		width: "34rem",
		height: "25rem",
	},
	inputItem: {
		margin: theme.spacing(1),
		width: "100px",
	},
}));

export default function NoteModalCRUD(props) {
	const classes = useStyles();
	const {
		update,
		openModal,
		setOpenModal,
		setOpenDelete,
		noteDetails,
		setNoteDetails,
		handleInputChange,
		handleCreate,
		handleUpdate,
		closeEdit,
		closeCreate,
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
						Note:
					</Typography>
					<hr />
					<FormControl>
						<Grid container>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "250px" }}
									required
									id="outlined-number-name"
									label="Title"
									variant="outlined"
									type="text"
									value={noteDetails.title}
									name="title"
									onChange={handleInputChange}
									error={errors.title !== ""}
									helperText={errors.title}
								/>
							</Grid>
							<Grid>
								<TextField
									className={classes.inputItem}
									style={{ width: "200px" }}
									required
									select
									id="outlined-number-name"
									label="Note for"
									variant="outlined"
									type="text"
									value={noteDetails.for}
									name="for"
									onChange={handleInputChange}
									error={errors.for !== ""}
									helperText={errors.for}
								>
									<MenuItem value={"Myself"}>
										<AccountCircleIcon /> &nbsp;&nbsp;&nbsp; Me
									</MenuItem>
									{/* {agentList.map((agent, index) => (
											<MenuItem key={index} value={agent.name}>
												<AccountCircleIcon />{agent.name}
											</MenuItem>
										))} */}
								</TextField>
							</Grid>
						</Grid>
						<hr />
						<TextField
							className={classes.inputItem}
							style={{ width: "470px" }}
							required
							multiline
							rows={4}
							id="outlined-number-name"
							label="Description"
							variant="outlined"
							type="text"
							value={noteDetails.text}
							name="text"
							onChange={handleInputChange}
							error={errors.text !== ""}
							helperText={errors.text}
						/>
					</FormControl>
					<hr />
					<Grid container justifyContent="flex-end">
						{!update ? (
							<>
								<Fab variant="extended" color="primary" onClick={handleCreate}>
									<AddIcon />
									Add Note
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
