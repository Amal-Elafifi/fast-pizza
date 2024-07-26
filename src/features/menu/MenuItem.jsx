import { formatCurrency } from "../../utilities/helpers";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const itemCurrentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = itemCurrentQuantity > 0;
  const dispatch = useDispatch();

  

  function handleAddToCart(){
    const newItem ={ 
                pizzaId: id,
                name,
                quantity: 1,
                unitPrice,
                totalPrice: unitPrice * 1
              }
    dispatch(addItem(newItem));
    
  }


  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut? 'opacity-70 grayscale': ''}`}  src={imageUrl} alt={name} />
      <div className="flex flex-col grow pt-.5">
        <p className="uppercase font-medium">{name}</p>
        <p className="italic capitalize text-sm text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> :
            <p className="text-sm font-medium text-stone-500">Sold out</p>}

      {isInCart && <div className="flex items-center gap-2 md:gap-4 text-sm font-semibold">
          <UpdateItemQuantity pizzaId={id} currentQuantity={itemCurrentQuantity}/>
          <DeleteItem pizzaId={id}/>
        </div>
      }
        {!soldOut  && !isInCart && ( <Button type="small" onClick={handleAddToCart}> add to cart </Button> )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
