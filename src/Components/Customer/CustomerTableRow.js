import React, { useState } from "react";
import {
	makeStyles,
	TableCell,
	IconButton,
	Button,
	Grid,
	Typography,
	Collapse,
	Table,
	TableRow,
	Tooltip,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import TransferList from "../TransferList";

const useStyles = makeStyles((theme) => ({
	table: {
		overflow: "scroll",
		maxHeight: 440,
	},
	tableRow: {
		cursor: "pointer",
	},
	tableRowHover: {
		"&:hover": {
			backgroundColor: theme.palette.grey[200],
		},
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

export default function CustomerTableRow(props) {
	const classes = useStyles();
	const {
		customer,
		editCustomer,
		handleDelete,
		editLand,
		addToCompare,
		setNotify,
		lands,
		handleDealsUpdate,
		user,
	} = props;
	const [openRow, setOpenRow] = useState(false);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	let customerLands = [];
	if (customer.potentialDeal) {
		for (let i = 0; i < customer.potentialDeal.length; i++) {
			customerLands[i] = customer.potentialDeal[i].landArea;
		}
	}

	let filteredLands = [{}];
	let k = 0;
	for (let i = 0; i < lands.length; i++) {
		let present = false;
		for (let j = 0; j < customerLands.length; j++) {
			if (customerLands[j] !== undefined) {
				if (customerLands[j].landAreaID === lands[i].landAreaID) {
					present = true;
				}
			}
		}
		if (!present) filteredLands[k++] = lands[i];
	}

	let allLands = filteredLands.filter(
		(l) =>
			l.totalPrice <= customer.budget + (customer.budget * 25) / 100 &&
			l.totalPrice >= customer.budget - (customer.budget * 40) / 100
	);
	allLands.sort((a, b) =>
		a.totalPrice > b.totalPrice ? 1 : a.totalPrice < b.totalPrice ? -1 : 0
	);

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpenRow(!openRow)}
					>
						{!openRow ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{customer.judicialPerson ? <BusinessIcon /> : <AccountCircleIcon />}
				</TableCell>
				<TableCell component="th" scope="row">
					<Typography variant="h6">{customer.name}</Typography>
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
								{formatPhoneNumber(customer.phoneNumber)}
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
							<Typography variant="h6">{customer.email}</Typography>
						</Button>
					</Tooltip>
				</TableCell>
				<TableCell align="right">
					{user.id === customer.agentID ? (
						<Tooltip title="edit">
							<Button onClick={() => editCustomer(customer.customerID)}>
								<EditIcon />
							</Button>
						</Tooltip>
					) : (
						<Button disabled>
							<EditIcon />
						</Button>
					)}
					<Button>
						{/* <DeleteIcon
							onClick={() => handleDeleteAsk(customer.customerId, customer.name)}
						/> */}
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse
						in={openRow}
						timeout="auto"
						unmountOnExit
						style={{ marginBottom: "10px" }}
					>
						<Typography style={{ marginTop: "25px" }} variant="h5">
							Budget: € {customer.budget.toLocaleString()}
						</Typography>
						<Typography variant="h5">
							Preferences: {customer.preferences}
						</Typography>
						<hr />
						<Typography
							style={{ marginTop: "25px", marginBottom: "10px" }}
							variant="h5"
						>
							Lands of interest:
						</Typography>
						<TransferList
							customerID={customer.customerID}
							{...{
								customerLands,
								allLands,
								setNotify,
								handleDealsUpdate,
								editLand,
								addToCompare,
							}}
						/>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
