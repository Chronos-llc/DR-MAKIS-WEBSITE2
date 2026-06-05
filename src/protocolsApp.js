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

function protocolCardTemplate(protocol) {
  // Determine difficulty badge class
  const difficultyClass = protocol.difficulty.toLowerCase()
  
  return `
    <article class="protocol-card">
      <div class="protocol-header">
        <h3>${escapeHtml(protocol.title)}</h3>
        <p class="protocol-subtitle">${escapeHtml(protocol.subtitle)}</p>
      </div>
      <div class="protocol-body">
        <p class="protocol-description">${escapeHtml(protocol.excerpt)}</p>
        <div class="protocol-details">
          <div class="detail-item duration-row">
            ${icon('clock')}
            <span class="duration-text">${escapeHtml(protocol.duration)}</span>
          </div>
          <div class="detail-item">
            <span class="difficulty-badge ${difficultyClass}">${escapeHtml(protocol.difficulty)}</span>
          </div>
          <div class="detail-item price-row">
            <span class="protocol-price">${formatMoney(protocol.price)}</span>
          </div>
        </div>
        <div class="protocol-actions">
          <button class="btn btn-secondary" data-open-protocol="${escapeHtml(protocol.id)}" aria-label="View ${escapeHtml(protocol.title)} details">
            ${icon('info')} Details
          </button>
          <button class="btn btn-primary" data-add-protocol="${escapeHtml(protocol.id)}" aria-label="Add ${escapeHtml(protocol.title)} to cart">
            ${icon('cart')} Add
          </button>
        </div>
      </div>
    </article>
  `
}

function filtersTemplate(filters) {
  return `
    <div class="filter-bar">
      ${filters.map(filter => `
        <button class="filter-button ${filter === 'All Protocols' ? 'is-active' : ''}" data-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>
      `).join('')}
    </div>
  `
}

function paginationTemplate(currentPage, totalPages) {
  return `
    <div class="pagination">
      <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
      <div class="pagination-controls">
        <button class="pagination-button" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <button class="pagination-button" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
      </div>
    </div>
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

function renderProtocolsLayout(content) {
  const { brand, contact, protocolsPage, protocols } = content
  const protocolsPerPage = 6
  const totalPages = Math.ceil(protocols.length / protocolsPerPage)

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
        <section class="hero-section section-panel content-shell" id="protocols-hero">
          <div class="hero-content">
            <h1>${escapeHtml(protocolsPage.hero.title)}</h1>
            <p>${escapeHtml(protocolsPage.hero.subtitle)}</p>
          </div>
        </section>

         <section class="section-panel content-shell" id="protocols">
          <div class="section-header">
            <div class="search-bar">
              <input type="text" id="searchInput" class="search-input" placeholder="Search protocols..." aria-label="Search protocols">
              <select id="difficultyFilter" class="difficulty-filter">
                <option value="All Difficulties">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button class="btn btn-primary apply-filters" data-apply-filters>Apply Filters</button>
              <button class="btn btn-secondary reset-filters" data-reset-filters>Reset</button>
            </div>
          </div>

          <div class="protocols-grid">
            ${protocols.slice(0, protocolsPerPage).map(protocolCardTemplate).join('')}
          </div>

          ${paginationTemplate(1, totalPages)}
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

function protocolModalTemplate(protocol) {
  const difficultyClass = protocol.difficulty.toLowerCase()

  return `
    <button class="icon-button close-btn modal-close" data-close-modal aria-label="Close details">${icon('close')}</button>
    <div class="modal-media-wrap modal-media-wrap--protocol">
      <img src="${escapeHtml(protocol.image)}" alt="${escapeHtml(protocol.title)}" class="modal-hero" />
      <span class="pill-tag">${escapeHtml(protocol.difficulty)}</span>
      <span class="protocol-modal-duration">${icon('clock')}${escapeHtml(protocol.duration)}</span>
    </div>
    <div class="modal-body modal-body--split">
      <div class="modal-intro-card">
        <span class="difficulty-badge ${difficultyClass}">${escapeHtml(protocol.difficulty)} protocol</span>
        <h2>${escapeHtml(protocol.title)}</h2>
        <p class="modal-subtitle">${escapeHtml(protocol.subtitle)}</p>
        <p>${escapeHtml(protocol.about)}</p>
      </div>

      <aside class="modal-purchase-card" aria-label="Protocol purchase summary">
        <span class="modal-card-eyebrow">Program investment</span>
        <p class="modal-price">${formatMoney(protocol.price)}</p>
        <div class="modal-mini-meta">
          <span>${icon('clock')}${escapeHtml(protocol.duration)}</span>
          <span>${icon('shield')}Supervised plan</span>
        </div>
        <button class="btn btn-cart block" type="button" data-add-protocol-cart="${escapeHtml(protocol.id)}">${icon('cart')}Add to Cart</button>
      </aside>

      <section class="modal-section">
        <h3>Treatments Included</h3>
        <ul class="treatment-list">
          ${protocol.treatments.map(treatment => `<li>${icon('check')}<span>${escapeHtml(treatment)}</span></li>`).join('')}
        </ul>
      </section>

      <section class="protocol-stats" aria-label="Protocol highlights">
        ${protocol.stats.map(stat => `
          <div class="stat-item">
            <strong>${escapeHtml(stat.value)}</strong>
            <span>${escapeHtml(stat.label)}</span>
          </div>
        `).join('')}
      </section>
    </div>
  `
}

export function mountProtocolsApp(root, content) {
  root.innerHTML = renderProtocolsLayout(content)

  setupRevealTransitions(root)
  setupFloatingTelegramButton(content.contact)
  setupSmartsuppWidget()


  const protocols = new Map(content.protocols.map((item) => [item.id, item]))
  const protocolsPerPage = 6
  const totalPages = Math.ceil(content.protocols.length / protocolsPerPage)

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
    currentFilter: 'All Difficulties',
    searchTerm: '',
  }

  function renderProtocols() {
    // Apply filters
    let filteredProtocols = content.protocols
    
    // Apply search filter
    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase()
      filteredProtocols = filteredProtocols.filter(protocol => 
        protocol.title.toLowerCase().includes(searchLower) ||
        protocol.subtitle.toLowerCase().includes(searchLower) ||
        protocol.excerpt.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply difficulty filter
    if (state.currentFilter !== 'All Difficulties') {
      filteredProtocols = filteredProtocols.filter(protocol => protocol.difficulty === state.currentFilter)
    }
    
    // Calculate pagination based on filtered results
    state.totalPages = Math.ceil(filteredProtocols.length / protocolsPerPage)
    if (state.currentPage > state.totalPages) {
      state.currentPage = Math.max(1, state.totalPages)
    }
    
    const start = (state.currentPage - 1) * protocolsPerPage
    const end = start + protocolsPerPage
    const pageProtocols = filteredProtocols.slice(start, end)
    
    // Update protocols grid
    const protocolsGrid = root.querySelector('.protocols-grid')
    if (protocolsGrid) {
      protocolsGrid.innerHTML = pageProtocols.map(protocolCardTemplate).join('')
    }
    
    // Update pagination
    const paginationContainer = root.querySelector('.pagination')
    if (paginationContainer) {
      paginationContainer.innerHTML = paginationTemplate(state.currentPage, state.totalPages)
    }
    
    // Update filter UI
    const difficultyFilter = root.querySelector('#difficultyFilter')
    if (difficultyFilter) {
      difficultyFilter.value = state.currentFilter
    }
    
    const searchInput = root.querySelector('#searchInput')
    if (searchInput) {
      searchInput.value = state.searchTerm
    }
  }

  function updatePagination(page) {
    if (page < 1 || page > state.totalPages) return
    state.currentPage = page
    renderProtocols()
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

  function openProtocolModal(protocolId, trigger) {
    const protocol = protocols.get(protocolId)
    if (!protocol) return

    modalContent.innerHTML = protocolModalTemplate(protocol)
    openSurface('modal', trigger)
  }

  function addProtocol(protocolId) {
    const protocol = protocols.get(protocolId)
    if (!protocol) return
    addToCart({
      id: protocol.id,
      type: 'protocol',
      title: protocol.title,
      price: protocol.price,
      image: protocol.image,
      quantity: 1
    })
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
    
    // Apply filters button
    const applyFiltersBtn = target.closest('[data-apply-filters]')
    if (applyFiltersBtn) {
      const searchInput = root.querySelector('#searchInput')
      const difficultyFilter = root.querySelector('#difficultyFilter')
      
      state.searchTerm = searchInput.value.trim()
      state.currentFilter = difficultyFilter.value
      state.currentPage = 1 // Reset to first page when filters change
      renderProtocols()
      return
    }
    
    // Reset filters button
    const resetFiltersBtn = target.closest('[data-reset-filters]')
    if (resetFiltersBtn) {
      const searchInput = root.querySelector('#searchInput')
      const difficultyFilter = root.querySelector('#difficultyFilter')
      
      searchInput.value = ''
      difficultyFilter.value = 'All Difficulties'
      state.searchTerm = ''
      state.currentFilter = 'All Difficulties'
      state.currentPage = 1 // Reset to first page when filters are reset
      renderProtocols()
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

    const openProtocolBtn = target.closest('[data-open-protocol]')
    if (openProtocolBtn) {
      const protocolId = openProtocolBtn.getAttribute('data-open-protocol')
      if (protocolId) openProtocolModal(protocolId, openProtocolBtn)
      return
    }

    const addProtocolBtn = target.closest('[data-add-protocol-cart]')
    if (addProtocolBtn) {
      const protocolId = addProtocolBtn.getAttribute('data-add-protocol-cart')
      if (protocolId) addProtocol(protocolId)
      return
    }

    const quickProtocolAdd = target.closest('[data-add-protocol]')
    if (quickProtocolAdd) {
      const protocolId = quickProtocolAdd.getAttribute('data-add-protocol')
      if (protocolId) addProtocol(protocolId)
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
  renderProtocols()
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  mountProtocolsApp(root, SITE_CONTENT)
})
