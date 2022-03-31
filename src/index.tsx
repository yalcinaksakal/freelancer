import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Failed to find the root element");
const root = ReactDOMClient.createRoot(rootEl);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
