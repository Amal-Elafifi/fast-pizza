import { useSelector } from "react-redux";

function Username(){
    const Username = useSelector(state=>state.user.userName)

    if(!Username)return;

    return <div className=" hidden md:block text-sm font-semibold">
        {Username}
    </div>
}

export default Username ;