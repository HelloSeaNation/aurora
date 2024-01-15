import { Box, Text, Flex } from "@chakra-ui/react";
import Map from "../components/Map";

function OrderConfirmPage() {
  return (
    <Box>
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Text fontSize="30px" fontFamily={"Koulen"}>
          Thank you for your order
        </Text>
        <Text
          fontFamily={"Koulen"}
          fontSize={"20px"}
          color={"#8F8F8F"}
          marginTop={"-20px"}
        >
          Estimated shipping between 4-7 business days
        </Text>
        <Map width="80%" height="350" />
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          fontSize={"25px"}
          fontFamily={"Koulen"}
          gap={"10px"}
          marginTop={"30px"}
        >
          <Box>Phone: +64 27 783 7824</Box>
          <Box>E-mail: aurora@gmail.com</Box>
          <Box>128 Riccarton Road, Riccarton, Christchurch 8041</Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default OrderConfirmPage;
