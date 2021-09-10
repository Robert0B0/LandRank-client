import React, { useState, useEffect, useContext } from "react";
import {
	Container,
	Grid,
	Card,
	Typography,
	Fab,
	makeStyles,
	Paper,
} from "@material-ui/core";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import { AuthContext } from "../context/auth";
import SingleNote from "../Components/Note/SingleNote";

import LinearProgress from "@material-ui/core/LinearProgress";
import AddIcon from "@material-ui/icons/Add";
import Notification from "../Components/Notification";
import NoteModalCRUD from "../Components/Note/NoteModalCRUD";
import NoteDeleteModal from "../Components/Note/NoteDeleteModal";
import { useHistory } from "react-router-dom";

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
		width: "40rem",
		height: "35rem",
	},
	inputItem: {
		margin: theme.spacing(1),
		width: 200,
	},
	tableContainer: {
		maxHeight: 500,
	},
}));

export default function Notes() {
	const classes = useStyles();
	const { user } = useContext(AuthContext);
	const history = useHistory();

	const [openModal, setOpenModal] = useState(false);
	const [openDelete, setOpenDelete] = useState({ open: false, id: "" });
	const [update, setUpdate] = useState(false);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState({
		for: "",
		title: "",
		text: "",
	});

	const [notify, setNotify] = useState({ isOpen: false });
	const [noteDetails, setNoteDetails] = useState({
		agentID: user ? user.id : "",
		agentName: user ? user.userName : "",
		for: "",
		title: "",
		text: "",
	});
	const [noteList, setNoteList] = useState([]);
	const [agentList, setAgentList] = useState([]);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.NOTE)
			.fetchAll()
			.then((res) => setNoteList(res.data))
			.finally(setLoading(false))
			.catch((err) => console.log(err));
	}, [noteList, notify]);

	/* useEffect(() => {
		createAPIEndpoint(ENDPOINTS.AGENT)
			.fetchAll()
			.then((res) => setAgentList(res.data))
			.catch((err) => console.log(err));
	}, []); */

	const validateNote = () => {
		let temp = {};
		temp.for = noteDetails.for === "" ? "Note for required" : "";
		temp.title = noteDetails.title === "" ? "Note title required" : "";
		temp.text = noteDetails.text === "" ? "Note details required" : "";
		setErrors({ temp });
		return Object.values(temp).every((x) => x === "");
	};

	const createNote = () => {
		setNoteDetails({
			...noteDetails,
			agentID: user.id,
			agentName: user.userName,
		});
		setOpenModal(true);
		setNotify({ isOpen: true, message: "Creating Note" });
	};

	const handleCreate = () => {
		if (validateNote()) {
			createAPIEndpoint(ENDPOINTS.NOTE)
				.create(noteDetails)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
			setOpenModal(false);
			setNotify({ isOpen: true, message: "Note created" });
		} else {
			setNotify({ isOpen: true, message: "Submit Error" });
			console.log("Not a valid submit");
		}
		console.log(JSON.stringify(noteDetails));
	};

	const handleDelete = (id) => {
		console.log(openDelete.id, id);
		createAPIEndpoint(ENDPOINTS.NOTE)
			.delete(id)
			.catch((err) => console.log(err));
		setOpenDelete({ open: false, id: "" });
		resetNote();
		setNotify({ isOpen: true, message: "Note Removed" });
	};

	const closeCreate = () => {
		setOpenModal(false);
		setNotify({ isOpen: true, message: "Note Info Stored Temporarily" });
	};

	const resetNote = () => {
		setNoteDetails({
			agentID: user.id,
			agentName: user.userName,
			for: "",
			title: "",
			text: "",
		});
	};

	const handleInputChange = (e) => {
		const { value, name } = e.target;
		setNoteDetails({ ...noteDetails, [name]: value });
	};

	return (
		<>
			<Container>
				{loading ? (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Loading Notes</Typography>
							</Grid>
						</Grid>
						<LinearProgress />
					</>
				) : (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Notes</Typography>
							</Grid>
							<Grid xs={6}>
								<Fab
									variant="extended"
									color="primary"
									onClick={user ? createNote : () => history.push("/login")}
								>
									<AddIcon />
									Write a Note
								</Fab>
							</Grid>
						</Grid>
						<hr />
					</>
				)}
				<Container>
					{!loading && (
						<Grid container>
							{noteList.map((note) => (
								<Grid item xs={12} sm={6} md={3} key={note.NoteID}>
									<SingleNote note={note} setOpenDelete={setOpenDelete} />
								</Grid>
							))}
						</Grid>
					)}
				</Container>
			</Container>
			<NoteModalCRUD
				{...{
					openModal,
					setOpenModal,
					closeCreate,
					errors,
					handleInputChange,
					handleCreate,
					closeCreate,
					noteDetails,
				}}
			/>
			<NoteDeleteModal
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				handleDelete={handleDelete}
			/>
			<Notification {...{ notify, setNotify }} />
		</>
	);
}
