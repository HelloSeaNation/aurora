import { Image, Box, Text } from "@chakra-ui/react";
import NewReleaseCarousel from "../components/NewReleaseCarousel";
import dressData from "../hooks/dressdata.json";
import pantsData from "../hooks/pants-data.json";
import topsData from "../hooks/top-data.json";

export const Home = () => {
  const combinedData = [...dressData, ...pantsData, ...topsData];

  return (
    <Box h={"100vh"}>
      <Image src="../comfortpic.png" width={"100%"}></Image>
      <Text
        fontFamily={"Khula"}
        fontWeight={"600"}
        fontSize={"20px"}
        margin={"30px"}
      >
        New Release
      </Text>
      <NewReleaseCarousel clothingData={combinedData} />
    </Box>
  );
};

export default Home;
