import { Button } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const handleClick = async () => {
    const data = await axios({
      method: "post",
      url: "http://localhost:300ss0/users",
      data: {
        dataName: "Hesham",
        lastName: "Khalil",
        userName: "Luka2023",
        email: "heshamkhalil1988@gmail.com",
        password: "123456",

        favList: [],
      },
    });

    console.log(data);
  };

  return (
    <div className="items-center justify-center flex h-screen">
      <Button onClick={handleClick}>post</Button>
    </div>
  );
};

export default Home;
