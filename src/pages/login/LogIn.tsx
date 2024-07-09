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
  Checkbox,
  Button,
  CardFooter,
  Text,
  InputRightElement,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  userName: z.string().min(3),
  password: z.string().min(5),
});

type LogInFormFields = z.infer<typeof schema>;

const LogIn = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<LogInFormFields> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

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
        maxW="xl"
        w={["100%", "max-content"]}
        bg={"main"}
        my={["0", "3rem"]}
        py={"2rem"}
      >
        <CardHeader>
          <Heading
            size={"lg"}
            color={"white"}
            textAlign={"center"}
            fontFamily={"inherit"}
          >
            Log In
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex
            onSubmit={handleSubmit(onSubmit)}
            as="form"
            gap={"1rem"}
            width={"100%"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {/* userName  */}
            <FormControl isInvalid={errors.userName ? true : false}>
              <FormLabel color="whitesmoke">username</FormLabel>
              <Input
                {...register("userName")}
                focusBorderColor="sec.500"
                color="whitesmoke"
                type="text"
                placeholder="username"
              />
              <FormHelperText
                hidden={errors.userName ? true : false}
                color={"gray.300"}
              >
                enter your username.
              </FormHelperText>
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            {/* password */}
            <FormControl isInvalid={errors.password ? true : false}>
              <FormLabel color="whitesmoke">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  {...register("password")}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    icon={!show ? <FiEye /> : <FiEyeOff />}
                    aria-label={""}
                    variant={"text"}
                    color={"white"}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText
                hidden={errors.password ? true : false}
                color={"gray.300"}
              >
                enter your username.
              </FormHelperText>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            {/* remmber me */}

            <Checkbox colorScheme="sec" color="whitesmoke" alignSelf={"start"}>
              Remmber Me
            </Checkbox>

            {/* LogIn */}

            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="logging in"
              colorScheme="sec"
              w={"100%"}
              rounded={9999}
              color={"black"}
            >
              Log In
            </Button>
          </Flex>
        </CardBody>

        <hr />

        <CardFooter>
          <Text color={"white"} textAlign={"center"} w={"100%"}>
            don't have an account?{" "}
            <Text
              as={Link}
              _hover={{ color: "sec.700" }}
              to={"/signup"}
              color="sec.400"
            >
              signup
            </Text>{" "}
            now!
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default LogIn;
