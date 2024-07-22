import { Box, Flex, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { useAppSelector } from "../../state-management/hooks";
import HomeAll from "./components/HomeAll";
import HomeRewayat from "./components/HomeRewayat";

const Home = () => {
  const { isEn } = useAppSelector((state) => state.settings);

  return (
    <Box bg="third" py={6} px={4}>
      <Tabs variant="soft-rounded" colorScheme="sec">
        <TabList color={"white"}>
          <Tab color={"white"}>{isEn ? "all" : "الكل"}</Tab>
          <Tab color={"white"}>{isEn ? "rewayat" : "روايات"}</Tab>
        </TabList>

        <Flex minH={"100vh"}>
          <TabPanels>
            <HomeAll />

            <HomeRewayat />
          </TabPanels>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default Home;
