import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const ErrorPage = () => {
	return (
		<Box bg="zinc.900" minH="100vh" p={4}>
			<Flex direction="column" minH="25rem" align="center" justify="center">
				<Heading>404</Heading>
				<Text color="zinc.300">An error occured. Page Not Found!</Text>
			</Flex>
		</Box>
	);
};

export default ErrorPage;
