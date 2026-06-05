export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function createEl(tag, className = '', html = '') {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (html) element.innerHTML = html
  return element
}

export function focusTrap(container, event) {
  if (event.key !== 'Tab') return

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  const focusable = Array.from(container.querySelectorAll(focusableSelector)).filter((element) => {
    return element.offsetParent !== null || element.getClientRects().length > 0
  })

  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

export function scrollLock(locked) {
  document.documentElement.classList.toggle('scroll-locked', locked)
  document.body.classList.toggle('scroll-locked', locked)
}

export function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function toSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const CONSULTATION_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdjpnbk'

export async function submitFormspree(formElement, extraFields = {}) {
  const formData = new FormData(formElement)
  Object.entries(extraFields).forEach(([field, value]) => {
    formData.append(field, String(value))
  })

  const response = await fetch(CONSULTATION_FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })

  if (response.ok) return

  let message = 'Unable to submit your consultation request right now. Please try again.'
  try {
    const payload = await response.json()
    if (Array.isArray(payload?.errors) && payload.errors.length) {
      message = payload.errors.map((entry) => entry.message).filter(Boolean).join(' ')
    } else if (payload?.error) {
      message = payload.error
    }
  } catch {
    // Keep generic message if response payload cannot be parsed.
  }

  throw new Error(message)
}

export async function submitConsultationRequest(formElement) {
  return submitFormspree(formElement)
}


export function setupRevealTransitions(root = document) {
  const container = root instanceof Element || root instanceof Document ? root : document
  const revealSelector = [
    '.section-panel',
    '.category-card',
    '.protocol-card',
    '.expertise-card',
    '.process-card',
    '.testimonial-card',
    '.video-card',
    '.publication-card',
    '.supplement-card',
    '.consultation-card',
    '.featured-card',
  ].join(',')

  const nodes = Array.from(container.querySelectorAll(revealSelector)).filter(
    (node) => !node.classList.contains('reveal-ready')
  )

  if (!nodes.length) return

  nodes.forEach((node) => {
    node.classList.add('reveal-ready')
  })

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((node) => node.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        activeObserver.unobserve(entry.target)
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    }
  )

  nodes.forEach((node, index) => {
    node.style.setProperty('--reveal-delay', `${Math.min(index * 45, 240)}ms`)
    const rect = node.getBoundingClientRect()
    if (rect.top <= window.innerHeight * 0.88) {
      node.classList.add('is-visible')
      return
    }
    observer.observe(node)
  })
}


export function setupFloatingTelegramButton(contact = {}) {
  const telegramUrl = String(contact.telegramUrl || '').trim()
  const telegramHandle = String(contact.telegramHandle || '@Consult_william_makis').trim()

  if (!telegramUrl || typeof document === 'undefined') return

  // Clean up any old telegram-float elements from previous HTML templates
  document.querySelectorAll('.telegram-float').forEach((node) => {
    node.remove()
  })

  let button = document.getElementById('floating-telegram-widget')
  document.querySelectorAll('.floating-telegram').forEach((node) => {
    if (node !== button) node.remove()
  })

  if (!(button instanceof HTMLAnchorElement)) {
    button = document.createElement('a')
    button.id = 'floating-telegram-widget'
    button.className = 'floating-telegram'
    button.target = '_blank'
    button.rel = 'noopener noreferrer'
    button.href = telegramUrl
    button.setAttribute('aria-label', `Message ${telegramHandle} on Telegram`)
    button.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19l-9.47 5.96-4.1-1.3c-.88-.28-.89-.86.2-1.3l15.98-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.85.42z"></path>
      </svg>
      <span class="floating-telegram-ping" aria-hidden="true"></span>
    `
    document.body.appendChild(button)
  }

  button.href = telegramUrl
  button.style.position = 'fixed'
  button.style.left = '16px'
  button.style.right = 'auto'
  button.style.bottom = 'calc(18px + env(safe-area-inset-bottom, 0px))'
  button.style.top = 'auto'
  button.style.display = 'inline-flex'
  button.style.zIndex = '2147482999'
}

export function setupFloatingWhatsAppButton(phoneNumber = '12495763746') {
  if (typeof document === 'undefined') return

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`

  let button = document.getElementById('floating-whatsapp-widget')
  document.querySelectorAll('.floating-whatsapp').forEach((node) => {
    if (node !== button) node.remove()
  })

  if (!(button instanceof HTMLAnchorElement)) {
    button = document.createElement('a')
    button.id = 'floating-whatsapp-widget'
    button.className = 'floating-whatsapp'
    button.target = '_blank'
    button.rel = 'noopener noreferrer'
    button.href = whatsappUrl
    button.setAttribute('aria-label', 'Message Dr. Makis on WhatsApp')
    button.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `
    document.body.appendChild(button)
  }

  button.href = whatsappUrl
  button.style.position = 'fixed'
  button.style.left = '16px'
  button.style.right = 'auto'
  button.style.bottom = 'calc(78px + env(safe-area-inset-bottom, 0px))'
  button.style.top = 'auto'
  button.style.display = 'inline-flex'
  button.style.zIndex = '2147482999'
}

export function setupSmartsuppWidget() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const smartsuppKey = 'f25db0a326a4529dc1a69b9ad0601d1e54185b2a'
  const scriptId = 'smartsupp-loader-script'
  const existingScript = document.getElementById(scriptId)

  window._smartsupp = window._smartsupp || {}
  window._smartsupp.key = smartsuppKey

  if (typeof window.smartsupp !== 'function') {
    const queueFn = function smartsuppQueue(...args) {
      queueFn._.push(args)
    }
    queueFn._ = []
    window.smartsupp = queueFn
  }

  if (existingScript instanceof HTMLScriptElement) return

  const script = document.createElement('script')
  script.id = scriptId
  script.type = 'text/javascript'
  script.charset = 'utf-8'
  script.async = true
  script.src = 'https://www.smartsuppchat.com/loader.js?'

  const firstScript = document.getElementsByTagName('script')[0]
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript)
  } else {
    document.head.appendChild(script)
  }
}

export function setupVapiWidget() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const scriptId = 'vapi-widget-loader-script'
  const configId = 'vapi-widget-configured'

  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js'
    script.defer = true
    script.async = true
    document.head.appendChild(script)
  }

  if (window[configId]) return

  const pinLauncher = () => {
    const launcher = document.getElementById('vapi-support-btn')
    if (!(launcher instanceof HTMLElement)) return false
    launcher.style.position = 'fixed'
    launcher.style.right = '16px'
    launcher.style.left = 'auto'
    launcher.style.bottom = 'calc(18px + env(safe-area-inset-bottom, 0px))'
    launcher.style.top = 'auto'
    launcher.style.zIndex = '2147483000'
    launcher.style.transform = 'none'
    return true
  }

  const configureWidget = () => {
    if (!window.vapiSDK?.run) return false
    window.vapiSDK.run({
      apiKey: '812deaed-dde9-4bb6-9b9a-bc5792fce3f2',
      assistant: 'c1c422d7-6d9b-4bf4-8d3e-5e5d4f1b04ed',
      config: {
        position: 'bottom-right',
        title: 'Talk to Emma',
        subtitle: 'Consultation Coordinator',
        theme: {
          primary: '#1f4fd8',
          secondary: '#ffffff',
        },
      },
    })

    let pinAttempts = 0
    const pinInterval = window.setInterval(() => {
      pinAttempts += 1
      if (pinLauncher() || pinAttempts > 80) {
        window.clearInterval(pinInterval)
      }
    }, 125)

    window[configId] = true
    return true
  }

  if (configureWidget()) return

  const waitForSDK = window.setInterval(() => {
    if (configureWidget()) {
      window.clearInterval(waitForSDK)
    }
  }, 150)

  window.setTimeout(() => {
    window.clearInterval(waitForSDK)
  }, 10000)
}
