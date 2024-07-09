import {
  Flex,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  CardFooter,
  Text,
} from "@chakra-ui/react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      minH={["unset", "100vh"]}
      bgGradient="linear(to-b, #2A2A2A, main)"
    >
      <Card
        as={Container}
        gap={"1rem"}
        maxW="2xl"
        // w={["100%", "max-content"]}
        bg={"main"}
        my={["0", "0", "3rem"]}
        py={"2rem"}
      >
        <CardHeader>
          <Heading size={"xl"} color={"white"} textAlign={"center"}>
            Sign up to start listening
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex
            as="form"
            gap={"1.5rem"}
            width={"100%"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {/*                            first and last name                                */}
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"1rem"}
              flexWrap={["wrap", "wrap", "nowrap"]}
              w={"100%"}
            >
              {/* first name  */}
              <FormControl>
                <FormLabel color="whitesmoke">first name</FormLabel>
                <Input
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="last name"
                />
                <FormHelperText color={"gray.300"}>
                  enter your first name.
                </FormHelperText>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>

              {/* last name  */}
              <FormControl>
                <FormLabel color="whitesmoke">last name</FormLabel>
                <Input
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="last name"
                />
                <FormHelperText color={"gray.300"}>
                  enter your last name.
                </FormHelperText>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
            </Flex>

            {/*                            userName and email                                */}
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"1rem"}
              flexWrap={["wrap", "wrap", "nowrap"]}
              w={"100%"}
            >
              {/* userName  */}
              <FormControl>
                <FormLabel color="whitesmoke">username</FormLabel>
                <Input
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="username"
                />
                <FormHelperText color={"gray.300"}>
                  enter your username.
                </FormHelperText>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>

              {/* email  */}
              <FormControl>
                <FormLabel color="whitesmoke">email</FormLabel>
                <Input
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="username"
                />
                <FormHelperText color={"gray.300"}>
                  enter your email.
                </FormHelperText>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
            </Flex>

            {/*                            password and confirm                                */}
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"1rem"}
              flexWrap={["wrap", "wrap", "nowrap"]}
              w={"100%"}
            >
              {/* password */}
              <FormControl>
                <FormLabel color="whitesmoke">Password</FormLabel>
                <Input
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="password"
                  placeholder="Password"
                />
                <FormHelperText color={"gray.300"}>
                  password should be more than 5.
                </FormHelperText>
                <FormErrorMessage>password is required.</FormErrorMessage>
              </FormControl>

              {/* confirm password */}
              <FormControl>
                <FormLabel color="whitesmoke">confirm Password</FormLabel>
                <Input
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="password"
                  placeholder="confirm Password"
                />
                <FormHelperText color={"gray.300"}>
                  confirm your password.
                </FormHelperText>
                <FormErrorMessage>password is required.</FormErrorMessage>
              </FormControl>
            </Flex>

            {/* sign Up */}

            <Button
              // isLoading
              loadingText="logging in"
              colorScheme="sec"
              w={"100%"}
              rounded={9999}
              color={"black"}
            >
              Sign Up
            </Button>
          </Flex>
        </CardBody>

        <hr />

        <CardFooter>
          <Text color={"white"} textAlign={"center"} w={"100%"}>
            already have an account?{" "}
            <Text
              as={Link}
              _hover={{ color: "sec.700" }}
              to={"/login"}
              color="sec.400"
            >
              login
            </Text>{" "}
            now!
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default SignUp;
