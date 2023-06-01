import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { MusicPlayer } from "../components/MusicPlayer/index.jsx";
import { useSelector } from "react-redux";

const HomeLayout = () => {
	const { currentTrack } = useSelector((state) => state.player);
	return (
		<>
			<Grid
				position="relative"
				templateColumns="repeat(10, 1fr)"
				bg="blackAlpha.900"
				color="#e3e3e3">
				<GridItem colSpan={2}>
					<Navbar />
				</GridItem>

				<GridItem colSpan={8} minH="100vh">
					<Outlet />
				</GridItem>
				{currentTrack && <MusicPlayer />}
			</Grid>
		</>
	);
};

export default HomeLayout;
