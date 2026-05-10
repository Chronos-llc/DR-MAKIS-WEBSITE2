import {
  addToCart,
  clearCart,
  createProductCartItem,
  createProtocolCartItem,
  formatMoney,
  getCart,
  getCartCount,
  getTotals,
  removeFromCart,
  updateQuantity,
} from './cartStore.js'
import { icon } from './icons.js'
import {
  escapeHtml,
  focusTrap,
  scrollLock,
  setupFloatingTelegramButton,
  setupRevealTransitions,
  setupVapiWidget,
  submitConsultationRequest,
} from './utils.js'

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

function renderStars(rating) {
  return '<span class="stars" aria-label="5 star rating">' + '★'.repeat(rating) + '</span>'
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

function metricsTemplate(metrics) {
  return metrics
    .map(
      (metric) => `
      <div class="metric-tile">
        <span class="metric-icon-chip">${icon(metric.icon || 'badge')}</span>
        <div class="metric-value">${escapeHtml(metric.value)}</div>
        <div class="metric-label">${escapeHtml(metric.label)}</div>
      </div>
    `
    )
    .join('')
}

function heroProfileTemplate(hero) {
  return `
    <article class="hero-profile-card" aria-label="Doctor credentials">
      <span class="hero-profile-icon">${icon('badge')}</span>
      <div>
        <h3>${escapeHtml(hero.profileTitle || 'Dr. William Makis, MD')}</h3>
        <p class="hero-profile-role">${escapeHtml(hero.profileSubtitle || 'Nuclear Medicine Physician & Oncologist')}</p>
        <p class="hero-profile-highlight">${escapeHtml(hero.profileHighlight || '500+ Research Publications')}</p>
      </div>
    </article>
  `
}

function programsCardsTemplate(programs) {
  return programs
    .map(
      (program) => `
      <article class="protocol-card" id="program-${escapeHtml(program.id)}">
        <div class="protocol-image-wrap">
          <img src="${escapeHtml(program.image)}" alt="${escapeHtml(program.title)}" class="protocol-image" />
          <span class="pill-tag">${escapeHtml(program.badge)}</span>
        </div>
        <div class="protocol-body">
          <div class="protocol-row">
            <div>
              <h3>${escapeHtml(program.title)}</h3>
              <p class="protocol-subtitle">${escapeHtml(program.subtitle)}</p>
            </div>
            <button class="icon-action" data-open-program="${escapeHtml(program.id)}" aria-label="Open ${escapeHtml(
        program.title
      )} details">
              ${icon('arrowRight')}
            </button>
          </div>
          <p class="muted-text">${escapeHtml(program.excerpt)}</p>
          <div class="meta-row">
            <span>${icon('clock')}${escapeHtml(program.duration)}</span>
            <span>${icon('video')}${escapeHtml(program.consultationType)}</span>
          </div>
        </div>
      </article>
    `
    )
    .join('')
}

function expertiseTemplate(items) {
  return items
    .map(
      (item) => `
      <article class="expertise-card">
        <span class="expertise-icon">${icon(item.icon)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>
    `
    )
    .join('')
}

function processTemplate(steps) {
  return steps
    .map(
      (step) => `
      <article class="process-card">
        <span class="step-number">${escapeHtml(step.number)}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.description)}</p>
        <ul>
          ${step.bullets
            .map((bullet) => `<li>${icon('check')}<span>${escapeHtml(bullet)}</span></li>`)
            .join('')}
        </ul>
      </article>
    `
    )
    .join('')
}

function productSlidesTemplate(products) {
  return products
    .map(
      (product, index) => `
      <article class="product-slide ${index === 0 ? 'is-active' : ''}" data-product-slide="${escapeHtml(
        product.id
      )}" aria-hidden="${index === 0 ? 'false' : 'true'}">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="product-image" />
        <div class="product-info">
          <h3>${escapeHtml(product.name)}</h3>
          <p class="rating-line">${renderStars(product.rating)} (${escapeHtml(product.reviews)})</p>
          <p class="muted-text">${escapeHtml(product.shortDescription)}</p>
          <div class="product-actions-row">
            <strong>${formatMoney(product.price)}</strong>
            <div class="inline-actions">
              <button class="icon-action" data-open-product="${escapeHtml(product.id)}" aria-label="View ${escapeHtml(
        product.name
      )} details">${icon('eye', '', { attrs: 'stroke-width="1.75"' })}</button>
              <button class="cart-action" data-quick-add-product="${escapeHtml(product.id)}" aria-label="Add ${escapeHtml(
        product.name
      )} to cart">${icon('cart')}</button>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join('')
}

function categoryCardsTemplate(cards) {
  return cards
    .map(
      (card) => `
      <article class="category-card">
        <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)}" class="category-image" />
        <div class="category-overlay"></div>
        <div class="category-content">
          <span class="category-icon">${icon(card.icon)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.description)}</p>
          ${card.id === 'supplements' ? 
            `<a class="text-link" href="/supplements.html">${escapeHtml(card.cta)} ${icon('arrowRight')}</a>` : 
            card.id === 'protocols' ?
            `<a class="text-link" href="/protocols.html">${escapeHtml(card.cta)} ${icon('arrowRight')}</a>` :
            card.id === 'consultations' ?
            `<a class="text-link" href="/consultations/">${escapeHtml(card.cta)} ${icon('arrowRight')}</a>` :
            `<button class="text-link" data-scroll-target="${escapeHtml(card.id)}">${escapeHtml(card.cta)} ${icon('arrowRight')}</button>`
          }
        </div>
      </article>
    `
    )
    .join('')
}
function testimonialsTemplate(testimonials) {
  return testimonials
    .map(
      (item) => `
      <article class="testimonial-card">
        <span class="testimonial-quote-mark" aria-hidden="true">&#10077;</span>
        <p class="testimonial-stars" aria-label="5 star rating">
          <span class="testimonial-star">&#9733;</span>
          <span class="testimonial-star">&#9733;</span>
          <span class="testimonial-star">&#9733;</span>
          <span class="testimonial-star">&#9733;</span>
          <span class="testimonial-star">&#9733;</span>
        </p>
        <p class="testimonial-quote">\"${escapeHtml(item.quote)}\"</p>
        <div class="person-row">
          <img src="${escapeHtml(item.avatar)}" alt="${escapeHtml(item.name)}" class="avatar-sm" />
          <div class="testimonial-person">
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.role)}</p>
          </div>
        </div>
      </article>
    `
    )
    .join('')
}

function videosTemplate(videos) {
  return videos
    .map(
      (video) => `
      <article class="video-card">
        <div class="streamable-embed video-frame" style="padding-bottom:${escapeHtml(video.embedPadding || '56.250%')}">
          <iframe
            allow="fullscreen"
            allowfullscreen
            loading="lazy"
            src="${escapeHtml(video.embedUrl || video.url)}"
            title="${escapeHtml(video.title)}"
          ></iframe>
        </div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.description)}</p>
      </article>
    `
    )
    .join('')
}

function publicationsTemplate(items) {
  return items
    .map(
      (item) => `
      <a class="publication-card" href="${escapeHtml(item.url || '#research')}" target="_blank" rel="noopener noreferrer" aria-label="Open publication: ${escapeHtml(
        item.title
      )}">
        <span class="publication-icon">${icon('document')}</span>
        <div class="publication-content">
          <h3>${escapeHtml(item.title)}</h3>
          <div class="meta-line">
            <span class="meta-tag">${escapeHtml(item.tag)}</span>
            <span>${escapeHtml(item.source)} • ${escapeHtml(item.year)}</span>
          </div>
          <p class="citation">${escapeHtml(item.citations)}</p>
        </div>
        <span class="publication-link-icon" aria-hidden="true">${icon('externalLink')}</span>
      </a>
    `
    )
    .join('')
}

function renderMainLayout(content) {
  const { brand, contact, hero, categorySection, expertiseSection, treatmentProtocolsSection, processSection } =
    content

  return `
    <div class="site-wrap">
      <header class="site-header full-bleed content-shell">
        <a class="brand" href="#top" aria-label="Dr. William Makis home">
          <img src="${escapeHtml(brand.logo)}" alt="Dr. William Makis logo" class="brand-logo" />
          <span class="brand-text">Dr. William <strong>Makis</strong></span>
        </a>
        
        <!-- Main Navigation -->
        <nav class="main-nav" aria-label="Main navigation">
          <a href="#expertise" class="nav-link">Expertise</a>
          <a href="#protocols" class="nav-link">Protocols</a>
          <a href="#process" class="nav-link">Process</a>
          <a href="#testimonials" class="nav-link">Testimonials</a>
          <a href="#research" class="nav-link">Research</a>
          <a href="#credentials" class="nav-link">Achievements</a>
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
        <section class="hero-section section-panel content-shell" id="home">
          <img src="${escapeHtml(hero.backgroundImage)}" alt="Abstract precision oncology background" class="hero-bg" />
          <div class="hero-overlay" aria-hidden="true"></div>
          <div class="hero-content">
            <span class="section-pill">${escapeHtml(hero.badge)}</span>
            <h1>${escapeHtml(hero.title)}</h1>
            <p>${escapeHtml(hero.description)}</p>
            <div class="hero-cta-row">
              <a class="btn btn-primary" href="/checkout">${icon('calendar')}${escapeHtml(hero.ctaPrimary)}</a>
              <a class="btn btn-secondary" href="#research">${escapeHtml(hero.ctaSecondary)} ${icon('arrowRight')}</a>
            </div>
            <div class="hero-metrics">${metricsTemplate(hero.stats.slice(0, 3))}</div>
            ${heroProfileTemplate(hero)}
          </div>
          <aside class="hero-visual-card" aria-label="Precision oncology highlights">
            <span class="hero-visual-eyebrow">Precision dashboard</span>
            <strong>Personalized protocols, evidence-based care</strong>
            <div class="hero-signal-grid" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <ul>
              <li>${icon('check')} Advanced diagnostics review</li>
              <li>${icon('check')} Research-backed treatment planning</li>
              <li>${icon('check')} Secure remote consultation pathway</li>
            </ul>
          </aside>
        </section>

        <section class="section-panel content-shell" id="shop">
          <header class="section-header center">
            <h2>${escapeHtml(categorySection.kicker)}</h2>
            <p>${escapeHtml(categorySection.description)}</p>
          </header>
          <div class="category-grid">${categoryCardsTemplate(categorySection.cards)}</div>
        </section>

        <section class="section-panel content-shell" id="expertise">
          <header class="section-header center">
            <p class="section-kicker">${escapeHtml(expertiseSection.kicker)}</p>
            <h2>${escapeHtml(expertiseSection.title)}</h2>
            <p>${escapeHtml(expertiseSection.description)}</p>
          </header>
          <div class="expertise-grid">${expertiseTemplate(expertiseSection.items)}</div>
        </section>

        <section class="section-panel content-shell" id="protocols">
          <header class="section-header center">
            <p class="section-kicker">${escapeHtml(treatmentProtocolsSection.kicker)}</p>
            <h2>${escapeHtml(treatmentProtocolsSection.title)}</h2>
            <p>${escapeHtml(treatmentProtocolsSection.description)}</p>
          </header>
          <div class="protocol-grid">${programsCardsTemplate(content.programs)}</div>
        </section>

        <section class="section-panel content-shell" id="process">
          <header class="section-header center">
            <p class="section-kicker">${escapeHtml(processSection.kicker)}</p>
            <h2>${escapeHtml(processSection.title)}</h2>
            <p>${escapeHtml(processSection.description)}</p>
          </header>
          <div class="process-grid">${processTemplate(processSection.steps)}</div>
        </section>
        <section class="section-panel content-shell" id="products">
          <header class="section-header center">
            <h2>${escapeHtml(content.productsSection.kicker)}</h2>
            <p>${escapeHtml(content.productsSection.description)}</p>
          </header>

          <div class="carousel-shell">
            <button class="carousel-arrow" data-product-prev aria-label="Previous product">${icon('arrowLeft')}</button>
            <div class="product-slides">${productSlidesTemplate(content.products)}</div>
            <button class="carousel-arrow" data-product-next aria-label="Next product">${icon('arrowRight')}</button>
          </div>
          <div class="carousel-dots" role="tablist" aria-label="Products">
            ${content.products
              .map(
                (product, index) =>
                  `<button class="dot ${index === 0 ? 'is-active' : ''}" role="tab" aria-selected="${
                    index === 0 ? 'true' : 'false'
                  }" data-product-dot="${index}" aria-label="Show ${escapeHtml(product.name)}"></button>`
              )
              .join('')}
          </div>
        </section>

        <section class="section-panel content-shell" id="videos">
          <header class="section-header center">
            <p class="section-kicker">${escapeHtml(content.educationalSection.kicker)}</p>
            <h2>${escapeHtml(content.educationalSection.title)}</h2>
            <p>${escapeHtml(content.educationalSection.description)}</p>
          </header>
          <article class="featured-video-card">
            <div class="streamable-embed featured-streamable" style="padding-bottom:${escapeHtml(
              content.educationalSection.featuredVideo.embedPadding || '56.250%'
            )}">
              <iframe
                allow="fullscreen"
                allowfullscreen
                loading="lazy"
                src="${escapeHtml(content.educationalSection.featuredVideo.embedUrl || content.educationalSection.featuredVideo.url)}"
                title="${escapeHtml(content.educationalSection.featuredVideo.title)}"
              ></iframe>
            </div>
            <div class="video-meta-row">
              <span class="pill-tag">${escapeHtml(content.educationalSection.featuredVideo.tag)}</span>
              <span>${escapeHtml(content.educationalSection.featuredVideo.duration)}</span>
              <span>•</span>
              <span>${escapeHtml(content.educationalSection.featuredVideo.views)}</span>
            </div>
          </article>
          <header class="section-header center compact">
            <p class="section-kicker">${escapeHtml(content.educationalSection.galleryKicker)}</p>
            <h2>${escapeHtml(content.educationalSection.galleryTitle)}</h2>
            <p>${escapeHtml(content.educationalSection.galleryDescription)}</p>
          </header>
          <div class="video-grid">${videosTemplate(content.educationalSection.videos)}</div>
        </section>

        <section class="section-panel content-shell" id="credentials">
          <header class="section-header center">
            <p class="section-pill small">${icon('badge')} ${escapeHtml(content.certificationsSection.pill)}</p>
            <h2>${escapeHtml(content.certificationsSection.title)}</h2>
            <p>${escapeHtml(content.certificationsSection.description)}</p>
          </header>
          <div class="cert-grid">
            ${content.certificationsSection.certifications
              .map(
                (cert) => `
                <article class="cert-card">
                  <a class="cert-media" href="${escapeHtml(cert.image)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(
                    cert.title
                  )} certificate image">
                    <img src="${escapeHtml(cert.image)}" alt="${escapeHtml(cert.title)} certificate" class="cert-image" />
                    <span class="cert-enlarge-pill">Click to enlarge</span>
                  </a>
                  <div class="cert-body">
                    <div class="cert-body-head">
                      <div>
                        <h3>${escapeHtml(cert.title)}</h3>
                        <p class="institution">${escapeHtml(cert.institution)} <span>•</span> ${escapeHtml(cert.year)}</p>
                      </div>
                      <p class="verified">${icon('badge')} ${escapeHtml(cert.status)}</p>
                    </div>
                    <p class="cert-description">${escapeHtml(cert.description)}</p>
                  </div>
                </article>
              `
              )
              .join('')}
          </div>
        </section>

        <section class="section-panel content-shell" id="testimonials">
          <header class="section-header center">
            <p class="section-kicker">${escapeHtml(content.testimonialsSection.kicker)}</p>
            <h2>${escapeHtml(content.testimonialsSection.title)}</h2>
            <p>${escapeHtml(content.testimonialsSection.description)}</p>
          </header>

          <div class="testimonial-slides">${testimonialsTemplate(content.testimonialsSection.testimonials)}</div>
        </section>
        <section class="section-panel content-shell" id="research">
          <div class="research-layout">
            <div class="research-copy">
              <header class="section-header">
                <p class="section-kicker">${escapeHtml(content.publicationsSection.kicker)}</p>
                <h2>${escapeHtml(content.publicationsSection.title)}</h2>
                <p>${escapeHtml(content.publicationsSection.description)}</p>
              </header>
              <div class="stats-grid">
                ${content.publicationsSection.stats
                  .map(
                    (stat) => `
                    <article class="stat-card">
                      <strong>${escapeHtml(stat.value)}</strong>
                      <p>${escapeHtml(stat.label)}</p>
                    </article>
                  `
                  )
                  .join('')}
              </div>
            </div>
            <div class="publication-grid">${publicationsTemplate(content.publicationsSection.items)}</div>
          </div>
        </section>

        <section class="section-panel cta-panel content-shell" id="contact">
          <h2>${escapeHtml(content.recoveryCtaSection.title)}</h2>
          <p>${escapeHtml(content.recoveryCtaSection.description)}</p>
          <a class="btn btn-secondary-light" href="/checkout">${icon('calendar')}${escapeHtml(
            content.recoveryCtaSection.primaryButton
          )}</a>
          <a class="btn btn-outline-light" href="${escapeHtml(contact.telegramUrl)}" target="_blank" rel="noopener noreferrer">${icon(
    'telegram'
  )}${escapeHtml(content.recoveryCtaSection.secondaryButton)}</a>
          <a class="btn btn-outline-light" href="tel:+19598810216" aria-label="Book Consultation With Emma by phone">✨ Book Consultation With Emma</a>

          <article class="contact-card">
            <h3>Contact Us</h3>
            <p>${icon('mapPin')} ${escapeHtml(contact.addressLines[0])}</p>
            <p class="contact-indent">${escapeHtml(contact.addressLines[1])}</p>
            <p class="contact-indent">${escapeHtml(contact.addressLines[2])}</p>
            <p>${icon('telegram')} <a href="${escapeHtml(contact.telegramUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    contact.telegramHandle
  )}</a></p>
            <p>${icon('mail')} <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>
          </article>
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
          <a class="icon-button ghost" href="#contact" aria-label="Facebook">${icon('facebook')}</a>
          <a class="icon-button ghost" href="#contact" aria-label="Twitter">${icon('twitter')}</a>
          <a class="icon-button ghost" href="#contact" aria-label="LinkedIn">${icon('linkedin')}</a>
          <a class="icon-button ghost" href="#contact" aria-label="Instagram">${icon('instagram')}</a>
        </div>
        ${telegramUpdateCtaTemplate('telegram-update-cta--footer')}

        <div class="footer-columns">
          <div>
            <h3>Services</h3>
            <ul>${footerListTemplate(content.footer.services, 'services', '')}</ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>${footerListTemplate(content.footer.resources, 'resources', '')}</ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>${footerListTemplate(content.footer.about, 'about', '')}</ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>${icon('telegram')} <a href="${escapeHtml(contact.telegramUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    contact.telegramHandle
  )}</a></li>
              <li>${icon('mail')} <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>${escapeHtml(content.footer.copyright)}</p>
          <div class="legal-links">${footerLegalTemplate(content.footer.legal, '')}</div>
        </div>
      </footer>
    </div>

    <div class="overlay" data-overlay="nav" hidden></div>
    <aside class="side-drawer" data-drawer="nav" aria-hidden="true" aria-label="Navigation menu">
      <button class="icon-button close-btn" data-close-nav aria-label="Close menu">${icon('close')}</button>
      ${mobileQuickActionsTemplate()}
      <nav>
        <a href="#home" data-nav-link>Home</a>
        <a href="/supplements.html" data-nav-link>Supplements</a>
        <a href="/protocols.html" data-nav-link>Protocols</a>
        <a href="/consultations/" data-nav-link>Consultations</a>
        <a href="#shop" data-nav-link>Shop by Category</a>
        <a href="#expertise" data-nav-link>Our Expertise</a>
        <a href="#protocols" data-nav-link>Treatment Protocols</a>
        <a href="#process" data-nav-link>Our Process</a>
        <a href="#products" data-nav-link>Cancer Support Products</a>
        <a href="#videos" data-nav-link>Featured Videos</a>
        <a href="#credentials" data-nav-link>Professional Certifications</a>
        <a href="#testimonials" data-nav-link>Stories of Hope & Recovery</a>
        <a href="#research" data-nav-link>Research & Publications</a>
        <a href="#contact" data-nav-link>Contact Us</a>
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

export function mountHomeApp(root, content) {
  root.innerHTML = renderMainLayout(content)

  setupRevealTransitions(root)
  setupFloatingTelegramButton(content.contact)
  setupVapiWidget()


  const programs = new Map(content.programs.map((item) => [item.id, item]))
  const products = new Map(content.products.map((item) => [item.id, item]))

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
    currentProductIndex: 0,
    activeSurface: null,
    previousFocus: null,
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
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
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

  function productModalTemplate(product) {
    return `
      <button class="icon-button close-btn modal-close" data-close-modal aria-label="Close details">${icon('close')}</button>
      <div class="modal-product-layout">
        <div class="modal-product-media">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="modal-product-image" />
        </div>
        <div class="modal-body modal-product-body">
          <span class="modal-card-eyebrow">Supplement detail</span>
          <h2>${escapeHtml(product.name)}</h2>
          <p class="rating-line">${renderStars(product.rating)} (${escapeHtml(product.reviews)} reviews)</p>
          <p class="modal-price">${formatMoney(product.price)}</p>
          <p>${escapeHtml(product.description)}</p>

          <h3>Key Benefits</h3>
          <ul class="check-list">
            ${product.benefits.map((benefit) => `<li>${icon('check')}<span>${escapeHtml(benefit)}</span></li>`).join('')}
          </ul>

          <div class="meta-card">
            <p><strong>Dosage:</strong><br />${escapeHtml(product.dosage)}</p>
            <p><strong>Ingredients:</strong><br />${escapeHtml(product.ingredients)}</p>
            <p><strong>Size:</strong><br />${escapeHtml(product.size)}</p>
          </div>

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

  function programModalTemplate(program) {
    return `
      <button class="icon-button close-btn modal-close" data-close-modal aria-label="Close details">${icon('close')}</button>
      <div class="modal-media-wrap">
        <img src="${escapeHtml(program.image)}" alt="${escapeHtml(program.title)}" class="modal-hero" />
        <span class="pill-tag">${escapeHtml(program.badge)}</span>
      </div>
      <div class="modal-body modal-body--detail">
        <h2>${escapeHtml(program.title)}</h2>
        <p class="protocol-subtitle">${escapeHtml(program.subtitle)}</p>

        <div class="meta-row">
          <span>${icon('clock')}${escapeHtml(program.duration)}</span>
          <span>${icon('video')}${escapeHtml(program.consultationType)}</span>
        </div>

        <div class="metrics-row">
          ${program.stats
            .map(
              (metric) => `
              <div class="metric-tile">
                <div class="metric-value">${escapeHtml(metric.value)}</div>
                <div class="metric-label">${escapeHtml(metric.label)}</div>
              </div>
            `
            )
            .join('')}
        </div>

        <h3>About This Program</h3>
        <p>${escapeHtml(program.about)}</p>

        <h3>Available Treatments</h3>
        <ul class="check-list">
          ${program.treatments
            .map((treatment) => `<li>${icon('check')}<span>${escapeHtml(treatment)}</span></li>`)
            .join('')}
        </ul>

        <button class="btn btn-cart block" type="button" data-add-program-cart="${escapeHtml(program.id)}">${icon(
      'cart'
    )}Add to Cart - ${formatMoney(program.price)}</button>
        <a class="btn btn-primary block" href="/checkout">Schedule a Consultation</a>
      </div>
    `
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

  function openProgramModal(programId, trigger) {
    const program = programs.get(programId)
    if (!program) return

    modalContent.innerHTML = programModalTemplate(program)
    openSurface('modal', trigger)
  }

  function openProductModal(productId, trigger) {
    const product = products.get(productId)
    if (!product) return

    modalContent.innerHTML = productModalTemplate(product)
    openSurface('modal', trigger)
  }

  function addProgram(programId) {
    const program = programs.get(programId)
    if (!program) return
    addToCart(createProtocolCartItem(program))
    renderCart()
  }

  function addProduct(productId) {
    const product = products.get(productId)
    if (!product) return
    addToCart(createProductCartItem(product))
    renderCart()
  }

  function updateProductCarousel(nextIndex) {
    const slides = Array.from(root.querySelectorAll('[data-product-slide]'))
    const dots = Array.from(root.querySelectorAll('[data-product-dot]'))

    if (!slides.length) return

    const clamped = (nextIndex + slides.length) % slides.length
    state.currentProductIndex = clamped

    slides.forEach((slide, index) => {
      const active = index === clamped
      slide.classList.toggle('is-active', active)
      slide.setAttribute('aria-hidden', active ? 'false' : 'true')
    })

    dots.forEach((dot, index) => {
      const active = index === clamped
      dot.classList.toggle('is-active', active)
      dot.setAttribute('aria-selected', active ? 'true' : 'false')
    })
  }

  // Form submission handler
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
        showSuccessMessage(
          'Thank you for your consultation request. We will contact you shortly to confirm your appointment.'
        )
        closeSurface('consultation')
        form.reset()
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to submit your consultation request right now. Please try again.'
        showSuccessMessage(message, true)
      } finally {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false
          submitButton.textContent = originalLabel || 'Request Consultation'
        }
      }
    }
  })

  function showSuccessMessage(message, isError = false) {
    // Create success message element
    const successDiv = document.createElement('div')
    successDiv.className = 'success-message'
    successDiv.textContent = message
    successDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${isError ? '#dc2626' : '#10b981'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `
    
    // Add animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
    
    // Append to body
    document.body.appendChild(successDiv)
    
    // Remove after 5 seconds
    setTimeout(() => {
      successDiv.style.animation = 'slideOut 0.3s ease'
      setTimeout(() => {
        document.body.removeChild(successDiv)
        document.head.removeChild(style)
      }, 300)
    }, 5000)
  }

  root.addEventListener('click', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null
    if (!target) return

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

    const openProgramBtn = target.closest('[data-open-program]')
    if (openProgramBtn) {
      const programId = openProgramBtn.getAttribute('data-open-program')
      if (programId) openProgramModal(programId, openProgramBtn)
      return
    }

    const openProductBtn = target.closest('[data-open-product]')
    if (openProductBtn) {
      const productId = openProductBtn.getAttribute('data-open-product')
      if (productId) openProductModal(productId, openProductBtn)
      return
    }

    const addProgramBtn = target.closest('[data-add-program-cart]')
    if (addProgramBtn) {
      const programId = addProgramBtn.getAttribute('data-add-program-cart')
      if (programId) addProgram(programId)
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

    if (target.closest('[data-product-prev]')) {
      updateProductCarousel(state.currentProductIndex - 1)
      return
    }

    if (target.closest('[data-product-next]')) {
      updateProductCarousel(state.currentProductIndex + 1)
      return
    }

    const productDot = target.closest('[data-product-dot]')
    if (productDot) {
      const index = Number(productDot.getAttribute('data-product-dot'))
      if (!Number.isNaN(index)) updateProductCarousel(index)
      return
    }

    const scrollTargetBtn = target.closest('[data-scroll-target]')
    if (scrollTargetBtn) {
      const targetSection = scrollTargetBtn.getAttribute('data-scroll-target')
      if (targetSection === 'supplements') {
        document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
      }
      if (targetSection === 'protocols') {
        document.querySelector('#protocols')?.scrollIntoView({ behavior: 'smooth' })
      }
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
  updateProductCarousel(0)
}
