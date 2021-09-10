import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Container,
	Grid,
	Fab,
	makeStyles,
	Table,
	TableContainer,
	TableBody,
	TextField,
	MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { createAPIEndpoint, ENDPOINTS } from "../api/index";
import { AuthContext } from "../context/auth";

import DealDeleteModal from "../Components/Deals/DealDeleteModal";
import DealTableRow from "../Components/Deals/DealTableRow";
import Notification from "../Components/Notification";
import LinearProgress from "@material-ui/core/LinearProgress";

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

export default function Sellers() {
	const classes = useStyles();
	const { user } = useContext(AuthContext);

	const [openModal, setOpenModal] = useState(false);
	const [openDelete, setOpenDelete] = useState({ isOpen: false, id: "" });
	const [loading, setLoading] = useState(true);
	const [notify, setNotify] = useState({ isOpen: false });
	const [sort, setSort] = useState("Name Commission");
	const [dealsList, setDealsList] = useState([]);
	const [deal, setDeal] = useState({});

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.DEAL)
			.fetchAll()
			.then((res) => {
				let deals = res.data;
				switch (sort) {
					case "Commission Ascending":
						deals.sort((a, b) =>
							a.commission[0] > b.commission[0]
								? 1
								: a.commission[0] < b.commission[0]
								? -1
								: 0
						);
						break;
					case "Commission Descending":
						deals.sort((a, b) =>
							a.commission[0] < b.commission[0]
								? 1
								: a.commission[0] > b.commission[0]
								? -1
								: 0
						);
						break;
				}
				setDealsList(deals);
			})
			.finally(setLoading(false))
			.catch((err) => console.log(err));
	}, [notify]);

	/* 	const handleUpdate = () => {
		console.log(sellerDetails);
		if (validateSubmit()) {
			createAPIEndpoint(ENDPOINTS.SELLER)
				.update(sellerDetails.sellerID, sellerDetails)
				.then((res) => {
					setNotify({ isOpen: true, message: "Seller Modified" });
				})
				.catch((err) => {
					console.log(err);
					setNotify({ isOpen: true, message: "Seller Data not Valid" });
				});
			console.log(sellerDetails);
			setOpenModal(false);
			resetSeller();
		} else {
			console.log("Not a valid submit");
		}
	}; */

	const editDeal = (id) => {};

	const handleDeleteDeal = (id) => {
		createAPIEndpoint(ENDPOINTS.DEAL)
			.delete(id)
			.catch((err) => console.log(err));
		setOpenDelete(false);

		setNotify({ isOpen: true, message: "Deal Removed" });
	};

	const handleSort = (by) => {
		setSort(by);
		setNotify({ isOpen: true, message: "sorted by " + by });
	};

	return (
		<>
			<Container>
				{loading ? (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Loading Closed Deals...</Typography>
							</Grid>
						</Grid>
						<LinearProgress />
					</>
				) : (
					<>
						<Grid container>
							<Grid xs={6}>
								<Typography variant="h4">Closed Deals</Typography>
							</Grid>
							<Grid xs={6}>
								<TextField
									select
									style={{ width: "250px", marginRight: "25px" }}
									value={sort}
									label="Sort Lands By :"
									variant="outlined"
									onClick={(e) => handleSort(e.target.value)}
								>
									<MenuItem value={"Commission Ascending"}>
										<ArrowUpwardIcon />
										&nbsp; Commission Ascending
									</MenuItem>
									<MenuItem value={"Commission Descending"}>
										<ArrowDownwardIcon />
										&nbsp; Commission Descending
									</MenuItem>
								</TextField>
							</Grid>
						</Grid>
						<hr />
					</>
				)}
				{!loading ? (
					<TableContainer className={classes.tableContainer}>
						<Table className={classes.table}>
							<TableBody>
								{dealsList.map((deal) => (
									<DealTableRow
										key={deal.name}
										{...{ deal, editDeal, setOpenDelete, setNotify, user }}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : dealsList.length <= 0 ? (
					<Typography variant="h4">No Deals Present.</Typography>
				) : (
					<Typography variant="h4">Loading Deals List.</Typography>
				)}
			</Container>
			<DealDeleteModal
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				handleDeleteDeal={handleDeleteDeal}
			/>
			<Notification {...{ notify, setNotify }} />
		</>
	);
}
