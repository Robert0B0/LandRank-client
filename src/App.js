import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MapHome from "./Pages/MapHome";
import AgentPage from "./Pages/Agent_Settings";
import Customers from "./Pages/Customers";
import Sellers from "./Pages/Sellers";
import Lands from "./Pages/Lands";
import Compare from "./Pages/LandCompare";
import Notes from "./Pages/Notes";
import Deals from "./Pages/Deals";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { AuthProvider } from "./context/auth";
import { SpecificLand } from "./context/SpecificLand";
import { LandCompare } from "./context/compare";
import Layout from "./Components/Layout";
import { AuthContext } from "../src/context/auth";

import "./App.css";

function App() {
	const { user } = useContext(AuthContext);

	return (
		<AuthProvider>
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={MapHome} />
						<Route exact path="/agentpage" component={AgentPage} />
						<Route exact path="/customers" component={Customers} />
						<Route exact path="/sellers" component={Sellers} />
						<Route exact path="/lands" component={Lands} />
						<Route exact path="/compare" component={Compare} />
						<Route exact path="/notes" component={Notes} />
						<Route exact path="/deals" component={Deals} />
						<Route exact path="/about" component={AboutPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/register" component={RegisterPage} />
					</Switch>
				</Layout>
			</Router>
		</AuthProvider>
	);
}

export default App;
