import React from "react";
import {
	withStyles,
	Grid,
	Typography,
	Card,
	CardContent,
	CardHeader,
	Avatar,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Link from "@material-ui/core/Link";
import InfoIcon from "@material-ui/icons/Info";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GitHubIcon from "@material-ui/icons/GitHub";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import backend from "../img/BackEnd.png";
import azure from "../img/Azure-Logo.png";
import frontend from "../img/FrontEnd.jpg";
import mui from "../img/MUI.png";
import netlify from "../img/Netlify.png";
import maps from "../img/mapsApi.png";
import opencage from "../img/OpenCage.png";
import sql from "../img/SQL Server.png";
import asp from "../img/ASPNET.png";
import aspcore from "../img/net-logo.png";
import database from "../img/database.png";
import diagram from "../img/SQL SCHEMA.png";
import react from "../img/react.png";

const Accordion = withStyles({
	root: {
		border: "1px solid rgba(0, 0, 0, .125)",
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0,
		},
		"&:before": {
			display: "none",
		},
		"&$expanded": {
			margin: "auto",
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		backgroundColor: "rgba(0, 0, 0, .03)",
		borderBottom: "1px solid rgba(0, 0, 0, .125)",
		marginBottom: -1,
		minHeight: 56,
		"&$expanded": {
			minHeight: 56,
		},
	},
	content: {
		"&$expanded": {
			margin: "12px 0",
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

export default function AboutPage() {
	const [expanded, setExpanded] = React.useState("panel1");

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const preventDefault = (event) => event.preventDefault();

	return (
		<>
			<Typography variant="h5">About LandRank</Typography>
			<hr />
			<Card
				style={{ maxWidth: "900px", marginTop: "25px", marginBottom: "25px" }}
			>
				<CardContent>
					<Typography
						variant="h6"
						component="p"
						style={{ marginBottom: "20px", marginTop: "20px" }}
					>
						<InfoIcon
							style={{ marginRight: "10px" }}
							color="primary"
							fontSize="large"
						/>
						App Description: Imagine you're a real estate agent, specialized on
						finding land areas from sellers intended for sale to future
						customers on which they will build whatever they need to. This is a
						web application tool for mapping, storing and comparing different
						areas on the map with the necessary data to present to a potential
						customer.
					</Typography>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
								!
							</Avatar>
						}
						title="Disclaimer"
						subheader="All area locations, owners, customers and agents are fictional for
						demonstrative purposes."
					/>
				</CardContent>
			</Card>

			<Typography variant="h4">
				LandEstateStore web app technical into:
			</Typography>
			<Card style={{ maxWidth: "1200px" }}>
				<Accordion
					expanded={expanded === "panel1"}
					onChange={handleChange("panel1")}
					style={{
						marginTop: "20px",
						marginLeft: "10px",
						marginBottom: "10px",
					}}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">FrontEnd</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							side of application
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={frontend}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									Client-side rendering part of the application, with which the
									users, or real estate agents in this situation, interacts with
									the app's functionalities inside the web browser of choice.
								</Typography>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "30px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel2"}
					onChange={handleChange("panel2")}
				>
					<AccordionSummary
						aria-controls="panel2d-content"
						id="panel2d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">Hosting</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							Netlify
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={netlify}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									This web app, more specifically, the front-end side of it is
									deployed and hosted with the services provided by Netlify.
								</Typography>
								<Link
									variant="h6"
									href="https://www.netlify.com/"
									onClick={preventDefault}
								>
									Check Netlify here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "60px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel3"}
					onChange={handleChange("panel3")}
				>
					<AccordionSummary
						aria-controls="panel3d-content"
						id="panel3d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">FrameWork</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							React JS
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={react}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									The front end is built with React javaScript framework. All
									the interface elements are designed with React components and
									functionalities are written in javaScript.
								</Typography>
								<Link
									variant="h6"
									href="https://reactjs.org/"
									onClick={preventDefault}
								>
									Check ReactJs here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "90px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel4"}
					onChange={handleChange("panel4")}
				>
					<AccordionSummary
						aria-controls="panel4d-content"
						id="panel4d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">UI</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							Material-UI
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={mui}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									The interface theme is designed with the help of Material-UI
									component library for React which is made for writing stylized
									and fast React components that get the job done.
								</Typography>
								<Link
									variant="h6"
									href="https://material-ui.com/"
									onClick={preventDefault}
								>
									Check Material-UI here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "90px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel5"}
					onChange={handleChange("panel5")}
				>
					<AccordionSummary
						aria-controls="panel5d-content"
						id="panel5d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">Primary API</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							Google Maps API
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={maps}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									The core functinality of this web app is the integrated Google
									Maps API, mainly used for rendering the top view map,
									functionalities for drawing and placing polygons on the map
									and retrieve coordinates from set markers.
								</Typography>
								<Link
									variant="h6"
									href="https://cloud.google.com/maps-platform"
									onClick={preventDefault}
								>
									Check Google maps platform here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "90px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel6"}
					onChange={handleChange("panel6")}
				>
					<AccordionSummary
						aria-controls="panel6d-content"
						id="panel6d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">Complementary API</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							OpenCage API
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={opencage}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									The OpenCage API is used as a complementary API for retrieving
									location information from a set marker via reverse geocoding
									of coordinates to addresses.
								</Typography>
								<Link
									variant="h6"
									href="https://opencagedata.com/api"
									onClick={preventDefault}
								>
									Check OpenCage API here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "10px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel7"}
					onChange={handleChange("panel7")}
				>
					<AccordionSummary
						aria-controls="panel7d-content"
						id="panel7d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">BackEnd</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							side of application
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={backend}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									Back-end server side of the application with its main job to
									send and retrieve requests from the front-end client, verify
									their validity, give authorizations and do database queries,
									modifications, filtering and removal.
								</Typography>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "30px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel8"}
					onChange={handleChange("panel8")}
				>
					<AccordionSummary
						aria-controls="panel8d-content"
						id="panel8d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">Hosting</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							Microsoft Asure
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={azure}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									The Back-end server side and database is hosted online using
									Microsoft Azure Cloud Computing Services, website hosting
									service.
								</Typography>
								<Link
									variant="h6"
									href="https://azure.microsoft.com/en-us/"
									onClick={preventDefault}
								>
									Check Azure here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "60px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel9"}
					onChange={handleChange("panel9")}
				>
					<AccordionSummary
						aria-controls="panel9d-content"
						id="panel9d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">FrameWork</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							ASP.NET CORE MVC Web Api
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={aspcore}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
										marginLeft: "30px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									The backend web api is built with ASP.NET platform which is a
									developer platform made up of tools, programming languages,
									and libraries for building many different types of
									applications.
								</Typography>
								<Link
									variant="h6"
									href="https://dotnet.microsoft.com/apps/aspnet"
									onClick={preventDefault}
								>
									Check ASP.NET here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>

				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "90px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel10"}
					onChange={handleChange("panel10")}
				>
					<AccordionSummary
						aria-controls="panel10d-content"
						id="panel10d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">Model Handling</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							Entity Framerwork Core
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid xs={3}>
								<img
									src={asp}
									alt=""
									style={{
										height: "80px",
										marginRight: "10px",
									}}
								/>
							</Grid>
							<Grid xs={5}>
								<Typography variant="h6">
									Entity Framework (EF) Core is a lightweight, extensible, open
									source and cross-platform version of the popular Entity
									Framework data access technology that enables working with a
									database using .NET objects.
								</Typography>
								<Link
									variant="h6"
									href="https://docs.microsoft.com/en-us/ef/core/"
									onClick={preventDefault}
								>
									Check EF here.
								</Link>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion
					style={{
						marginTop: "20px",
						marginLeft: "10px",
						marginBottom: "10px",
					}}
					expanded={expanded === "panel11"}
					onChange={handleChange("panel11")}
				>
					<AccordionSummary
						aria-controls="panel11d-content"
						id="panel11d-header"
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="h5">Database Diagram</Typography>
						<Typography variant="h6" style={{ marginLeft: "20px" }}>
							Microsoft SQL Server Database
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<img
							src={database}
							alt=""
							style={{
								height: "80px",
								marginRight: "10px",
							}}
						/>
						{/* <h1 style={{ display: "inline-block" }}>Database Diagram </h1> */}
						<img src={diagram} alt="" width="1100px" />
					</AccordionDetails>
				</Accordion>
			</Card>
			<Typography
				variant="h4"
				style={{ marginTop: "20px", marginLeft: "50px", marginBottom: "20px" }}
			>
				For more projects visit my portfolio:{" "}
				<Link
					href="https://portfolio-robert.netlify.app/"
					onClick={preventDefault}
				>
					<Typography variant="h4" style={{ marginLeft: "200px" }}>
						<ContactMailIcon size="large" />
						Portfolio
					</Typography>
				</Link>
			</Typography>
		</>
	);
}
