import './styles/main.css'
import {
  addToCart,
  clearCart,
  createProductCartItem,
  formatMoney,
  getCart,
  getCartCount,
  getTotals,
  removeFromCart,
  updateQuantity,
} from './components/cartStore.js'
import { icon } from './components/icons.js'
import {
  escapeHtml,
  focusTrap,
  scrollLock,
  setupFloatingTelegramButton,
  setupFloatingWhatsAppButton,
  setupRevealTransitions,
  setupSmartsuppWidget,
  submitConsultationRequest,
} from './components/utils.js'
import { SITE_CONTENT } from './data/content.js'

const FOOTER_SECTION_MAP = {
  services: {
    'Cancer Diagnostics': 'expertise',
    'Treatment Programs': 'protocols',
    'Clinical Trials': 'research',
    'Second Opinions': 'contact',
  },
  resources: {
    'Patient Portal': 'contact',
    'Research Publications': 'research',
    'Insurance & Billing': 'contact',
    FAQs: 'contact',
  },
  about: {
    'Our Team': 'expertise',
    Facilities: 'contact',
    Careers: 'contact',
    'Contact Us': 'contact',
  },
  legal: {
    'Privacy Policy': 'footer',
    'Terms of Service': 'footer',
    'HIPAA Compliance': 'footer',
  },
}


const TELEGRAM_UPDATE_URL = 'https://t.me/drwilliammakisofficial'
const TELEGRAM_UPDATE_LABEL = 'Ivermectin Update'

function telegramUpdateCtaTemplate(className = '', includeNavLink = false) {
  const classes = ['telegram-update-cta', className].filter(Boolean).join(' ')
  const navLinkAttribute = includeNavLink ? ' data-nav-link' : ''
  return `<a class="${classes}" href="${TELEGRAM_UPDATE_URL}" target="_blank" rel="noopener noreferrer"${navLinkAttribute}>${icon(
    'telegram'
  )}<span>${escapeHtml(TELEGRAM_UPDATE_LABEL)}</span></a>`
}

function footerListTemplate(items, group, hrefPrefix = '/') {
  const sectionMap = FOOTER_SECTION_MAP[group] || {}
  return items
    .map((item) => {
      const section = sectionMap[item] || 'contact'
      return `<li><a href="${hrefPrefix}#${section}">${escapeHtml(item)}</a></li>`
    })
    .join('')
}

function footerLegalTemplate(items, hrefPrefix = '/') {
  const sectionMap = FOOTER_SECTION_MAP.legal
  return items
    .map((item) => {
      const section = sectionMap[item] || 'footer'
      return `<a href="${hrefPrefix}#${section}">${escapeHtml(item)}</a>`
    })
    .join('')
}

function getStableReviewCount(seed) {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }
  return 50 + (hash % 251)
}

function ratingTemplate(seed) {
  const reviewCount = getStableReviewCount(seed)
  return `
    <div class="supplement-rating" aria-label="Rated 4 out of 5 stars with ${reviewCount} reviews">
      <span class="supplement-stars" aria-hidden="true">
        <span class="rating-star is-filled">&#9733;</span>
        <span class="rating-star is-filled">&#9733;</span>
        <span class="rating-star is-filled">&#9733;</span>
        <span class="rating-star is-filled">&#9733;</span>
        <span class="rating-star is-empty">&#9733;</span>
      </span>
      <span class="supplement-rating-count">(${reviewCount})</span>
    </div>
  `
}

function supplementCardTemplate(supplement) {
  const stockBadgeClass = supplement.inStock ? 'easy' : 'advanced'
  const stockText = supplement.inStock ? 'In Stock' : 'Out of Stock'

  return `
    <article class="protocol-card supplement-card">
      <div class="protocol-header">
        <h3>${escapeHtml(supplement.name)}</h3>
        <p class="protocol-subtitle">${escapeHtml(supplement.subtitle || 'Premium Supplement')}</p>
      </div>
      <div class="protocol-body">
        <div class="supplement-image-placeholder">
          <img src="${escapeHtml(supplement.image)}" alt="${escapeHtml(supplement.name)} placeholder" class="supplement-placeholder-visual" loading="lazy" />
          <span class="supplement-image-label">In Stock</span>
        </div>
        ${ratingTemplate(supplement.id)}
        <p class="protocol-description">${escapeHtml(supplement.shortDescription)}</p>
        <div class="protocol-details">
          <div class="detail-item duration-row">
            ${icon('clock')}
            <span class="duration-text">${escapeHtml(supplement.duration || '30 Days')}</span>
          </div>
          <div class="detail-item">
            <span class="difficulty-badge ${stockBadgeClass}">${stockText}</span>
          </div>
          <div class="detail-item price-row">
            <span class="protocol-price">${formatMoney(supplement.price)}</span>
          </div>
        </div>
        <div class="protocol-actions">
          <button class="btn btn-secondary detail-eye-btn" data-open-product="${escapeHtml(supplement.id)}" aria-label="View ${escapeHtml(supplement.name)} details">
            ${icon('eye')}
          </button>
          <button class="btn btn-primary" data-quick-add-product="${escapeHtml(supplement.id)}" aria-label="Add ${escapeHtml(supplement.name)} to cart">
            ${icon('cart')} Add
          </button>
        </div>
      </div>
    </article>
  `
}
function paginationTemplate(currentPage, totalPages) {
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1
    const activeClass = page === currentPage ? 'is-active' : ''
    const ariaCurrent = page === currentPage ? 'aria-current="page"' : ''
    return `<button class="pagination-number ${activeClass}" data-page-number="${page}" ${ariaCurrent}>${page}</button>`
  }).join('')

  return `
    <div class="pagination-controls">
      <button class="pagination-button pagination-prev" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>&lt; Previous</button>
      <div class="pagination-numbers">
        ${pageButtons}
      </div>
      <button class="pagination-button pagination-next" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>Next &gt;</button>
    </div>
    <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
  `
}

function mobileQuickActionsTemplate() {
  return `
    <div class="mobile-drawer-actions" aria-label="Quick actions">
      <button class="btn btn-secondary btn-mobile-drawer patient-portal" aria-label="Open patient portal">
        Patient Portal
      </button>
      <button class="btn btn-primary btn-mobile-drawer book-consultation" aria-label="Book a consultation" data-open-consultation>
        Book Consultation
      </button>
      ${telegramUpdateCtaTemplate('telegram-update-cta--drawer btn-mobile-drawer', true)}
    </div>
  `
}

function renderSupplementsLayout(content) {
  const { brand, contact, supplementsPage, supplements } = content
  const productsPerPage = 9
  const totalPages = Math.max(1, Math.ceil(supplements.length / productsPerPage))

  return `
    <div class="site-wrap">
      <header class="site-header full-bleed content-shell">
        <a class="brand" href="/" aria-label="Dr. William Makis home">
          <img src="${escapeHtml(brand.logo)}" alt="Dr. William Makis logo" class="brand-logo" />
          <span class="brand-text">Dr. William <strong>Makis</strong></span>
        </a>
        
        <!-- Main Navigation -->
        <nav class="main-nav" aria-label="Main navigation">
          <a href="/#expertise" class="nav-link">Expertise</a>
          <a href="/#protocols" class="nav-link">Protocols</a>
          <a href="/#process" class="nav-link">Process</a>
          <a href="/#testimonials" class="nav-link">Testimonials</a>
          <a href="/#research" class="nav-link">Research</a>
          <a href="/#credentials" class="nav-link">Achievements</a>
        </nav>

        <div class="header-actions" aria-label="Site controls">
          <!-- Language Selector -->
          <button class="language-selector" aria-label="Select language">
            <span class="language-text">US EN</span>
            ${icon('chevronDown')}
          </button>
          
          <!-- Shopping Cart -->
          <button class="icon-button cart-open" aria-label="Open cart" data-open-cart>
            ${icon('cart')}
            <span class="cart-count js-cart-count" aria-live="polite">0</span>
          </button>
          
          <!-- Patient Portal -->
          <button class="btn btn-secondary patient-portal" aria-label="Open patient portal">Patient Portal</button>
          
          <!-- Book Consultation -->
          <button class="btn btn-primary book-consultation" aria-label="Book a consultation" data-open-consultation>
            Book Consultation
          </button>
          
          <!-- Mobile Menu Button -->
          <button class="icon-button" aria-label="Open menu" data-open-nav>${icon('menu')}</button>
        </div>
      </header>

      <main id="top">
        <section class="hero-section section-panel content-shell" id="supplements-hero">
          <div class="hero-content">
            <h1>${escapeHtml(supplementsPage.hero.title)}</h1>
            <p>${escapeHtml(supplementsPage.hero.subtitle)}</p>
          </div>
        </section>

        <section class="section-panel content-shell" id="products">
          <div class="section-header">
            <div class="search-bar">
              <input type="text" id="searchInput" class="search-input" placeholder="Search supplements..." aria-label="Search supplements">
              <select id="stockFilter" class="difficulty-filter">
                <option value="All">All Stock</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <button class="btn btn-primary apply-filters" data-apply-filters>Apply Filters</button>
              <button class="btn btn-secondary reset-filters" data-reset-filters>Reset</button>
            </div>
          </div>

          <div class="supplements-grid">
            ${supplements.slice(0, productsPerPage).map(supplementCardTemplate).join('')}
          </div>

          <div class="pagination supplements-pagination">
            ${paginationTemplate(1, totalPages)}
          </div>
        </section>
      </main>

      <footer class="site-footer full-bleed content-shell" id="footer">
        <div class="footer-brand">
          <img src="${escapeHtml(brand.logo)}" alt="Dr. Makis" class="brand-logo" />
          <div>
            <h2>Dr. William <strong>Makis</strong></h2>
            <p>${escapeHtml(brand.tagline)}</p>
          </div>
        </div>
        <div class="social-row">
          <a class="icon-button ghost" href="/#contact" aria-label="Facebook">${icon('facebook')}</a>
          <a class="icon-button ghost" href="/#contact" aria-label="Twitter">${icon('twitter')}</a>
          <a class="icon-button ghost" href="/#contact" aria-label="LinkedIn">${icon('linkedin')}</a>
          <a class="icon-button ghost" href="/#contact" aria-label="Instagram">${icon('instagram')}</a>
        </div>
        ${telegramUpdateCtaTemplate('telegram-update-cta--footer')}

        <div class="footer-columns">
          <div>
            <h3>Services</h3>
            <ul>${footerListTemplate(content.footer.services, 'services', '/')}</ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>${footerListTemplate(content.footer.resources, 'resources', '/')}</ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>${footerListTemplate(content.footer.about, 'about', '/')}</ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>${icon('telegram')} <a href="${escapeHtml(contact.telegramUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(contact.telegramHandle)}</a></li>
              <li>${icon('whatsapp')} <a href="https://wa.me/12495763746" target="_blank" rel="noopener noreferrer">+1 (249) 576-3746</a></li>
              <li>${icon('mail')} <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>${escapeHtml(content.footer.copyright)}</p>
          <div class="legal-links">${footerLegalTemplate(content.footer.legal, '/')}</div>
        </div>
      </footer>

    </div>

    <div class="overlay" data-overlay="nav" hidden></div>
    <aside class="side-drawer" data-drawer="nav" aria-hidden="true" aria-label="Navigation menu">
      <button class="icon-button close-btn" data-close-nav aria-label="Close menu">${icon('close')}</button>
      ${mobileQuickActionsTemplate()}
      <nav>
        <a href="/" data-nav-link>Home</a>
        <a href="/supplements.html" data-nav-link>Supplements</a>
        <a href="/protocols.html" data-nav-link>Protocols</a>
        <a href="/#shop" data-nav-link>Shop by Category</a>
        <a href="/#expertise" data-nav-link>Our Expertise</a>
        <a href="/#protocols" data-nav-link>Treatment Protocols</a>
        <a href="/#process" data-nav-link>Our Process</a>
        <a href="/#products" data-nav-link>Cancer Support Products</a>
        <a href="/#videos" data-nav-link>Featured Videos</a>
        <a href="/#credentials" data-nav-link>Professional Certifications</a>
        <a href="/#testimonials" data-nav-link>Stories of Hope & Recovery</a>
        <a href="/#research" data-nav-link>Research & Publications</a>
        <a href="/#contact" data-nav-link>Contact Us</a>
      </nav>
    </aside>

    <div class="overlay" data-overlay="cart" hidden></div>
    <aside class="side-drawer cart-drawer" data-drawer="cart" aria-hidden="true" aria-label="Cart drawer">
      <div class="drawer-head">
        <h2>Your Cart</h2>
        <button class="icon-button close-btn" data-close-cart aria-label="Close cart">${icon('close')}</button>
      </div>
      <div class="drawer-content js-cart-content"></div>
    </aside>

    <div class="overlay" data-overlay="modal" hidden></div>
    <div class="detail-modal" data-modal hidden role="dialog" aria-modal="true" aria-label="Details modal">
      <div class="detail-modal-panel js-modal-content"></div>
    </div>

    <!-- Book Consultation Modal -->
    <div class="overlay" data-overlay="consultation" hidden></div>
    <div class="consultation-modal" data-modal="consultation" hidden role="dialog" aria-modal="true" aria-label="Book a consultation">
      <div class="consultation-modal-panel">
        <button class="icon-button close-btn modal-close" data-close-consultation aria-label="Close consultation form">${icon('close')}</button>
        <div class="modal-header">
          <span class="modal-icon">${icon('calendar')}</span>
          <h2>Book a Consultation</h2>
          <p class="modal-subtitle">Schedule a consultation with Dr. Makis to discuss your treatment options</p>
        </div>
        
        <form class="consultation-form" data-consultation-form action="https://formspree.io/f/xzdjpnbk" method="POST">
          <div class="form-group">
            <label for="fullName">Full Name *</label>
            <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
          </div>
          
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email address">
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number">
          </div>
          
          <div class="form-group">
            <label for="consultationType">Consultation Type *</label>
            <select id="consultationType" name="consultationType" required>
              <option value="">Select a consultation type</option>
              <option value="initial">Initial Consultation</option>
              <option value="follow-up">Follow-up Consultation</option>
              <option value="second-opinion">Second Opinion</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="preferredDate">Preferred Date *</label>
            <input type="date" id="preferredDate" name="preferredDate" required>
          </div>
          
          <div class="form-group">
            <label for="preferredTime">Preferred Time *</label>
            <select id="preferredTime" name="preferredTime" required>
              <option value="">Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="additionalInfo">Additional Information</label>
            <textarea id="additionalInfo" name="additionalInfo" rows="4" placeholder="Please provide any additional information about your condition or questions you may have"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary block">Request Consultation</button>
          </div>
          
          <p class="hipaa-note">
            ${icon('shield')} Your information is protected by HIPAA compliance standards
          </p>
        </form>
      </div>
    </div>
  `
}

function productModalTemplate(product) {
  return `
    <button class="icon-button close-btn modal-close" data-close-modal aria-label="Close details">${icon('close')}</button>
    <div class="modal-product-layout">
      <div class="modal-product-media">
        <video src="/assets/videos/supplements-modal.mp4" autoplay loop muted playsinline class="modal-product-image modal-video" poster="${escapeHtml(product.image)}"></video>
      </div>
      <div class="modal-body modal-product-body">
        <span class="modal-card-eyebrow">Supplement detail</span>
        <h2>${escapeHtml(product.name)}</h2>
        ${ratingTemplate(product.id)}
        <p class="modal-price">${formatMoney(product.price)}</p>
        <p>${escapeHtml(product.description)}</p>

        <div class="trust-row">
          <span>${icon('box')}Quality Tested</span>
          <span>${icon('shield')}Safe & Secure</span>
          <span>${icon('truck')}Fast Shipping</span>
        </div>

        <button class="btn btn-cart block" type="button" data-add-product-cart="${escapeHtml(product.id)}">${icon('cart')}Add to Cart</button>
      </div>
    </div>
  `
}

export function mountSupplementsApp(root, content) {
  root.innerHTML = renderSupplementsLayout(content)

  setupRevealTransitions(root)
  setupFloatingTelegramButton(content.contact)
  setupFloatingWhatsAppButton('12495763746')
  setupSmartsuppWidget()


  const products = new Map(content.supplements.map((item) => [item.id, item]))
  const productsPerPage = 9
  const totalPages = Math.max(1, Math.ceil(content.supplements.length / productsPerPage))

  const overlays = {
    nav: root.querySelector('[data-overlay="nav"]'),
    cart: root.querySelector('[data-overlay="cart"]'),
    modal: root.querySelector('[data-overlay="modal"]'),
    consultation: root.querySelector('[data-overlay="consultation"]'),
  }

  const drawers = {
    nav: root.querySelector('[data-drawer="nav"]'),
    cart: root.querySelector('[data-drawer="cart"]'),
  }

  const modal = root.querySelector('[data-modal]')
  const modalContent = root.querySelector('.js-modal-content')
  const cartContent = root.querySelector('.js-cart-content')
  const consultationModal = root.querySelector('[data-modal="consultation"]')

  const state = {
    activeSurface: null,
    previousFocus: null,
    currentPage: 1,
    totalPages: totalPages,
    currentFilter: 'All',
    searchTerm: '',
  }

  function renderProducts() {
    let filteredSupplements = content.supplements

    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase()
      filteredSupplements = filteredSupplements.filter((supplement) =>
        supplement.name.toLowerCase().includes(searchLower) ||
        supplement.subtitle.toLowerCase().includes(searchLower) ||
        supplement.shortDescription.toLowerCase().includes(searchLower)
      )
    }

    if (state.currentFilter === 'In Stock') {
      filteredSupplements = filteredSupplements.filter((supplement) => supplement.inStock)
    } else if (state.currentFilter === 'Out of Stock') {
      filteredSupplements = filteredSupplements.filter((supplement) => !supplement.inStock)
    }

    state.totalPages = Math.max(1, Math.ceil(filteredSupplements.length / productsPerPage))
    if (state.currentPage > state.totalPages) {
      state.currentPage = Math.max(1, state.totalPages)
    }

    const start = (state.currentPage - 1) * productsPerPage
    const end = start + productsPerPage
    const pageSupplements = filteredSupplements.slice(start, end)

    const supplementsGrid = root.querySelector('.supplements-grid')
    if (supplementsGrid) {
      supplementsGrid.innerHTML = pageSupplements.map(supplementCardTemplate).join('')
    }

    const paginationContainer = root.querySelector('.pagination')
    if (paginationContainer) {
      paginationContainer.innerHTML = paginationTemplate(state.currentPage, state.totalPages)
    }

    const stockFilter = root.querySelector('#stockFilter')
    if (stockFilter) {
      stockFilter.value = state.currentFilter
    }

    const searchInput = root.querySelector('#searchInput')
    if (searchInput) {
      searchInput.value = state.searchTerm
    }
  }
  function updatePagination(page) {
    if (page < 1 || page > state.totalPages) return
    state.currentPage = page
    renderProducts()
  }

  function updateCartCount() {
    const count = getCartCount()
    root.querySelectorAll('.js-cart-count').forEach((node) => {
      node.textContent = String(count)
      node.classList.toggle('is-empty', count === 0)
    })
  }

  function cartItemTemplate(item) {
    return `
      <article class="cart-item" data-cart-id="${escapeHtml(item.id)}" data-cart-type="${escapeHtml(item.type)}">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <div class="cart-item-info">
          <span class="type-pill">${escapeHtml(item.type === 'product' ? 'Product' : content.misc.cartTypeLabel)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${formatMoney(item.price)}</p>
          <div class="qty-controls">
            <button class="qty-btn" data-cart-action="decrement" aria-label="Decrease quantity">${icon('minus')}</button>
            <span aria-live="polite">${item.quantity}</span>
            <button class="qty-btn" data-cart-action="increment" aria-label="Increase quantity">${icon('plus')}</button>
          </div>
        </div>
        <button class="icon-button ghost remove-btn" data-cart-action="remove" aria-label="Remove item">${icon('trash')}</button>
      </article>
    `
  }

  function renderCart() {
    const cart = getCart()
    const totals = getTotals(cart)

    if (cart.length === 0) {
      cartContent.innerHTML = `
        <div class="cart-empty">
          <p>Your cart is empty.</p>
          <p>Add a protocol or product to continue.</p>
        </div>
      `
      updateCartCount()
      return
    }

    cartContent.innerHTML = `
      <div class="cart-list">
        ${cart.map(cartItemTemplate).join('')}
      </div>
      <div class="cart-summary">
        <div class="summary-row"><span>Subtotal</span><strong>${formatMoney(totals.subtotal)}</strong></div>
        <a class="btn btn-primary block" href="/checkout">Proceed to Checkout</a>
        <button class="btn btn-secondary block" type="button" data-clear-cart>Clear Cart</button>
        <p class="footnote">${escapeHtml(content.misc.cartShippingText)}</p>
      </div>
    `

    updateCartCount()
  }

  function openSurface(type, focusSource) {
    state.activeSurface = type
    state.previousFocus = focusSource || document.activeElement

    if (type === 'modal') {
      overlays.modal.hidden = false
      modal.hidden = false
      requestAnimationFrame(() => {
        overlays.modal.classList.add('is-open')
        modal.classList.add('is-open')
        const target = modal.querySelector('button, a, input, textarea')
        if (target) target.focus()
      })
    }

    if (type === 'consultation') {
      overlays.consultation.hidden = false
      consultationModal.hidden = false
      requestAnimationFrame(() => {
        overlays.consultation.classList.add('is-open')
        consultationModal.classList.add('is-open')
        const target = consultationModal.querySelector('button, a, input, textarea')
        if (target) target.focus()
      })
    }

    if (type === 'nav' || type === 'cart') {
      const overlay = overlays[type]
      const drawer = drawers[type]
      overlay.hidden = false
      drawer.setAttribute('aria-hidden', 'false')
      requestAnimationFrame(() => {
        overlay.classList.add('is-open')
        drawer.classList.add('is-open')
        const target = drawer.querySelector('button, a')
        if (target) target.focus()
      })
    }

    scrollLock(true)
  }

  function closeSurface(type) {
    if (type === 'modal') {
      overlays.modal.classList.remove('is-open')
      modal.classList.remove('is-open')
      window.setTimeout(() => {
        overlays.modal.hidden = true
        modal.hidden = true
        modalContent.innerHTML = ''
      }, 180)
    }

    if (type === 'consultation') {
      overlays.consultation.classList.remove('is-open')
      consultationModal.classList.remove('is-open')
      window.setTimeout(() => {
        overlays.consultation.hidden = true
        consultationModal.hidden = true
      }, 180)
    }

    if (type === 'nav' || type === 'cart') {
      const overlay = overlays[type]
      const drawer = drawers[type]
      overlay.classList.remove('is-open')
      drawer.classList.remove('is-open')
      window.setTimeout(() => {
        overlay.hidden = true
        drawer.setAttribute('aria-hidden', 'true')
      }, 180)
    }

    state.activeSurface = null
    scrollLock(false)
    if (state.previousFocus instanceof HTMLElement) {
      state.previousFocus.focus()
    }
  }

  function closeAnySurface() {
    if (state.activeSurface) {
      closeSurface(state.activeSurface)
    }
  }

  function openProductModal(productId, trigger) {
    const product = products.get(productId)
    if (!product) return

    modalContent.innerHTML = productModalTemplate(product)
    openSurface('modal', trigger)
  }

  function addProduct(productId) {
    const product = products.get(productId)
    if (!product) return
    addToCart(createProductCartItem(product))
    renderCart()
  }

  root.addEventListener('submit', async (event) => {
    if (event.target.matches('[data-consultation-form]')) {
      event.preventDefault()
      const form = event.target instanceof HTMLFormElement ? event.target : null
      if (!form) return

      const submitButton = form.querySelector('button[type="submit"]')
      const originalLabel = submitButton instanceof HTMLButtonElement ? submitButton.textContent : ''
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true
        submitButton.textContent = 'Submitting...'
      }

      try {
        await submitConsultationRequest(form)
        alert('Thank you for your consultation request! We will contact you shortly to confirm your appointment.')
        closeSurface('consultation')
        form.reset()
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to submit your consultation request right now. Please try again.'
        alert(message)
      } finally {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false
          submitButton.textContent = originalLabel || 'Request Consultation'
        }
      }
    }
  })

  root.addEventListener('click', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null
    if (!target) return
    const applyFiltersBtn = target.closest('[data-apply-filters]')
    if (applyFiltersBtn) {
      const searchInput = root.querySelector('#searchInput')
      const stockFilter = root.querySelector('#stockFilter')

      state.searchTerm = searchInput ? searchInput.value.trim() : ''
      state.currentFilter = stockFilter ? stockFilter.value : 'All'
      state.currentPage = 1
      renderProducts()
      return
    }

    const resetFiltersBtn = target.closest('[data-reset-filters]')
    if (resetFiltersBtn) {
      const searchInput = root.querySelector('#searchInput')
      const stockFilter = root.querySelector('#stockFilter')

      if (searchInput) {
        searchInput.value = ''
      }

      if (stockFilter) {
        stockFilter.value = 'All'
      }

      state.searchTerm = ''
      state.currentFilter = 'All'
      state.currentPage = 1
      renderProducts()
      return
    }

    const pageButton = target.closest('[data-page]')
    if (pageButton) {
      const action = pageButton.getAttribute('data-page')
      if (action === 'prev') {
        updatePagination(state.currentPage - 1)
      } else if (action === 'next') {
        updatePagination(state.currentPage + 1)
      }
      return
    }

    const pageNumberButton = target.closest('[data-page-number]')
    if (pageNumberButton) {
      const pageNumber = Number(pageNumberButton.getAttribute('data-page-number'))
      if (Number.isFinite(pageNumber)) {
        updatePagination(pageNumber)
      }
      return
    }

    const openNavBtn = target.closest('[data-open-nav]')
    if (openNavBtn) {
      openSurface('nav', openNavBtn)
      return
    }

    const openCartBtn = target.closest('[data-open-cart]')
    if (openCartBtn) {
      renderCart()
      openSurface('cart', openCartBtn)
      return
    }

    const openConsultationBtn = target.closest('[data-open-consultation]')
    if (openConsultationBtn) {
      openSurface('consultation', openConsultationBtn)
      return
    }

    if (target.closest('[data-close-consultation]') || target.matches('[data-overlay="consultation"]')) {
      closeSurface('consultation')
      return
    }

    if (target.closest('[data-close-nav]')) {
      closeSurface('nav')
      return
    }

    if (target.closest('[data-close-cart]')) {
      closeSurface('cart')
      return
    }

    if (target.matches('[data-overlay="nav"]')) {
      closeSurface('nav')
      return
    }

    if (target.matches('[data-overlay="cart"]')) {
      closeSurface('cart')
      return
    }

    if (target.closest('[data-close-modal]') || target.matches('[data-overlay="modal"]')) {
      closeSurface('modal')
      return
    }

    const openProductBtn = target.closest('[data-open-product]')
    if (openProductBtn) {
      const productId = openProductBtn.getAttribute('data-open-product')
      if (productId) openProductModal(productId, openProductBtn)
      return
    }

    const addProductBtn = target.closest('[data-add-product-cart]')
    if (addProductBtn) {
      const productId = addProductBtn.getAttribute('data-add-product-cart')
      if (productId) addProduct(productId)
      return
    }

    const quickProductAdd = target.closest('[data-quick-add-product]')
    if (quickProductAdd) {
      const productId = quickProductAdd.getAttribute('data-quick-add-product')
      if (productId) addProduct(productId)
      return
    }

    const navLink = target.closest('[data-nav-link]')
    if (navLink instanceof HTMLAnchorElement) {
      closeSurface('nav')
    }

    const clearButton = target.closest('[data-clear-cart]')
    if (clearButton) {
      clearCart()
      renderCart()
      return
    }

    const cartActionButton = target.closest('[data-cart-action]')
    if (cartActionButton) {
      const action = cartActionButton.getAttribute('data-cart-action')
      const cartItem = cartActionButton.closest('[data-cart-id]')
      if (!cartItem) return

      const itemId = cartItem.getAttribute('data-cart-id')
      const itemType = cartItem.getAttribute('data-cart-type')
      const current = getCart().find((entry) => entry.id === itemId && entry.type === itemType)

      if (!itemId || !itemType || !current) return

      if (action === 'increment') {
        updateQuantity(itemId, itemType, current.quantity + 1)
      }

      if (action === 'decrement') {
        updateQuantity(itemId, itemType, current.quantity - 1)
      }

      if (action === 'remove') {
        removeFromCart(itemId, itemType)
      }

      renderCart()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.activeSurface) {
      closeAnySurface()
      return
    }

    if (state.activeSurface === 'modal') {
      focusTrap(modal, event)
    }

    if (state.activeSurface === 'consultation') {
      focusTrap(consultationModal, event)
    }

    if (state.activeSurface === 'nav') {
      focusTrap(drawers.nav, event)
    }

    if (state.activeSurface === 'cart') {
      focusTrap(drawers.cart, event)
    }
  })

  renderCart()
  renderProducts()
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  mountSupplementsApp(root, SITE_CONTENT)
})
