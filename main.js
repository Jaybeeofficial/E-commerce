const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (hamburger.textContent === "☰") {
      hamburger.textContent = "✖";
    } else {
      hamburger.textContent = "☰";
    }
  });



  // const openCart = document.getElementById("openCart");
  // const closeCart = document.getElementById("closeCart");
  // const cartSidebar = document.getElementById("cartSidebar");
  // const cartOverlay = document.getElementById("cartOverlay");

  // openCart.addEventListener("click", () => {
  //   cartSidebar.classList.add("active");
  //   cartOverlay.classList.add("active");
  // });

  // closeCart.addEventListener("click", () => {
  //   cartSidebar.classList.remove("active");
  //   cartOverlay.classList.remove("active");
  // });

  // cartOverlay.addEventListener("click", () => {
  //   cartSidebar.classList.remove("active");
  //   cartOverlay.classList.remove("active");
  // });

// --- 1. Sidebar Selectors ---
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

// --- 2. Product Page Selectors ---
const addToCartBtn = document.getElementById("addToCart");
const qtyInput = document.getElementById("quantity");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const mainImage = document.getElementById("mainImage");
const cartBody = document.getElementById("cartBody"); // Target the body you defined

// --- 3. Sidebar Toggle Logic ---
openCart?.addEventListener("click", () => {
    renderCart(); 
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
});

closeCart?.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

cartOverlay?.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

// --- 4. Quantity Button Logic ---
document.getElementById("increaseQty")?.addEventListener("click", () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
});

document.getElementById("decreaseQty")?.addEventListener("click", () => {
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
});

// --- 5. Add to Cart Logic (FIXED) ---
addToCartBtn?.addEventListener("click", () => {
    // 1. Pull the LATEST cart from localStorage first
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const priceValue = parseFloat(productPrice.innerText.replace(/[^0-9.]/g, ''));
    
    const productToAdd = {
        name: productTitle.innerText,
        price: priceValue,
        image: mainImage.src,
        quantity: parseInt(qtyInput.value)
    };

    // 2. Check if item exists
    const existingItem = cart.find(item => item.name === productToAdd.name);
    if (existingItem) {
        existingItem.quantity += productToAdd.quantity;
    } else {
        cart.push(productToAdd);
    }

    // 3. SAVE TO LOCAL STORAGE (Crucial Step!)
    localStorage.setItem("cart", JSON.stringify(cart));

    // 4. Update UI and Open
    renderCart();
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
});

// --- 6. GLOBAL CART LOGIC ---
function renderCart() {
    const cartBody = document.getElementById("cartBody");
    if (!cartBody) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-text">Shopping bag is empty</p>';
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        html += `
            <div style="display:flex; gap:15px; margin-bottom:20px; align-items:center; border-bottom:1px solid #eee; padding-bottom:10px;">
                <img src="${item.image}" width="60" height="60" style="object-fit:cover;">
                <div style="flex:1;">
                    <h4 style="margin:0; font-size:14px;">${item.name}</h4>
                    <p style="margin:5px 0; font-size:12px;">${item.quantity} x $${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="cursor:pointer; background:none; border:none; color:red; font-size:18px;">&times;</button>
            </div>
        `;
    });

    html += `<div style="text-align:right; font-weight:bold; padding-top:10px;">Total: $${total.toFixed(2)}</div>`;
    cartBody.innerHTML = html;
}

window.removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};

document.addEventListener("DOMContentLoaded", renderCart);




document.querySelectorAll(".custom-title").forEach(title => {

  title.addEventListener("click", function () {

    const submenu = this.parentElement.querySelector(".custom-sub");

    if(submenu.style.display === "block"){
      submenu.style.display = "none";
    }else{
      submenu.style.display = "block";
    }

  });

});