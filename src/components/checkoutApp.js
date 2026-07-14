import {
  buildCheckoutPayload,
  clearCart,
  formatMoney,
  getCart,
  getCartCount,
  getTotals,
} from './cartStore.js'
import { icon } from './icons.js'
import { escapeHtml, setupFloatingTelegramButton, setupFloatingWhatsAppButton, setupRevealTransitions, setupSmartsuppWidget, submitFormspree } from './utils.js'

function cartSummaryItems(items) {
  if (!items.length) {
    return '<p class="empty-summary">Your cart is currently empty.</p>'
  }

  return items
    .map(
      (item) => `
      <article class="checkout-item-row">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
        <div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>Qty: ${item.quantity}</p>
          <p class="checkout-item-price">${formatMoney(item.price)}</p>
        </div>
      </article>
    `
    )
    .join('')
}

function checkoutTemplate(content, cart, statusMessage = '') {
  const totals = getTotals(cart)
  const disabled = cart.length === 0

  return `
    <div class="site-wrap checkout-wrap">
      <header class="site-header full-bleed content-shell">
        <a class="brand" href="/" aria-label="Back to home">
          <img src="${escapeHtml(content.brand.logo)}" alt="Dr. William Makis logo" class="brand-logo" />
          <span class="brand-text">Dr. William <strong>Makis</strong></span>
        </a>
        <div class="header-actions">
          <a class="icon-button" href="/" aria-label="Back to website">${icon('arrowLeft')}</a>
          <a class="icon-button cart-open" href="/" aria-label="Return to cart drawer">
            ${icon('cart')}
            <span class="cart-count">${getCartCount(cart)}</span>
          </a>
        </div>
      </header>

      <main class="checkout-main">
        <section class="section-panel checkout-panel content-shell">
          <h1>Checkout</h1>

          <form class="checkout-form" id="checkout-form" action="https://formspree.io/f/xlgqdnnw" method="POST" novalidate>
            <article class="form-card">
              <h2>Customer Information</h2>
              <label>
                Full Name *
                <input type="text" name="fullName" placeholder="John Doe" required autocomplete="name" />
              </label>
              <label>
                Email Address *
                <input type="email" name="email" placeholder="john@example.com" required autocomplete="email" />
              </label>
              <label>
                Phone Number
                <input type="tel" name="phone" placeholder="+1 234 567 8900" autocomplete="tel" />
              </label>
              <label>
                Shipping Address
                <input type="text" name="shippingAddress" placeholder="123 Main St, City, Country" autocomplete="street-address" />
              </label>
            </article>

            <article class="form-card muted-card">
              <h2>Select Payment Method</h2>
              <div class="payment-empty-state">
                <span class="payment-icon">${icon('cart')}</span>
                <p>${escapeHtml(content.misc.noPaymentMethods)}</p>
              </div>
            </article>

            <article class="form-card">
              <h2>Order Summary</h2>
              <div class="checkout-item-list">
                ${cartSummaryItems(cart)}
              </div>
              <div class="totals-block">
                <div class="summary-row"><span>Subtotal</span><strong>${formatMoney(totals.subtotal)}</strong></div>
                <div class="summary-row"><span>Shipping</span><strong>Free</strong></div>
                <div class="summary-row total"><span>Total</span><strong>${formatMoney(totals.total)}</strong></div>
              </div>

              <button class="btn btn-primary block" type="submit" ${disabled ? 'disabled' : ''}>Place Order</button>
              <p class="footnote">${escapeHtml(content.misc.placeOrderNote)}</p>
              ${statusMessage ? `<p class="form-status">${escapeHtml(statusMessage)}</p>` : ''}
            </article>
          </form>
        </section>
      </main>
    </div>
  `
}

function emailLooksValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function mountCheckoutApp(root, content) {
  let message = ''

  function render(nextMessage = '') {
    message = nextMessage
    const cart = getCart()
    root.innerHTML = checkoutTemplate(content, cart, message)

    setupRevealTransitions(root)
    setupFloatingTelegramButton(content.contact)
    setupFloatingWhatsAppButton('12495763746')
    

    const form = root.querySelector('#checkout-form')
    if (!form) return

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const currentCart = getCart()
      if (!currentCart.length) {
        render('Your cart is empty. Add products or protocols before placing an order.')
        return
      }

      const formData = new FormData(form)
      const customer = {
        fullName: String(formData.get('fullName') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        shippingAddress: String(formData.get('shippingAddress') || '').trim(),
      }

      if (!customer.fullName || !customer.email) {
        render('Please provide Full Name and Email Address.')
        return
      }

      if (!emailLooksValid(customer.email)) {
        render('Please enter a valid email address.')
        return
      }

      const submitButton = form.querySelector('button[type="submit"]')
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true
        submitButton.textContent = 'Submitting...'
      }

      try {
        const payload = buildCheckoutPayload(customer, currentCart)
        const clientTotals = getTotals(currentCart)

        // Server-side validation: validate cart prices before submission
        const validationResponse = await fetch('/.netlify/functions/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _validationOnly: true, // Tell server this is just validation
          }),
        })

        if (!validationResponse.ok) {
          const error = await validationResponse.json().catch(() => null)
          throw new Error(error?.message || 'Cart validation failed. Please refresh and try again.')
        }

        const validated = await validationResponse.json()
        
        // Verify the server-validated totals match what the client claims
        // This prevents price manipulation
        const serverTotal = validated.totals?.total
        if (typeof serverTotal !== 'number' || serverTotal <= 0) {
          throw new Error('Invalid cart data. Please refresh and try again.')
        }

        await submitFormspree(form, {
          formType: 'checkout-order',
          checkoutPayload: JSON.stringify({
            ...payload,
            totals: validated.totals, // Use server-validated totals
          }),
          cartItemCount: currentCart.length,
          cartTotal: serverTotal, // Use server-validated total
          validatedAt: validated.submittedAt,
        })

        clearCart()
        form.reset()
        render('Order request submitted successfully. We will contact you soon.')
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to submit your order request right now. Please try again.'
        render(message)
      }
    })
  }

  render()
}
