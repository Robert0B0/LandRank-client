import axios from "axios";

const BASE_URL = "http://localhost:41104/api/";

export const ENDPOINTS = {
	REGISTER: "AgentUser/Register",
	LOGIN: "AgentUser/Login",
	USERUPDATE: "AgentUser/Put",
	AUTH: "AgentUserProfile",

	LANDAREA: "LandAreas",
	CUSTOMER: "Customers",
	DEAL: "Deals",
	SELLER: "Sellers",
	NOTE: "Notes",
};

export const createAPIEndpoint = (endpoint) => {
	let url = BASE_URL + endpoint + "/";
	return {
		register: (newUser) => axios.post(url, newUser),
		login: (login) => axios.post(url, login),
		auth: (body) => axios.get(url, body),

		fetchAll: () => axios.get(url),
		fetchById: (id) => axios.get(url + id),
		create: (newRecord) => axios.post(url, newRecord),
		update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
		delete: (id) => axios.delete(url + id),
	};
};
