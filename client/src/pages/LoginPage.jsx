import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<Box minH="calc(100vh - 5rem)" maxW="2xl" mx="auto" p={8}>
			<Box bg="zinc.900" rounded="base" p={12}>
				<Box mb={8}>
					<Heading fontSize="2xl" color="zinc.200">
						Login
					</Heading>
					<Text fontSize="sm">To continue enjoying BeatBox</Text>
				</Box>
				<Flex direction="column" gap={4}>
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.300">
							Username
						</FormLabel>
						<Input
							border="1px"
							borderColor="zinc.600"
							rounded="base"
							outline={0}
							type="text"
							color="zinc.300"
							fontSize="sm"
						/>
					</FormControl>
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.300">
							Password
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
								border="none"
								_focus={{ outline: "none" }}
								type={showPassword ? "text" : "password"}
								color="zinc.300"
								fontSize="sm"
							/>
							<InputRightElement>
								<Button
									p={1}
									color="zinc.300"
									_hover={{ opacity: 0.8 }}
									variant="ghost"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<Box mt={6}>
						<Button
							bg="accent.main"
							py={5}
							w="full"
							_hover={{ color: "white" }}>
							LOGIN
						</Button>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default LoginPage;
