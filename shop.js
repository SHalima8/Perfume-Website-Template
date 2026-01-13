document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById('quantity');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const minusBtn = document.querySelector('.quantity-btn.minus');

  if (!quantityInput || !plusBtn || !minusBtn) {
    console.error('One or more elements not found:', { quantityInput, plusBtn, minusBtn });
    return;
  }

  plusBtn.addEventListener('click', function () {
    let current = parseInt(quantityInput.value);
    if (current < parseInt(quantityInput.max)) {
      quantityInput.value = current + 1;
    }
  });

  minusBtn.addEventListener('click', function () {
    let current = parseInt(quantityInput.value);
    if (current > parseInt(quantityInput.min)) {
      quantityInput.value = current - 1;
    }
  });
});


const cart = [];
const cartPanel = document.getElementById('cart-panel');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');

function updateCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerText = `${item.name} x ${item.quantity} = $${item.price * item.quantity}`;
    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  cartTotalSpan.innerText = total.toFixed(2);
}

document.querySelector('.add-to-cart').addEventListener('click', () => {
  const productName = document.querySelector('.rightside h2').innerText;
  const price = parseFloat(document.querySelector('.discounted-price').innerText.replace('$', ''));
  const quantity = parseInt(document.getElementById('quantity').value);

  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name: productName, price, quantity });
  }

  updateCart();
  cartPanel.classList.remove('hidden');
  cartPanel.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
  cartPanel.classList.remove('show');
  cartPanel.classList.add('hidden');
});

const checkoutPage = document.getElementById('checkout-page');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');

document.getElementById('checkout-btn').addEventListener('click', () => {
  localStorage.setItem('cartData', JSON.stringify(cart));
  window.location.href = 'checkout.html'; 
});

    const menuToggle = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.nav-container');

  menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('open');
  });

