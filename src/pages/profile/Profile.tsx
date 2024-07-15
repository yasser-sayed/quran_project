import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";

const Profile = () => {
  const { userId } = useParams();
  return (
    <Flex
      p={10}
      minH={["unset", "100vh"]}
      bgGradient="linear(to-b, third, main)"
    >
      {/*               DetailsSection                  */}
      <Flex w={"100%"}>
        <Grid
          justifyContent={"center"}
          w={"100%"}
          templateColumns="repeat(10,1fr)"
          gap={2}
        >
          <GridItem colSpan={1}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              h={"90px"}
              w={"90px"}
              rounded={9999}
              bg={"sec.400"}
            >
              <Heading as={"h2"} size={"2xl"} fontFamily={"inherit"}>
                ys
              </Heading>
            </Flex>
          </GridItem>

          <GridItem colSpan={8}>
            <Text>profile</Text>

            <Heading fontFamily={"inherit"}>Yasser Sayed</Heading>

            <Text> member </Text>
          </GridItem>

          <GridItem colSpan={1}>
            <IconButton
              as={Link}
              to={`/profile/${userId}/edit`}
              icon={<MdOutlineEdit className="text-4xl" />}
              variant={"ghost"}
              rounded={9999}
              colorScheme="whiteAlpha"
              color={"white"}
              p={3}
              aria-label="Options"
            />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Profile;
