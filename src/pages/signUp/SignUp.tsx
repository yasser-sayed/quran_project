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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { TSignUpSchema, signUpSchema } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../state-management/hooks";
import { getUsers } from "../../state-management/fetchingDataSlices/usersSlice";
import { addUser } from "../../state-management/fetchingDataSlices/userApis";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    try {
      const users = await dispatch(getUsers()).unwrap();

      const checkUser = users.find((user) => user.userName === data.userName);

      if (!checkUser) {
        try {
          await dispatch(
            addUser({
              firstName: data.firstName,
              lastName: data.lastName,
              userName: data.userName,
              email: data.email,
              password: data.password,
              favList: [],
              age: data.age,
              gender: data.gender,
            })
          ).unwrap();

          navigate("/login");
        } catch (err) {
          setError("root", { message: err as string });
        }
      } else {
        setError("userName", { message: "userName is already used" });
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
            onSubmit={handleSubmit(onSubmit)}
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
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel color="whitesmoke">first name</FormLabel>
                <Input
                  {...register("firstName")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="last name"
                />
                <FormHelperText hidden={!!errors.firstName} color={"gray.300"}>
                  enter your first name.
                </FormHelperText>
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              {/* last name  */}
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel color="whitesmoke">last name</FormLabel>
                <Input
                  {...register("lastName")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="last name"
                />
                <FormHelperText hidden={!!errors.lastName} color={"gray.300"}>
                  enter your last name.
                </FormHelperText>
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
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

              {/* email  */}
              <FormControl isInvalid={!!errors.email}>
                <FormLabel color="whitesmoke">email</FormLabel>
                <Input
                  {...register("email")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder="username"
                />
                <FormHelperText hidden={!!errors.email} color={"gray.300"}>
                  enter your email.
                </FormHelperText>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
              <FormControl isInvalid={!!errors.password}>
                <FormLabel color="whitesmoke">Password</FormLabel>
                <Input
                  {...register("password")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="password"
                  placeholder="Password"
                />
                <FormHelperText hidden={!!errors.password} color={"gray.300"}>
                  password should be more than 5.
                </FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              {/* confirm password */}
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel color="whitesmoke">confirm Password</FormLabel>
                <Input
                  {...register("confirmPassword")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="password"
                  placeholder="confirm Password"
                />
                <FormHelperText
                  hidden={!!errors.confirmPassword}
                  color={"gray.300"}
                >
                  confirm your password.
                </FormHelperText>
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            {/*                            gender and age                                */}
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"1rem"}
              flexWrap={["wrap", "wrap", "nowrap"]}
              w={"100%"}
            >
              {/* gender */}
              <FormControl isInvalid={!!errors.gender}>
                <FormLabel color="whitesmoke">gender</FormLabel>
                <Select
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  {...register("gender")}
                >
                  <option
                    className="!bg-[#2A2A2A]  text-gray-300"
                    value={"male"}
                  >
                    male
                  </option>
                  <option
                    className="!bg-[#2A2A2A]  text-gray-300"
                    value={"female"}
                  >
                    female
                  </option>
                  <option
                    className="!bg-[#2A2A2A]  text-gray-300"
                    value={"other"}
                  >
                    other
                  </option>
                </Select>

                <FormHelperText color={"gray.300"} hidden={!!errors.gender}>
                  choose your gender.
                </FormHelperText>
                <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
              </FormControl>

              {/*  age */}
              <FormControl isInvalid={!!errors.age}>
                <FormLabel color="whitesmoke">age</FormLabel>
                <NumberInput
                  {...register("age")}
                  defaultValue={20}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  max={100}
                  min={7}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper color={"white"} />
                    <NumberDecrementStepper color={"white"} />
                  </NumberInputStepper>
                </NumberInput>

                <FormHelperText color={"gray.300"} hidden={!!errors.age}>
                  choose your age.
                </FormHelperText>
                <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            {/* terms checkBox */}

            <FormControl isInvalid={!!errors.agreeTerms}>
              <Checkbox
                {...register("agreeTerms")}
                colorScheme="sec"
                color="whitesmoke"
                alignSelf={"start"}
              >
                accept all terms
              </Checkbox>
              <FormErrorMessage>{errors.agreeTerms?.message}</FormErrorMessage>
            </FormControl>

            {/* root error */}

            <FormControl isInvalid={!!errors.root}>
              <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
            </FormControl>

            {/* sign Up */}

            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="signing up"
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
