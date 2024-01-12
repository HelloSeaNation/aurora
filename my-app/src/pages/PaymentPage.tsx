import React from "react";
import PaymentForm from "../components/PaymentForm";
import { Box, Text, Flex } from "@chakra-ui/react";
import { CartItem } from "../components/CartItemForPayment";
import { useShoppingCart } from "../context/cartFunction";
import dresses from "../hooks/dressdata.json";
import pants from "../hooks/pants-data.json";
import tops from "../hooks/top-data.json";

const PaymentPage = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const totalPrice = cartItems
    .reduce((total: number, cartItem: { id: number; quantity: number }) => {
      const allStoreItems = [...dresses, ...pants, ...tops];
      const item = allStoreItems.find((item) => item.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0)
    .toFixed(2);

  return (
    <>
      <Flex direction={"row"} width={"100%"} minHeight="85vh">
        {/* Left side  */}
        <Box width={"50%"} paddingTop={"20px"}>
          <PaymentForm />
        </Box>

        {/* Right side */}
        <Box
          width={"50%"}
          paddingLeft={"30px"}
          paddingTop={"20px"}
          backgroundColor={"#EDEDED"}
          fontFamily={"Koulen"}
          fontSize={"30px"}
        >
          <Text fontSize={"32px"}>Order Summary</Text>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} size={item.size} />
          ))}
          <Flex
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"71.5%"}
          >
            <Text fontFamily={"Koulen"} fontSize={"32px"}>
              Order Total
            </Text>
            <Flex flexDirection={"column"}>
              <Text
                marginTop={"0"}
                paddingTop={"45px"}
                fontFamily={"Arial"}
                fontSize={"30px"}
                fontWeight={"bold"}
              >
                NZD ${totalPrice}
              </Text>
              <Text fontFamily={"Arial"} marginTop={"-20px"} fontSize={"20px"}>
                Includes GST
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default PaymentPage;
