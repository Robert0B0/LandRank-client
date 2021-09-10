import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	makeStyles,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import Notification from "../Components/Notification";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				LandRank
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function RegisterPage() {
	const classes = useStyles();
	const history = useHistory();
	const [errors, setErrors] = useState({
		userName: "",
		fullName: "",
		phoneNumber: "",
		email: "",
		password: "",
		companyName: "",
		address: "",
	});
	const [notify, setNotify] = useState({ isOpen: false });
	const [user, setUser] = useState({
		userName: "",
		fullName: "",
		companyName: "LandRank",
		address: "",
		phoneNumber: "",
		email: "",
		password: "",
	});

	const validateRegister = () => {
		let temp = {};
		temp.userName = user.userName !== "" ? "" : "User Name is required";
		temp.fullName = user.fullName !== "" ? "" : "Full Name is required";
		temp.companyName =
			user.companyName !== "" ? "" : "Company Name is required";
		temp.address = user.address !== "" ? "" : "Address is required";
		temp.email = user.email !== "" ? "" : "Email is required";
		temp.phoneNumber =
			user.phoneNumber !== "" ? "" : "Phone Number is required";
		temp.password = user.password !== "" ? "" : "Password is required";
		setErrors({ ...temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateRegister()) {
			createAPIEndpoint(ENDPOINTS.REGISTER)
				.register(user)
				.then((res) => {
					//console.log(res.data);
					if (res.data.succeeded) {
						setNotify({
							isOpen: true,
							message: "Agent Created! Welcome to LandRank",
						});
						history.push("/login");
					} else {
						setNotify({
							isOpen: true,
							message: res.data.errors[0].description,
						});
					}
				})
				.catch((err) => console.log(err));
			//history.push("/login")
			console.log(JSON.stringify(user));
		} else {
			console.log("Not a valid registration");
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fullName"
								name="fullName"
								variant="outlined"
								required
								fullWidth
								id="fullName"
								label="Full Name"
								autoFocus
								value={user.fullName}
								onChange={(e) => handleInputChange(e)}
								error={errors.fullName !== ""}
								helperText={errors.fullName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="UserName"
								label="UserName"
								name="userName"
								value={user.userName}
								onChange={(e) => handleInputChange(e)}
								error={errors.userName !== ""}
								helperText={errors.userName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="companyName"
								name="companyName"
								variant="outlined"
								required
								fullWidth
								id="companyName"
								label="company Name"
								autoFocus
								value={user.companyName}
								onChange={(e) => handleInputChange(e)}
								error={errors.companyName !== ""}
								helperText={errors.companyName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="Address"
								label="Address"
								name="address"
								value={user.address}
								onChange={(e) => handleInputChange(e)}
								error={errors.address !== ""}
								helperText={errors.address}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="phoneNumber"
								variant="outlined"
								required
								fullWidth
								id="phoneNumber"
								label="phone Number"
								autoFocus
								value={user.phoneNumber}
								onChange={(e) => handleInputChange(e)}
								error={errors.phoneNumber !== ""}
								helperText={errors.phoneNumber}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								value={user.email}
								onChange={(e) => handleInputChange(e)}
								error={errors.email !== ""}
								helperText={errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={user.password}
								onChange={(e) => handleInputChange(e)}
								error={errors.password !== ""}
								helperText={errors.password}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button
								variant="contained"
								onClick={() => history.push("/login")}
							>
								Already have an account? Log in
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
			<Notification {...{ notify, setNotify }} />
		</Container>
	);
}
