import { addToCart } from "../services/Order.js";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
    // not creating shadow dom!
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const templateClone = template.content.cloneNode(true);

    this.appendChild(templateClone);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("p.price").textContent = `$ ${product.price.toFixed(2)}`;
    this.querySelector("img").src = `data/images/${product.image}`;
    this.querySelector("a").addEventListener("click", event => {
      console.log(event.target.tagName);
      if (event.target.tagName.toLowerCase() === "button") {
        // event.target equlals 'button'
        // event.currentTarget equlals 'a'
        addToCart(product.id); 

      } else {
        app.router.go(`/product/${product.id}`);
      }
      event.preventDefault();
    })
  }
}

customElements.define("product-item", ProductItem);
