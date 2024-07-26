import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { clearCart, getCart } from './cartSlice';
import CartItem from './CartItem';
import EmptyCart from "./EmptyCart";
import { getUserName } from '../user/userSlice';


function Cart() {
  const cart = useSelector(getCart);;
  const username = useSelector(getUserName);
  const dispatch = useDispatch();

  if(!cart.length)return <EmptyCart/>

  return (
    <div className="py-4 px-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-5 font-semibold text-xl tracking-widest">Your cart, {username}</h2>
      
      <ul className="mt-6 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map(item => <CartItem item ={item} key={item.pizzaId}/>)}
      </ul>

      <div className="mt-4 space-x-2">
        <Button type="primary">
          <Link to="/order/new">Order pizzas</Link>
        </Button>
        <Button type="secondary" onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
