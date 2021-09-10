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
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Rating from "@material-ui/lab/Rating";

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

export default function SellerTableRow(props) {
	const classes = useStyles();
	const {
		seller,
		editSeller,
		handleDelete,
		setNotify,
		lands,
		addToCompare,
		editLand,
		user,
	} = props;
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
				<TableCell component="th" scope="row">
					{seller.judicialPerson ? <BusinessIcon /> : <AccountCircleIcon />}
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
				<TableCell align="right">
					{user.id === seller.agentID ? (
						<Tooltip title="edit">
							<Button onClick={() => editSeller(seller.sellerID)}>
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
							onClick={() => handleDeleteAsk(seller.sellerId, seller.name)}
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
						<Typography variant="h5" style={{ marginTop: "25px" }}>
							Land for sale:
						</Typography>
						<hr />
						{seller.landAreaID !== 0 ? (
							<>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>
										<Typography variant="h6">Land Area</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">Total Price</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">Price per square meter</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">Relative Cardinal</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">Grade</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant="h6">Edit Land</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant="h6">Compare</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<RoomIcon />
									</TableCell>
									<TableCell>
										<Typography variant="h6">
											{seller.landForSale[0].areaMeasure.toLocaleString()} m^2{" "}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">
											€{seller.landForSale[0].totalPrice.toLocaleString()}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">
											€{seller.landForSale[0].pricePerSquareMeter} per m^2
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6">
											{seller.landForSale[0].cardinal}
										</Typography>
									</TableCell>
									<TableCell>
										<Rating
											readOnly
											size="small"
											name="rateStars"
											value={seller.landForSale[0].rateStars}
										/>
									</TableCell>
									<TableCell align="right">
										<Tooltip title="edit">
											<Button
												onClick={() =>
													editLand(seller.landForSale[0].landAreaID)
												}
											>
												<EditIcon />
											</Button>
										</Tooltip>
									</TableCell>
									<TableCell align="right">
										<Tooltip title="add to comparison">
											<Button
												onClick={() =>
													addToCompare(seller.landForSale[0].landAreaID)
												}
											>
												<CompareArrowsIcon />
											</Button>
										</Tooltip>
									</TableCell>
								</TableRow>
							</>
						) : (
							<Typography variant="h6">
								A land need's to be assigned to {seller.name}
							</Typography>
						)}
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
