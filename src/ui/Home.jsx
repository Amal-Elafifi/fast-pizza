import { useSelector } from "react-redux";

import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state)=> state.user.userName);

  return (
    <div className=" px-4 my-10 sm:my-16 text-center">
      <h1 className="mb-8 text-xl  md:text-3xl font-semibold text-stone-800 ">
        The best pizza.
        <br/>
        <span className="text-xl font-semibold text-yellow-500 text-center">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === ''? <CreateUser/>: <Button type="primary" to="/menu">continue ordering, {username}</Button>}
        
    </div>
  );
}

export default Home;
