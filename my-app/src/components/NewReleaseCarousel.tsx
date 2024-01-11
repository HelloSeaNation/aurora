import React, { useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Link } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface Product {
  name: string;
  imgUrl: string;
  id: number;
}

const NewReleaseCarousel = ({ clothingData }: { clothingData: Product[] }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(clothingData); // Just set the products directly
  }, [clothingData]);

  const groupCount = Math.ceil(products.length / 4);

  const renderGroups = () => {
    return [...Array(groupCount)].map((_, groupIndex) => (
      <div key={groupIndex}>
        <Flex
          key={groupIndex}
          justifyContent="space-between"
          width="100%"
          margin="auto"
        >
          {products
            .slice(groupIndex * 4, (groupIndex + 1) * 4)
            .map((product, index) => (
              <Box key={index} flexBasis={"25%"}>
                <Link key={index} to={`/${product.id}`}>
                  <Box padding={"5px 20px 5px 10px"}>
                    <Image
                      key={index}
                      src={product.imgUrl}
                      alt={product.name}
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        height: "auto",
                      }}
                    />
                  </Box>{" "}
                </Link>
              </Box>
            ))}
        </Flex>
      </div>
    ));
  };

  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      selectedItem={0}
      emulateTouch={true}
      transitionTime={2000}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              height: "96%",
              paddingTop: "13%",
            }}
            onClick={onClickHandler}
          >
            <FontAwesomeIcon
              icon={faCaretLeft}
              color="grey"
              fontSize={"70"}
              opacity={"40%"}
            />
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <div
            style={{
              position: "absolute",
              right: "30px",
              transform: "translateY(-50%)",
              zIndex: 2,
              height: "96%",
              top: "50%",
              paddingTop: "13%",
            }}
            onClick={onClickHandler}
          >
            <FontAwesomeIcon
              icon={faCaretRight}
              color="grey"
              fontSize={"70"}
              opacity={"40%"}
            />
          </div>
        )
      }
    >
      {renderGroups()}
    </Carousel>
  );
};

export default NewReleaseCarousel;
