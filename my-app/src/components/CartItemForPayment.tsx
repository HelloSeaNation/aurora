import { useShoppingCart } from "../context/cartFunction";
import dresses from "../hooks/dressdata.json";
import pants from "../hooks/pants-data.json";
import tops from "../hooks/top-data.json";
import { Image, Grid, Box, Button, Flex } from "@chakra-ui/react";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";

type CartItemProps = {
  id: number;
  quantity: number;
  size: string;
};

const textStyles = {
  fontFamily: "Arial",
};

export function CartItem({ id, quantity, size }: CartItemProps) {
  const allStoreItems = [...dresses, ...pants, ...tops];
  const item = allStoreItems.find((item) => item.id === id);
  if (item == null) return null;
  const totalPrice = item.price * quantity;

  return (
    <Flex style={{ alignItems: "center" }}>
      <Link to={`/${item.id}`}>
        <Image
          src={item.imgUrl}
          style={{
            paddingLeft: "1rem",
            paddingTop: "1rem",
            paddingRight: "1rem",
            width: "80px",
            height: "auto",
          }}
        />
      </Link>
      <Flex direction={"column"} gap={"15px"} width={"40%"}>
        <Box style={textStyles} fontSize={"26px"}>
          {item.name}
        </Box>
        <Flex direction={"row"} justifyContent={"space-between"} >
          <Box style={textStyles} fontSize={"20px"}>
            Size: {size}
          </Box>
          <Box style={textStyles} fontSize={"20px"}>
            Qty: {quantity}
          </Box>
        </Flex>
        <Box style={textStyles} fontSize={"20px"}>
          {formatCurrency(totalPrice)}
        </Box>
      </Flex>
      <Flex></Flex>
      <Flex direction={"column"} alignItems={"center"}></Flex>
    </Flex>
  );
}
