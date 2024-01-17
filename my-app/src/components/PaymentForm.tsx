import React, { useState } from "react";
import {
  CardElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useShoppingCart } from "../context/cartFunction";
import dresses from "../hooks/dressdata.json";
import pants from "../hooks/pants-data.json";
import tops from "../hooks/top-data.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const PaymentForm = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const totalPrice = cartItems
    .reduce((total: number, cartItem: { id: number; quantity: number }) => {
      const allStoreItems = [...dresses, ...pants, ...tops];
      const item = allStoreItems.find((item) => item.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0)
    .toFixed(2);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState<StripeError | undefined>(
    undefined
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement(AddressElement);

    if (cardElement && addressElement) {
      try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            address: {
              country: "NZ",
            },
          },
        });

        if (error) {
          setPaymentError(error);
        } else {
          // Send the token to your server for further processing
          console.log(paymentMethod);
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    } else {
      console.error("Card Element or Address Element not found");
    }
  };

  const cardStyle = {
    base: {
      fontSize: "20px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  };

  const textStyles = {
    fontFamily: "Koulen",
    fontSize: "30px",
    margin: "auto",
  };

  const cardElementOptions = {
    hidePostalCode: true,
    style: cardStyle,
    disableLink: true,
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box width={"75%"} marginLeft={"145px"}>
        <Text textAlign={"left"} style={textStyles}>
          Payment
        </Text>
        <Text fontFamily={"Arial"} fontSize={"25px"} fontWeight={"bold"}>
          Total: {formatCurrency(Number(totalPrice))}
        </Text>
        <Box fontFamily={"Arial"} fontSize={"20px"} marginBottom={"10px"}>
          Debit or Credit Card
        </Box>
        <Box
          border={"1px solid #E6E6E6"}
          borderRadius={"5px"}
          height={"25px"}
          padding={"10px"}
        >
          <CardElement options={cardElementOptions} />
        </Box>
        <Text
          fontFamily={"Koulen"}
          fontSize={"30px"}
          marginTop={"20px"}
          marginBottom={"-5px"}
        >
          Billing Address
        </Text>
        <AddressElement options={{ mode: "billing" }} />
        {paymentError && (
          <Text style={{ color: "red" }}>{paymentError.message}</Text>
        )}
        <Flex justifyContent={"space-between"} alignContent={"center"}>
          <Flex flexDirection={"row"} alignItems={"center"}>
            <ChevronLeftIcon
              width={"40px"}
              fontSize={"50px"}
              marginLeft={"-10px"}
              onClick={() => {
                window.location.href = "#/shopping-cart";
              }}
              _hover={{ cursor: "pointer" }}
            />
            <Text
              fontFamily={"Koulen"}
              fontSize={"30px"}
              onClick={() => {
                window.location.href = "#/shopping-cart";
              }}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Back
            </Text>
          </Flex>

          <Button
            type="submit"
            disabled={!stripe}
            width={"300px"}
            fontSize={"30px"}
            height={"80px"}
            borderRadius={"15"}
            backgroundColor={"#028702"}
            color={"#FFFFFF"}
            border={"transparent"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            cursor="pointer"
            marginTop={"20px"}
            fontFamily={"Koulen"}
            _hover={{ backgroundColor: "#007000" }}
          >
            Pay Now
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default PaymentForm;
