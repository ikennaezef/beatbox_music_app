import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
	return (
		<Box mb={6} pb={4} borderBottom="1px" borderBottomColor="zinc.600">
			<InputGroup>
				<Input
					border="1px"
					borderColor="zinc.700"
					placeholder="Search..."
					w="full"
					outline={0}
					bg="transparent"
					p={2}
				/>
				<InputRightElement color="zinc.500">
					<BsSearch color="inherit" />
				</InputRightElement>
			</InputGroup>
		</Box>
	);
};

export default Search;
