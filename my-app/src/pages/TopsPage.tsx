import React from "react";
import {
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  Box,
} from "@chakra-ui/react";
import HoverImage from "../components/HoverImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar,} from "@fortawesome/free-solid-svg-icons";
import tops from "../hooks/top-data.json"
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";

const textStyles = {
  fontFamily: "Koulen",
  margin: "auto",
};

const cardStyles = {
  fontFamily: "Koulen",
  fontSize: "18px",
  fontWeight: "500",
  width: "21vh",
};

const cardStylesRight ={
  width: "3vh",
  paddingLeft: "8px",
};

const boxStyle = {
  flexGrow: 1,
  marginBottom: "-40px",
  marginTop: "-25px",
};

function Tops() {
  return (
    <>
      <Text
        fontWeight={"600"}
        fontSize={"30px"}
        padding={"20px 0 20px 0"}
        width={"80%"}
        style={textStyles}
      >
        Tops
      </Text>
      <SimpleGrid spacingY={60} columns={4} width={"85%"} margin={"auto"}>
        {tops.map((top) => (
        <Link key={top.id}
        to={`/${top.id}`} // Use the item ID as part of the URL
        style={{ textDecoration: "none" }}>   
          <Card key={top.id} style={cardStyles}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <CardBody>
                <HoverImage
                  defaultImage={top.imgUrl}
                  hoverImage={top.hoverImage}
                />
              </CardBody>
              <Box style={boxStyle}>
                <Text style={cardStyles}>{top.name}</Text>
              </Box>
              <Flex alignItems="center">
                <Text style={cardStyles}>{formatCurrency(top.price)}</Text>
                {/* <FontAwesomeIcon icon={faStar} color={"#F1C040"} />
                <Text style={{ ...cardStyles, ...cardStylesRight }}>4.5</Text> */}
              </Flex>
            </Box>
          </Card>
          </Link> 
        ))}
      </SimpleGrid>
    </>
  );
}

export default Tops;
