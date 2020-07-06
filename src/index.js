import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";

const app = (
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));
