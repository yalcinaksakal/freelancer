import React, { useState } from "react";
import NavList from "./components/Nav/NavList";
import styles from "./App.module.scss";
import History from "./components/History/History";
import { SVGS } from "./svg/svg";
import AddItem from "./components/AddItem/AddItem";
import Perfrm from "./components/Perfrm/Perfrm";

const App: React.FC = () => {
	const [cur, setCur] = useState("logs"),
		clicked = (nav: string) => setCur(nav);
	return (
		<div className={styles.App}>
			<NavList clicked={clicked} cur={cur} />
			<h6 style={{ color: "dodgerblue", margin: "0.5rem 0 0 1rem" }}>
				{SVGS[cur].description.toUpperCase()}
			</h6>
			{cur === "logs" ? <History /> : cur === "add" ? <AddItem /> : <Perfrm />}
		</div>
	);
};

export default App;
