import { useDispatch, useSelector } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  CartItem
} from '../redux/slices/cartSlice';
import { 
  selectCartItems, 
  selectCartTotalQuantity, 
  selectCartTotalAmount 
} from '../redux/selectors/cartSelectors';
import { Product } from '../types/product';

export const useCart = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);
  
  const addItemToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  
  const removeItemFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  
  const increaseItemQuantity = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };
  
  const decreaseItemQuantity = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };
  
  const emptyCart = () => {
    dispatch(clearCart());
  };
  
  return {
    cartItems,
    totalQuantity,
    totalAmount,
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    emptyCart,
  };
}; 