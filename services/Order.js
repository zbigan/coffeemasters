import { getProductById } from "./Menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);
  const result = app.store.cart.filter(prodInCart => Number(prodInCart.product.id) === Number(id));
  if (result.length==1) {
    // Product already in cart
    // update the current item
    app.store.cart = app.store.cart.map(p => p.product.id == id ? { ...p, quantity: p.quantity + 1} : p); 
  } else {
    app.store.cart = [...app.store.cart, {product, quantity: 1}];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(p => p.product.id != id);
}
