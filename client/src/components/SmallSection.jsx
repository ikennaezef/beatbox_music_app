import React, { useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineLoading } from "react-icons/ai";
import SongCard from "./SongCard";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { client } from "../api";
import { Link } from "react-router-dom";

const SmallSection = ({ title, endpoint }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	const fetchData = async () => {
		setError(false);
		setLoading(true);
		await client
			.get(`${endpoint}`)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
				setLoading(false);

				console.log(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Box mt={8}>
			<Flex align="center" justify="space-between">
				<Flex align="center" gap={3}>
					<Heading as="h3" fontSize="xl" fontWeight={500}>
						{title}
					</Heading>
					<Box color="accent.main">
						<AiFillPlayCircle size={20} color="inherit" />
					</Box>
				</Flex>
				<Link to="/library">
					<Button variant="unstyled" color="accent.light" fontWeight={500}>
						See more
					</Button>
				</Link>
			</Flex>
			{loading ? (
				<Flex align="center" color="accent.main" justify="center" minH="20rem">
					<AiOutlineLoading color="inherit" className="spin" size={36} />
				</Flex>
			) : (
				<Flex
					align="center"
					overflowX="scroll"
					gap={5}
					mt={3}
					pb={4}
					className="scrollbar_style">
					{data?.map((song) => (
						<SongCard key={song._id} song={song} />
					))}
				</Flex>
			)}
		</Box>
	);
};

export default SmallSection;
