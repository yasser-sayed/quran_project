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
  Image,
  InputLeftElement,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { TLogInSchema, User, createLogInSchema } from "../../lib/types";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import { getUsers } from "../../state-management/fetchingDataSlices/usersSlice";
import { setUser } from "../../state-management/userDetSlice/userDetSlice";
import { setUserId } from "../../state-management/userDetSlice/userLoginSlice";
import mushaf from "../../assets/mushaf.png";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isEn } = useAppSelector((state) => state.settings);
  const logInSchema = createLogInSchema(isEn);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLogInSchema>({ resolver: zodResolver(logInSchema) });

  const onSubmit: SubmitHandler<TLogInSchema> = async (data) => {
    try {
      const users = await dispatch(getUsers()).unwrap();

      const userCheck: User | undefined = users.find(
        (user) => user.userName === data.userName
      );

      if (userCheck) {
        if (userCheck.password === data.password) {
          dispatch(setUser(userCheck));
          if (data.remmberMe) {
            dispatch(setUserId(userCheck.id as string));
          }
          navigate("/");
        } else {
          setError("password", {
            message: isEn ? "invalid password" : "كلمه السر خاطئه",
          });
        }
      } else {
        setError("userName", {
          message: isEn ? "user not found" : "اسم المستخدم غير موجود",
        });
      }
    } catch (err) {
      setError("root", { message: err as string });
    }
  };

  // show icon button
  const ShowButton = isEn ? InputRightElement : InputLeftElement;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      minH={["unset", "100vh"]}
      bgGradient="linear(to-b, third, main)"
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
            {isEn ? "Log In" : "تسجيل الدخول"}
          </Heading>

          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image src={mushaf} alt="img" w={"150px"}></Image>
          </Flex>
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
              <FormLabel color="whitesmoke">
                {isEn ? "username" : "اسم المستخدم"}
              </FormLabel>
              <Input
                {...register("userName")}
                focusBorderColor="sec.500"
                color="whitesmoke"
                type="text"
                placeholder={isEn ? "username" : "اسم المستخدم"}
              />
              <FormHelperText hidden={!!errors.userName} color={"gray.300"}>
                {isEn ? "enter your username." : "ادخل اسم المستخدم."}
              </FormHelperText>
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            {/* password */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel color="whitesmoke">
                {" "}
                {isEn ? "Password" : "كلمه السر"}
              </FormLabel>
              <InputGroup size="md">
                <Input
                  {...register("password")}
                  pl={!isEn ? "6rem" : "1rem"}
                  pr={isEn ? "3rem" : "1rem"}
                  type={showPassword ? "text" : "password"}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  placeholder={isEn ? "Password" : "كلمه السر"}
                />
                <ShowButton width="3rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FiEye /> : <FiEyeOff />}
                    aria-label={isEn ? "show password" : " عرض كلمه السر"}
                    variant={"text"}
                    color={"white"}
                  />
                </ShowButton>
              </InputGroup>
              <FormHelperText hidden={!!errors.password} color={"gray.300"}>
                {isEn ? "enter your password." : "ادخل كلمه السر"}
              </FormHelperText>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            {/* remmber me */}

            <Checkbox
              {...register("remmberMe")}
              colorScheme="sec"
              color="whitesmoke"
              alignSelf={"start"}
            >
              {isEn ? "Remmber Me" : "تذكرني"}
            </Checkbox>

            {/* root error */}

            <FormControl isInvalid={!!errors.root}>
              <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
            </FormControl>

            {/* LogIn */}

            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText={isEn ? "logging in" : "جاري تسجيل الدخول"}
              colorScheme="sec"
              w={"100%"}
              rounded={9999}
              color={"black"}
            >
              {isEn ? "Log In" : "تسجيل الدخول"}
            </Button>
          </Flex>
        </CardBody>

        <hr />

        <CardFooter>
          <Text color={"white"} textAlign={"center"} w={"100%"}>
            {isEn ? "don't have an account?" : "ليس لديك حساب؟"}{" "}
            <Text
              as={Link}
              _hover={{ color: "sec.700" }}
              to={"/signup"}
              color="sec.400"
            >
              {isEn ? "signup" : "انشاء حساب"}
            </Text>{" "}
            {isEn ? "now!" : "الان!"}
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default LogIn;
