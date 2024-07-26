// Test ID: IIDSAT
import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";
// import Cart from "../cart/Cart";



function Order() {
  const order = useLoaderData()
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(()=>{
    if(!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher])

  return (
    <div className="py-6 px-4 space-y-4">
      <div className="flex items-center justify-between flex-wrap pb-5">
        <h2 className="font-semibold text-xl tracking-widest"> Order# {id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-600 rounded-full text-stone-100 uppercase px-4 py-2 font-medium">Priority</span>}
          <span className="bg-green-600 rounded-full uppercase text-stone-100 px-4 py-2 font-medium">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-stone-200  px-6 py-5">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs font-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="pt-2 divide-y divide-stone-200 border-b border-t border-stone-200">
          {cart.map(item=> <OrderItem item={item} key={item.pizzaId} 
                            ingredients={fetcher.data?.find(ele => ele.id === item.pizzaId)?.ingredients ?? []}
                            isLoadingIngredients={fetcher.state}
                            />)}
      </ul>



      <div className="bg-stone-200 px-6 py-5 space-y-2 ">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority?<UpdateOrder order={order}/>: ""}
    </div>
  );
}

export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
