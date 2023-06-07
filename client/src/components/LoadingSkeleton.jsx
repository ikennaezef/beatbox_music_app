import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const LoadingSkeleton = () => {
	return (
		<Box minH="100vh" p={6}>
			<Flex align="flex-start" justify="stretch" gap={6}>
				<Skeleton
					width="18rem"
					height="15rem"
					startColor="zinc.800"
					endColor="zinc.900"
				/>
				<Box w="full">
					<SkeletonText
						noOfLines={1}
						width="15rem"
						skeletonHeight={8}
						mb={5}
						startColor="zinc.800"
						endColor="zinc.900"
					/>
					<SkeletonText
						noOfLines={4}
						spacing="4"
						width="full"
						skeletonHeight="4"
						startColor="zinc.800"
						endColor="zinc.900"
					/>
				</Box>
			</Flex>
			<Box mt={12}>
				<Skeleton
					width="10rem"
					height="2rem"
					startColor="zinc.800"
					endColor="zinc.900"
					mb={8}
				/>
				<SkeletonText
					noOfLines={6}
					spacing="4"
					width="full"
					skeletonHeight="6"
					startColor="zinc.800"
					endColor="zinc.900"
				/>
			</Box>
		</Box>
	);
};

export default LoadingSkeleton;
