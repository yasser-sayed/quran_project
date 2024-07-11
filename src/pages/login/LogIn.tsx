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
import { Link, useNavigate } from "react-router-dom";
import { TLogInSchema, User, logInSchema } from "../../lib/types";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import { getUsers } from "../../state-management/fetchingDataSlices/usersSlice";
import { setUser } from "../../state-management/userDetSlice/userDetSlice";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLogInSchema>({ resolver: zodResolver(logInSchema) });

  const onSubmit: SubmitHandler<TLogInSchema> = async (data) => {
    try {
      await dispatch(getUsers()).unwrap();

      const userCheck: User | undefined = users.find(
        (user) => user.userName === data.userName
      );

      if (userCheck) {
        if (userCheck.password === data.password) {
          dispatch(setUser(userCheck));
          navigate("/");
        } else {
          setError("password", { message: "invalid password" });
        }
      } else {
        setError("userName", { message: "user not found" });
      }
    } catch (err) {
      setError("root", { message: err as string });
    }
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
            <FormControl isInvalid={!!errors.userName}>
              <FormLabel color="whitesmoke">username</FormLabel>
              <Input
                {...register("userName")}
                focusBorderColor="sec.500"
                color="whitesmoke"
                type="text"
                placeholder="username"
              />
              <FormHelperText hidden={!!errors.userName} color={"gray.300"}>
                enter your username.
              </FormHelperText>
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            {/* password */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel color="whitesmoke">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  {...register("password")}
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FiEye /> : <FiEyeOff />}
                    aria-label="Toggle password visibility"
                    variant={"text"}
                    color={"white"}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText hidden={!!errors.password} color={"gray.300"}>
                enter your username.
              </FormHelperText>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            {/* remmber me */}

            <Checkbox colorScheme="sec" color="whitesmoke" alignSelf={"start"}>
              Remmber Me
            </Checkbox>

            {/* root error */}

            <FormControl isInvalid={!!errors.root}>
              <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
            </FormControl>

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
