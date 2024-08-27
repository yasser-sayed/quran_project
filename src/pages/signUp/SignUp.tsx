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
  Checkbox,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { TSignUpSchema, createSignUpSchema } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import { getUsers } from "../../state-management/fetchingDataSlices/usersSlice";
import { addUser } from "../../state-management/fetchingDataSlices/userApis";

const SignUp = () => {
  const { isEn } = useAppSelector((state) => state.settings);
  const signUpSchema = createSignUpSchema(isEn);
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
              age: data.age,
              gender: data.gender,
              likedReciters: [],
              lastPlayed: [],
              playLists: {},
            })
          ).unwrap();

          navigate("/login");
        } catch (err) {
          setError("root", { message: err as string });
        }
      } else {
        setError("userName", {
          message: isEn
            ? "userName is already used"
            : "اسم المستخدم موجود بالفعل",
        });
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
      bgGradient="linear(to-b, third, main)"
      className="col-span-full"
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
            {isEn
              ? "Sign up to start listening"
              : "انشئ حساب للبدأ في الاستماع"}
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
                <FormLabel color="whitesmoke">
                  {isEn ? "first name" : "الاسم الاول"}
                </FormLabel>
                <Input
                  {...register("firstName")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder={isEn ? "first name" : "الاسم الاول"}
                />
                <FormHelperText hidden={!!errors.firstName} color={"gray.300"}>
                  {isEn ? "enter your first name." : "ادخل اسمك الاول."}
                </FormHelperText>
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              {/* last name  */}
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel color="whitesmoke">
                  {isEn ? "last name" : "الاسم الاخير (العائله)"}
                </FormLabel>
                <Input
                  {...register("lastName")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder={isEn ? "last name" : "الاسم الاخير (العائله)"}
                />
                <FormHelperText hidden={!!errors.lastName} color={"gray.300"}>
                  {isEn ? "enter your last name." : "ادخل اسم العائله."}
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

              {/* email  */}
              <FormControl isInvalid={!!errors.email}>
                <FormLabel color="whitesmoke">
                  {isEn ? "email" : "ايميل"}
                </FormLabel>
                <Input
                  {...register("email")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="text"
                  placeholder={isEn ? "email" : "ايميل"}
                />
                <FormHelperText hidden={!!errors.email} color={"gray.300"}>
                  {isEn ? "enter your email." : "ادخل ايميلك."}
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
                <FormLabel color="whitesmoke">
                  {isEn ? "Password" : "كلمه السر"}
                </FormLabel>
                <Input
                  {...register("password")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="password"
                  placeholder={isEn ? "Password" : "كلمه السر"}
                />
                <FormHelperText hidden={!!errors.password} color={"gray.300"}>
                  {isEn ? "choose a strog password." : "اختار كلمه سر قويه."}
                </FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              {/* confirm password */}
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel color="whitesmoke">
                  {isEn ? "confirm Password" : "تاكيد كلمه السر"}
                </FormLabel>
                <Input
                  {...register("confirmPassword")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  type="password"
                  placeholder={isEn ? "confirm Password" : "تاكيد كلمه السر"}
                />
                <FormHelperText
                  hidden={!!errors.confirmPassword}
                  color={"gray.300"}
                >
                  {isEn ? "confirm your password." : "اعد كتابه كلمه المرور."}
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
                <FormLabel color="whitesmoke">
                  {isEn ? "gender" : "النوع"}
                </FormLabel>
                <Select
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  {...register("gender")}
                >
                  <option
                    className="!bg-[#2A2A2A]  text-gray-300"
                    value={"male"}
                  >
                    {isEn ? "male" : "ذكر"}
                  </option>
                  <option
                    className="!bg-[#2A2A2A]  text-gray-300"
                    value={"female"}
                  >
                    {isEn ? "female" : "انثي"}
                  </option>
                  <option
                    className="!bg-[#2A2A2A]  text-gray-300"
                    value={"other"}
                  >
                    {isEn ? "other" : "اخر"}
                  </option>
                </Select>

                <FormHelperText color={"gray.300"} hidden={!!errors.gender}>
                  {isEn ? "choose your gender." : "اختر نوعك."}
                </FormHelperText>
                <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
              </FormControl>

              {/*  age */}
              <FormControl isInvalid={!!errors.age}>
                <FormLabel color="whitesmoke">
                  {isEn ? "age" : "العمر"}
                </FormLabel>
                <Input
                  type="number"
                  {...register("age")}
                  focusBorderColor="sec.500"
                  color="whitesmoke"
                  defaultValue={"7"}
                />

                <FormHelperText color={"gray.300"} hidden={!!errors.age}>
                  {isEn ? "choose your age." : "اختر غمرك"}
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
                {isEn ? "accept all terms" : "الموافقه علي الشروط والاحكام"}
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
              loadingText={isEn ? "signing Up" : " جاري انشاء حساب"}
              colorScheme="sec"
              w={"100%"}
              rounded={9999}
              color={"black"}
            >
              {isEn ? "Sign Up" : "انشاء حساب"}
            </Button>
          </Flex>
        </CardBody>

        <hr />

        <CardFooter>
          <Text color={"white"} textAlign={"center"} w={"100%"}>
            {isEn ? "already have an account?" : "لديك حساب بالفعل؟"}{" "}
            <Text
              as={Link}
              _hover={{ color: "sec.700" }}
              to={"/login"}
              color="sec.400"
            >
              {isEn ? "login" : "سجل الدخول"}
            </Text>{" "}
            {isEn ? "now!" : "الان!"}
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default SignUp;
