import {useSelector} from "react-redux";

import {formatCurrency} from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import {getCurrentQuantityById} from "./cartSlice"

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="mb-3 flex justify-between items-center">
      <p className="font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center gap-3">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
