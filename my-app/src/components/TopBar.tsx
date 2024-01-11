import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBagShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/cartFunction";

function TopBar() {
  const { cartQuantity} = useShoppingCart();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      (inputRef.current as HTMLInputElement)?.focus();
    }
  }, [showInput]);

  const closeInput = () => {
    setShowInput(false);
  };

  return (
    <Box>
      <Flex
        backgroundColor="#E8BCBC"
        minHeight={"5vh"}
        width={"100%"}
        justifyContent="space-between" // To space the elements
        alignItems="center" // To vertically center the items
      >
        <Box flex="1" style={{ textAlign: "center" }}>
          <Link to="/">
            <Image src="../aurora.svg" height={"3vh"} margin={"20px"} />
          </Link>
        </Box>
        <Box
          style={{ fontSize: "18px", cursor: "pointer" }}
          paddingRight="40px"
          position={"relative"}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color="#F5F5F5"
            style={{ paddingRight: "30px" }}
            onClick={() => setShowInput(!showInput)}
          />
          <Link to="/shopping-cart">
          <FontAwesomeIcon
            icon={faBagShopping}
            color="#F5F5F5"
          />
          {cartQuantity > 0 && (
            <Box
              position="absolute"
              top="12px"
              right="30px"
              borderRadius="100%"
              backgroundColor="#2A2A2A"
              width="15px"
              height="15px"
              textAlign="center"
              fontSize="10px"
              color="white"
            >
              {cartQuantity}
            </Box>
          )}
          </Link>
        </Box>
      </Flex>

      {/* This is the input field that appears when the SEARCH Icon is clicked */}
      {showInput && (
        <InputGroup position="relative">
          <InputLeftElement
            pointerEvents="none"
            children={
              <FontAwesomeIcon icon={faMagnifyingGlass} color="#afafad" />
            }
            padding="20px 20px 20px 30px"
            fontSize={"20px"}
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search"
            outlineColor="transparent"
            borderRadius={"0"}
            style={{
              transition: "width 1s ease-out",
              width: "100%",
              fontSize: "25px",
              border: "none",
              backgroundColor: "#F5F5F5",
              position: "absolute",
              paddingBlock: "0px",
              paddingInline: "0px",
              marginTop: "3px",
              padding: "15px 0 15px 70px",
              boxSizing: "border-box",
            }}
          ></Input>
          <InputRightElement
            position={"absolute"}
            padding={"015px"}
            onClick={closeInput}
            fontSize={"15px"}
            color={"#8D8D8D"}
            backgroundColor={"#EDEDED"}
            borderRadius={"100%"}
            h={"0px"}
            w={"0px"}
            m={"15px"}
          >
            <FontAwesomeIcon icon={faXmark} />
          </InputRightElement>
        </InputGroup>
      )}
    </Box>
  );
}

export default TopBar;
