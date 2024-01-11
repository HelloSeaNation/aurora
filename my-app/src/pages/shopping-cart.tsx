import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Container, Text, Flex, Box, Button } from "@chakra-ui/react";
import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/cartFunction";
import dresses from "../hooks/dressdata.json";
import pants from "../hooks/pants-data.json";
import tops from "../hooks/top-data.json";
import { formatCurrency } from "../utilities/formatCurrency";

const textStyles = {
  fontFamily: "Koulen",
  margin: "auto",
  width: "80%",
};

const subtotalStyle = {
  fontFamily: "Koulen",
  margin: "auto",
  fontSize: "30px",
};

function ShoppingCart() {
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
      <Text
        fontSize={"30"}
        textAlign={"left"}
        padding={"20px 0 20px 0"}
        style={textStyles}
      >
        Shopping Cart
      </Text>
      <Box
        style={{
          ...textStyles,
          fontSize: "20px",
        }}
      >
        {cartItems.length > 0 ? ( // Conditionally render based on cartItems length
          <Box>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} size={item.size} />
            ))}
            <Flex justifyContent={"flex-end"} margin={"auto"}>
              <Box>
                <Text
                  style={subtotalStyle}
                  paddingTop={"20px"}
                  paddingRight={"15px"}
                >
                  SubTotal
                </Text>
              </Box>
              <Box>
                <Text
                  style={subtotalStyle}
                  paddingTop={"20px"}
                  paddingRight={"15px"}
                >
                  {formatCurrency(Number(totalPrice))}
                </Text>
              </Box>
            </Flex>
            <Flex
              justifyContent={"flex-end"}
              margin={"auto"}
              paddingRight={"15px"}
              marginTop={"-20px"}
              fontSize={"20px"}
              fontFamily={"Koulen"}
            >
              <Text>Includes GST. Shipping calculated at checkout</Text>
            </Flex>
            <Flex width={"80%"} margin={"auto"} justifyContent={"center"}>
              <Button
                width={"325px"}
                height={"83px"}
                borderRadius={"15"}
                backgroundColor={"#028702"}
                color={"#FFFFFF"}
                border={"transparent"}
                boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              >
                <Text style={subtotalStyle} backgroundColor={"#028702"}>
                  CHECKOUT
                </Text>
              </Button>
            </Flex>
          </Box>
        ) : (
          <Container
            style={{
              border: "1px solid #AFA79F",
              height: "20vh",
              textAlign: "center",
              width: "100%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "5rem",
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              color={"#E8BCBC"}
              fontSize={"70px"}
              style={{ margin: "auto", padding: "5vh 0 0 0" }}
            />
            <Text
              fontSize={"36"}
              textAlign={"center"}
              padding={"20px 0 0 0"}
              style={textStyles}
            >
              YOUR CART IS EMPTY!
            </Text>
          </Container>
        )}{" "}
      </Box>
    </>
  );
}

export default ShoppingCart;
