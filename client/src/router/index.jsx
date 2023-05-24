import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import LibraryPage from "../pages/LibraryPage";
import PlaylistsPage from "../pages/PlaylistsPage";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "library",
				element: <LibraryPage />,
			},
			{
				path: "playlists",
				element: <PlaylistsPage />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
]);
