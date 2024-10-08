import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {clearCart, getCart, getTotalPrice} from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import {formatCurrency} from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority? totalCartPrice * 0.2 : 0 ;
  const totalPrice = totalCartPrice + priorityPrice ;

  const dispatch = useDispatch();


  
  const {username, status: addressStatus, position, address, error: addressError} = useSelector((state)=> state.user)
  const isLoadingAddress = addressStatus === "loading";

  const cart = useSelector(getCart);
  if(!cart.length) return <EmptyCart/>;

  return (
    <div className="py-6 px-4">
      <h2 className="font-semibold tracking-widest text-xl mb-8">Ready to order? Let's go!</h2>

      <Form method="post">
        <div className="flex flex-col mb-4 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input className="input w-full" type="text" name="customer" required defaultValue={username} />
          </div>
        </div>

        <div className="flex flex-col mb-5 sm:flex-row sm:items-center gap-2  ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p className=" text-red-700 bg-red-100 input rounded-medium mt-2 text-xs p-2">{formErrors.phone}</p> }
        </div>

        <div className="flex flex-col mb-4 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
            <div className="grow relative">
          {!position.latitude && !position.longtitude &&
              (<span className="absolute z-50 right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
                  <Button type="small" disabled={isLoadingAddress} 
                    onClick={(e)=>{
                      e.preventDefault();
                      dispatch(fetchAddress())}
                    }
                    >get position</Button>
              </span>)
            }
              <input className="input w-full" type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required />
              {addressStatus === "error" && <p className=" text-red-700 bg-red-100 input rounded-medium mt-2 text-xs p-2">{addressError}</p> }
            </div>
        </div>

        <div className="flex gap-2 mb-6">
          <input
          className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400  transition-all duration-300 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium mb-3" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ?`${position.latitude}, ${position.longitude}` : "" } />

          <Button type="primary"  disabled={isSubmitting}> {isSubmitting || isLoadingAddress? `Placing Order`: `Order now for${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  const errors = {};

  if(! isValidPhone(order.phone)) errors.phone = 'please enter correct phone number as we might need to contact you 🙂';

  if(Object.keys(errors).length> 0) return errors;
  
  const newOrder = await createOrder(order);

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
