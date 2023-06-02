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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginModal = React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	const { message } = useSelector((state) => state.modal);
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
				<AlertDialogBody>{message}</AlertDialogBody>
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
