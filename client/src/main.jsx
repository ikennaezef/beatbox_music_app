import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
);
