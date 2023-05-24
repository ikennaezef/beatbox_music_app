import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { AiFillPlayCircle, AiOutlineLoading } from "react-icons/ai";
import ArtisteCard from "./ArtisteCard";
import axios from "axios";

const Artistes = () => {
	const [artistes, setArtistes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtistes = async () => {
		setLoading(true);
		setError(false);
		await axios
			.get("http://localhost:3001/api/artistes/top")
			.then((res) => {
				setArtistes(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log("ERROR--->", err);
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchArtistes();
	}, []);

	return (
		<Box mt={8}>
			<Flex align="center" justify="space-between" mb={3}>
				<Heading as="h3" fontSize="xl" fontWeight={500}>
					You May Like
				</Heading>
				<Button variant="unstyled" color="accent.light" fontWeight={500}>
					See more
				</Button>
			</Flex>

			{loading ? (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			) : (
				<Flex
					align="stretch"
					overflowX="scroll"
					gap={5}
					mt={3}
					pb={4}
					px={2}
					className="scrollbar_style">
					{artistes?.map((artiste) => (
						<ArtisteCard key={artiste._id} artiste={artiste} />
					))}
				</Flex>
			)}
			{error && (
				<Box>
					<Text>Sorry, an error occured</Text>
				</Box>
			)}
		</Box>
	);
};

export default Artistes;
