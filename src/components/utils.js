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
  const telegramHandle = String(contact.telegramHandle || '@reach_dr_makis').trim()

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
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 3 3.7 10.2c-1 .4-1 1.8 0 2.2l4.2 1.5 1.5 4.2c.4 1 1.8 1 2.2 0L21 3z"></path>
        <path d="M8 13.8 21 3"></path>
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
