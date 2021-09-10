import { createContext } from "react";

const LandCompare = createContext({
	landA: { landAreaID: null },
	landB: { landAreaID: null },
});

export { LandCompare };
