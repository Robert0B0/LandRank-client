import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
	root: {
		top: theme.spacing(9),
		"& .MuiAlert-root": {
			backgroundColor: "#3f50b5",
			color: "white",
		},
		"& .MuiAlert-icon": {
			color: "#000",
		},
	},
}));

export default function Notification(props) {
	const { notify, setNotify } = props;
	const classes = useStyles();

	const handleClose = (event, reason) => {
		if (reason == "clickaway") {
			return;
		}
		setNotify({
			...notify,
			isOpen: false,
		});
	};

	return (
		<Snackbar
			autoHideDuration={2000}
			className={classes.root}
			open={notify.isOpen}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			onClose={handleClose}
		>
			<Alert severity="info" onClose={handleClose}>
				{notify.message}
			</Alert>
		</Snackbar>
	);
}
