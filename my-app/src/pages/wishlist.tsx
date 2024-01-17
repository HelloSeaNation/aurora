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
  import { Link } from "react-router-dom";
  import { formatCurrency } from "../utilities/formatCurrency";
  import { useWishlist } from '../components/WishlistContext'

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

const Wishlist: React.FC = () => {
    const { wishlistItems } = useWishlist();
  
    return (
      <>
        <Text fontWeight={"600"} fontSize={"30px"} padding={"20px 0 20px 0"} width={"80%"} style={textStyles}>
          Wishlist
        </Text>
        <SimpleGrid spacingY={60} columns={4} width={"85%"} margin={"auto"}>
          {wishlistItems.map((item) => (
            <Link key={item.id} to={`/${item.id}`} style={{ textDecoration: "none" }}>
              <Card key={item.id} style={cardStyles}>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <CardBody>
                    <HoverImage defaultImage={item.imgUrl} hoverImage={item.hoverImage} />
                  </CardBody>
                  <Box style={boxStyle}>
                    <Text style={cardStyles}>{item.name}</Text>
                  </Box>
                  <Flex alignItems="center">
                    <Text style={cardStyles}>{formatCurrency(item.price)}</Text>
                    <FontAwesomeIcon icon={faStar} color={"#F1C040"} />
                    <Text style={{ ...cardStyles, ...cardStylesRight }}>4.5</Text>
                  </Flex>
                </Box>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </>
    );
  };
  
  export default Wishlist;