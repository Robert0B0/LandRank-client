import React, { useState } from "react";
import {
	makeStyles,
	Grid,
	List,
	Card,
	CardHeader,
	ListItem,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Divider,
	Button,
	Tooltip,
	IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 500,
		height: 220,
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export default function TransferList(props) {
	const {
		customerLands,
		allLands,
		setNotify,
		customerID,
		handleDealsUpdate,
		editLand,
		addToCompare,
	} = props;
	const classes = useStyles();
	const [changed, setChanged] = useState(false);
	const [checked, setChecked] = useState([]);
	const [left, setLeft] = useState(customerLands);
	const [right, setRight] = useState(allLands ? allLands : []);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
		setChanged(true);
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
		setChanged(true);
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						color="primary"
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{ "aria-label": "all items selected" }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<>
							<ListItem key={value} role="listitem">
								<ListItemIcon>
									<Checkbox
										checked={checked.indexOf(value) !== -1}
										onClick={handleToggle(value)}
										tabIndex={-1}
										disableRipple
										inputProps={{ "aria-labelledby": labelId }}
										color="primary"
									/>
								</ListItemIcon>
								<ListItemText
									id={labelId}
									primary={`Land with area of ${value.areaMeasure.toLocaleString()} m^2 and price: €${value.totalPrice.toLocaleString()}`}
								/>
								<Tooltip title="edit land">
									<IconButton onClick={() => editLand(value.landAreaID)}>
										<EditIcon fontSize="small" />
									</IconButton>
								</Tooltip>
								<Tooltip title="add to compare">
									<IconButton onClick={() => addToCompare(value.landAreaID)}>
										<CompareArrowsIcon fontSize="small" />
									</IconButton>
								</Tooltip>
							</ListItem>
						</>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<Grid
			container
			spacing={2}
			justifyContent="center"
			alignItems="stretch"
			className={classes.root}
		>
			<Grid item>{customList("Customer Lands of interest", left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant={changed ? "contained" : "outlined"}
						size={changed ? "large" : "medium"}
						className={classes.button}
						onClick={() => {
							handleDealsUpdate(customerID, left);
							setChanged(false);
						}}
						disabled={!changed}
						aria-label="move selected left"
						color="primary"
					>
						Update
					</Button>
					<Button
						style={{ marginTop: "50px" }}
						variant="contained"
						size="medium"
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
						color="primary"
					>
						&lt; Add
					</Button>
					<Button
						variant="contained"
						size="medium"
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
						color="secondary"
					>
						Remove &gt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList("Filtered Lands by Preferences", right)}</Grid>
		</Grid>
	);
}
