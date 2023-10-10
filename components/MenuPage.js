export class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'});

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCss() {
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }

    loadCss();
  }

  // when component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById('menu-page-template');
    const clonedTemplate = template.content.cloneNode(true);
    this.root.appendChild(clonedTemplate);

    window.addEventListener("appmenuchange", () => {
      this.render();
    })
    this.render();
  }

  render() {
    if (!app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "Loading...";
      return;
    }

    this.root.querySelector("#menu").innerHTML = "";

    for (let category of app.store.menu) {
      const liCategory = document.createElement("li");
      liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class='category'>
        </ul>
      `
      this.root.querySelector("#menu").appendChild(liCategory);

      category.products.forEach(product => {
        const item = document.createElement("product-item");
        item.dataset.product = JSON.stringify(product);
        liCategory.querySelector("ul").appendChild(item);
      });
    }
  }
}

customElements.define("menu-page", MenuPage);
