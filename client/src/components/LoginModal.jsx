import React from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginModal = React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	const { message } = useSelector((state) => state.modal);
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={ref}
			onClose={props?.onClose}
			isOpen={props?.isOpen}
			isCentered>
			<AlertDialogOverlay />

			<AlertDialogContent bg="zinc.200" mx={8}>
				<AlertDialogHeader fontSize={{ base: "lg", md: "xl" }}>
					Not Logged In
				</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody fontSize={{ base: "sm", md: "md" }}>
					{message}
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button
						ref={ref}
						onClick={props?.onClose}
						fontSize={{ base: "sm", md: "md" }}>
						Cancel
					</Button>
					<Button
						colorScheme="red"
						ml={3}
						onClick={() => navigate("/auth/login")}
						fontSize={{ base: "sm", md: "md" }}>
						Login
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
});

LoginModal.displayName = "LoginModal";

export default LoginModal;
