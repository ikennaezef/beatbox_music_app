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
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={ref}
			onClose={props.onClose}
			isOpen={props.isOpen}
			isCentered>
			<AlertDialogOverlay />

			<AlertDialogContent bg="zinc.200">
				<AlertDialogHeader>Not Logged In</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody>
					Please login to save songs to your favorites.
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button ref={ref} onClick={props.onClose}>
						Cancel
					</Button>
					<Button
						colorScheme="red"
						ml={3}
						onClick={() => navigate("/auth/login")}>
						Login
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
});

export default LoginModal;
