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
	TableBody,
	Card,
	CardContent,
	CardHeader,
} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Rating from "@material-ui/lab/Rating";
import InfoIcon from "@material-ui/icons/Info";
import { FaHandshake } from "react-icons/fa";

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

const displayAttributer = (land) => {
	return (
		<>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.inTown && "✓ In Town"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.agriculturaLand && " ⚠ Agriculture Land"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.pavedRoads && "✓ Paved Roads"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.needsDemolition && " ⚠ Needing Demolition Services"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.denivelated && " ⚠ Denivelated Ground"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.electricity && "✓ Electricity wired"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.water && "✓ Water pipe linked"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.sewage && "✓ Sewage pipe linked"}
			</Typography>
			<Typography variant="body1" color="textSecondary" component="p">
				{land.internet && "✓ Internet connectivity"}
			</Typography>
		</>
	);
};

export default function LandTableRow(props) {
	const classes = useStyles();
	const { land, setNotify, editLand, addToCompare, user, DealOpenModal } =
		props;
	const [openRow, setOpenRow] = useState(false);

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
					<Typography variant="h6">
						{land.areaMeasure.toLocaleString()} m^2{" "}
					</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="h6">
						€{land.totalPrice.toLocaleString()}
					</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="h6">
						€{land.pricePerSquareMeter} per m^2
					</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="h6">{land.cardinal}</Typography>
				</TableCell>
				<TableCell>
					<Rating
						readOnly
						size="medium"
						name="rateStars"
						value={land.rateStars}
					/>
				</TableCell>
				<TableCell align="right">
					{user.user.id === land.agentID ? (
						<Tooltip title="edit/view in map">
							<Button onClick={() => editLand(land.landAreaID)}>
								<EditIcon />
							</Button>
						</Tooltip>
					) : (
						<Button disabled>
							<EditIcon />
						</Button>
					)}
				</TableCell>
				<TableCell align="right">
					<Tooltip title="add to comparison">
						<Button onClick={() => addToCompare(land.landAreaID)}>
							<CompareArrowsIcon />
						</Button>
					</Tooltip>
				</TableCell>
				<TableCell align="right">
					{user.user.id === land.agentID ? (
						<Tooltip title="Close Deal">
							<Button onClick={() => DealOpenModal(land.landAreaID)}>
								<FaHandshake size={30} />
							</Button>
						</Tooltip>
					) : (
						<Button disabled>
							<FaHandshake size={30} />
						</Button>
					)}
				</TableCell>
			</TableRow>
			<TableRow style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
					<Collapse
						in={openRow}
						timeout="auto"
						unmountOnExit
						style={{ marginBottom: "10px" }}
					>
						<Typography variant="h4" style={{ marginBottom: "20px" }}>
							Details:
						</Typography>
						<Grid container spacing={4}>
							<Grid item>
								<Card style={{ width: "400px", height: "300" }}>
									<Card>
										<CardHeader
											align="center"
											title="Attributes:"
											subheader={"Added by " + land.agentName}
										></CardHeader>
										<CardContent>
											<Typography variant="h6">
												Area Specific usage: <u>{land.usedFor}</u>
											</Typography>
											<Typography variant="h6">
												Address: <u>{land.address}</u>
											</Typography>
											<Typography variant="h6">
												Rate:{" "}
												<Rating
													readOnly
													size="small"
													name="rateStars"
													value={land.rateStars}
												/>
											</Typography>

											{displayAttributer(land)}
										</CardContent>
									</Card>
								</Card>
							</Grid>
							<Grid item>
								<Card style={{ width: "350px", height: "300" }}>
									<Typography
										variant="h5"
										align="center"
										style={{ marginTop: "20px" }}
									>
										Potential Clients:
									</Typography>
									{land.potentialDeal.length === 0 && (
										<Typography
											variant="h5"
											align="center"
											style={{ marginTop: "20px" }}
										>
											No Potential Customers
										</Typography>
									)}
									{land.potentialDeal.length !== 0 &&
										land.potentialDeal.map((deal) => (
											<Typography
												variant="h5"
												align="center"
												style={{ marginTop: "20px", marginBottom: "20px" }}
											>
												{deal.customer.judicialPerson ? (
													<BusinessIcon />
												) : (
													<AccountCircleIcon />
												)}
												&nbsp; {deal.customer.name}
											</Typography>
										))}
								</Card>
							</Grid>
							<Grid item>
								<Card style={{ width: "250px", height: "200px" }}>
									<Typography
										variant="h5"
										align="center"
										style={{ marginTop: "20px" }}
									>
										Land Seller:
									</Typography>
									{land.seller !== null ? (
										<Typography
											variant="h5"
											align="center"
											style={{ marginTop: "20px" }}
										>
											{land.seller.judicialPerson ? (
												<BusinessIcon />
											) : (
												<AccountCircleIcon />
											)}
											&nbsp; {land.seller.name}
										</Typography>
									) : (
										<Typography
											variant="h5"
											align="center"
											style={{ marginTop: "20px" }}
										>
											Not Assigned yet
										</Typography>
									)}
								</Card>
							</Grid>
						</Grid>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

{
	/* <Card>
<Typography variant="h5">Details</Typography>
<Typography variant="h6">
	<u>Area Specific usage:</u> {land.usedFor}
</Typography>
<Typography variant="h6">
	<u>Address:</u> {land.address}
</Typography>
<Typography variant="h6">
	<u>Attributes:</u>
</Typography>
{displayAttributer(land)}
</Card>

<Card>
<Typography variant="h5">Interested Clients</Typography>
</Card>

<Card>
<Typography variant="h5">Land Area Seller</Typography>
</Card> */
}
