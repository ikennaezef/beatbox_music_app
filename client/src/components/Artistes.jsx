import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { AiOutlineLoading } from "react-icons/ai";
import ArtisteCard from "./ArtisteCard";
import { client } from "../api";
import { Link } from "react-router-dom";

const Artistes = () => {
	const [artistes, setArtistes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtistes = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("/artistes/top")
			.then((res) => {
				setArtistes(res.data);
				setLoading(false);
			})
			.catch(() => {
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
				<Heading as="h3" fontSize={{ base: "lg", md: "xl" }} fontWeight={500}>
					You May Like
				</Heading>
				<Link to="/artistes">
					<Button
						variant="unstyled"
						color="accent.light"
						fontSize={{ base: "sm", md: "md" }}
						fontWeight={500}>
						See more
					</Button>
				</Link>
			</Flex>

			{loading ? (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			) : error ? (
				<Box my={2}>
					<Text>Sorry, an error occured</Text>
				</Box>
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
		</Box>
	);
};

export default Artistes;
