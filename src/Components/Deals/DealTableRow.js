import React, { useState } from "react";
import {
	makeStyles,
	TableCell,
	IconButton,
	Button,
	Typography,
	Collapse,
	TableRow,
	Tooltip,
	Card,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import RoomIcon from "@material-ui/icons/Room";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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

export default function DealTableRow(props) {
	const classes = useStyles();
	const { deal, editDeal, setOpenDelete, setNotify, user } = props;
	const [openRow, setOpenRow] = useState(false);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

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
				<TableCell>
					<RoomIcon />
				</TableCell>
				<TableCell>
					<Typography variant="h6">For: {deal.landType}</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="h6">Zone: {deal.landCardinal}</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="h6">Closed BY: {deal.agentName}</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="h6">
						Commission: €{deal.commission.toFixed(0).toLocaleString()}
					</Typography>
				</TableCell>
				{/* 	<TableCell align="right">
					<Tooltip title="edit">
						<Button onClick={() => editDeal(deal.dealID)}>
							<EditIcon />
						</Button>
					</Tooltip>
				</TableCell> */}
				<TableCell>
					{user.id === deal.agentID ? (
						<Button>
							<DeleteForeverIcon
								onClick={() => setOpenDelete({ isOpen: true, id: deal.dealID })}
							/>
						</Button>
					) : (
						<Button disabled>
							<DeleteForeverIcon />
						</Button>
					)}
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
						<Typography variant="h5" style={{ marginTop: "25px" }}>
							Deal Specifications
						</Typography>
						<hr />

						<TableRow>
							<TableCell>
								<Typography variant="body">Area</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Commission %</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Price per m^2</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Land Seller</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Land Seller Phone</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Land Customer</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Land Customer Phone</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">Date</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Typography variant="body">
									{deal.landArea.toLocaleString()} m^2
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">
									%{deal.commissionPercentage}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">
									€{deal.pricePerSquareMeter}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">{deal.sellerName}</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">
									{formatPhoneNumber(deal.sellerPhoneNumber)}
								</Typography>
							</TableCell>

							<TableCell>
								<Typography variant="body">{deal.customerName}</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body">
									{formatPhoneNumber(deal.customerPhoneNumber)}
								</Typography>
							</TableCell>

							<TableCell>
								<Typography variant="body">{deal.dealDate}</Typography>
							</TableCell>
						</TableRow>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
