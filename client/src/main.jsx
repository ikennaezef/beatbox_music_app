import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.js";
import { store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistStore(store)}>
				<ChakraProvider
					theme={theme}
					toastOptions={{
						defaultOptions: {
							position: "top",
							duration: 3000,
							variant: "subtle",
							containerStyle: { fontSize: 14 },
						},
					}}>
					<RouterProvider router={router} />
				</ChakraProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
