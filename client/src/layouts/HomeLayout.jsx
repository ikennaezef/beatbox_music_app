import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const HomeLayout = () => {
	return (
		<Grid templateColumns="repeat(10, 1fr)" bg="blackAlpha.900" color="#e3e3e3">
			<GridItem colSpan={2} className="">
				<Navbar />
			</GridItem>

			<GridItem colSpan={8} className="">
				<Outlet />
			</GridItem>
		</Grid>
	);
};

export default HomeLayout;
