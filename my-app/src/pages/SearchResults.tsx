import React from "react";
import {
  Text,
  Card,
  Image,
  CardBody,
  SimpleGrid,
  Flex,
  Box,
} from "@chakra-ui/react";
import HoverImage from "../components/HoverImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar,} from "@fortawesome/free-solid-svg-icons";
import dresses from "../hooks/dressdata.json";
import pant from "../hooks/pants-data.json";
import top from "../hooks/top-data.json";
import { Link, useParams } from "react-router-dom";
import {formatCurrency} from "../utilities/formatCurrency";


interface Product {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    hoverImage: string;
  }

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

function SearchResults() {
  const { itemName } = useParams();
    if (!itemName) {
      // Handle the case where itemName is not defined
      return <div>No search term provided</div>;
    }
  
    const filterItemsByName = (itemName: string): Product[] => {
        const matchingDresses = dresses.filter((item) =>
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );
        const matchingPants = pant.filter((item) =>
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );
        const matchingTops = top.filter((item) =>
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );
      
        return [...matchingDresses, ...matchingPants, ...matchingTops];
      };
  
    const matchingProducts = filterItemsByName(itemName);
  
    if (matchingProducts.length === 0) {
      // Handle no matching items
      return <div>No matching items found</div>;
    }
  
    return (
      <>
        <Text
          fontWeight={"600"}
          fontSize={"30px"}
          padding={"20px 0 20px 0"}
          width={"80%"}
          style={textStyles}
        >
          Search Results
        </Text>
        <SimpleGrid spacingY={60} columns={4} width={"85%"} margin={"auto"}>
          {matchingProducts.map((product) => (
            <Link
              key={product.id}
              to={`/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card key={product.id} style={cardStyles}>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <CardBody>
                    <HoverImage
                      defaultImage={product.imgUrl}
                      hoverImage={product.hoverImage}
                    />
                  </CardBody>
                  <Box style={boxStyle}>
                    <Text style={cardStyles}>{product.name}</Text>
                    <Text style={cardStyles}>{formatCurrency(product.price)}</Text>
                  </Box>
                  <Flex alignItems="center">
                    <FontAwesomeIcon icon={faStar} color={"#F1C040"} />
                    <Text style={{ ...cardStyles, ...cardStylesRight }}>4.0</Text>
                  </Flex>
                </Box>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </>
    );
  }
  
  export default SearchResults;