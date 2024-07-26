import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const totalPizzaQuantity = useSelector(getTotalQuantity);
  const totalPizzaPrice = useSelector(getTotalPrice);

  if(!totalPizzaQuantity)return null;

  return (
    <div className="flex justify-between items-center p-4 bg-stone-800 uppercase text-stone-200 sm:px-6 text-sm md:text-base">
      <p  className=" space-x-4 sm:space-6 text-stone-300 font-semibold">
        <span>{totalPizzaQuantity} pizzas</span>
        <span>{formatCurrency(totalPizzaPrice)}</span>
      </p>
      <Link to="/cart" className="text-stone-200" >Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
