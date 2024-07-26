import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";


const Header =() => {
    return(
        <header className=" flex justify-between items-center bg-yellow-400 upperCase border-b border-stone-200 px-4 sm:px-6 py-3">
            <Link to="/" className="tracking-widest font-huge ">
                Fast Pizza CO.
            </Link>  
            <SearchOrder/>
            <Username/>
        </header>
    )
}

export default Header ;