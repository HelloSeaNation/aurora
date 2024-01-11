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

const ButtonStyle = {
  backgroundColor: "#E8BCBC",
  color: "#FFFFFF",
  border: "none",
  width: "30px",
  height: "30px",
  margin: "0 10px 0 10px",
  fontSize: "30px",
};

export function CartItem({ id, quantity, size }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const allStoreItems = [...dresses, ...pants, ...tops];
  const item = allStoreItems.find((item) => item.id === id);
  if (item == null) return null;
  const totalPrice = item.price * quantity;

  return (
    <Grid
      templateColumns={"repeat(4, 1fr)"}
      gap={100}
      alignItems={"center"}
      style={{ border: "1px solid #AFA79F" }}
    >
      <Link to={`/${item.id}`}>
        <Image
          src={item.imgUrl}
          style={{
            paddingLeft: "4rem",
            paddingTop: "3rem",
            paddingBottom: "2rem",
            width: "100px",
            height: "auto",
          }}
        />
      </Link>
      <Flex direction={"column"}>
        <Box fontSize={"26px"}>{item.name}</Box>
        <Box>Size: {size}</Box>
      </Flex>
      <Flex></Flex>
      <Flex direction={"column"} alignItems={"center"}>
        <Box fontSize={"20px"}>
          <Button
            style={ButtonStyle}
            onClick={() => decreaseCartQuantity(id, size)}
          >
            -
          </Button>
          {quantity}
          <Button
            style={ButtonStyle}
            onClick={() => increaseCartQuantity(id, size)}
          >
            +
          </Button>
        </Box>
        <Box fontSize={"26px"}>{formatCurrency(totalPrice)}</Box>
      </Flex>
    </Grid>
  );
}
