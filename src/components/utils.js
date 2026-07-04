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

/**
 * 3D WebGL molecular hero scene using Three.js.
 * Dark gradient background with glowing molecular structures,
 * DNA helix, floating particles, and cinematic camera orbit.
 */
export function setupHeroParticles(container) {
  if (typeof document === 'undefined' || !container) return

  import('three').then((THREE) => {
    /* Remove existing static background */
    const oldBg = container.querySelector('.hero-bg')
    if (oldBg) oldBg.remove()

    const rect = container.getBoundingClientRect()
    let W = rect.width
    let H = rect.height

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x040e1a, 1)
    const canvas = renderer.domElement
    canvas.className = 'hero-bg hero-particles-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;'
    container.insertBefore(canvas, container.firstChild)

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.set(0, 0, 28)

    /* ── Palette ── */
    const TEAL = new THREE.Color(0x0f9d92)
    const CYAN = new THREE.Color(0x00e5ff)
    const MAGENTA = new THREE.Color(0xd946ef)
    const GOLD = new THREE.Color(0xf4b321)
    const WHITE = new THREE.Color(0xffffff)
    const PALETTE = [TEAL, CYAN, MAGENTA, GOLD, WHITE, TEAL, TEAL, CYAN]

    /* ── Background gradient (subtle dark gradient mesh) ── */
    const bgGeo = new THREE.PlaneGeometry(120, 80)
    const bgMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec3 deep = vec3(0.016, 0.055, 0.102);
          vec3 teal = vec3(0.024, 0.12, 0.16);
          vec3 purple = vec3(0.08, 0.02, 0.14);
          float t = sin(uTime * 0.15 + vUv.x * 3.0) * 0.5 + 0.5;
          vec3 col = mix(deep, mix(teal, purple, vUv.x + sin(uTime * 0.1) * 0.15), vUv.y * 0.8 + t * 0.2);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
    })
    const bgMesh = new THREE.Mesh(bgGeo, bgMat)
    bgMesh.position.z = -50
    scene.add(bgMesh)

    /* ── Glow sprite texture ── */
    function createGlowTexture(size) {
      const c = document.createElement('canvas')
      c.width = c.height = size
      const ctx = c.getContext('2d')
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.15, 'rgba(255,255,255,0.8)')
      g.addColorStop(0.4, 'rgba(255,255,255,0.25)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, size, size)
      return new THREE.CanvasTexture(c)
    }
    const glowTex = createGlowTexture(128)

    /* ── Molecular nodes ── */
    const NODE_COUNT = 180
    const SPREAD = 30
    const nodePositions = []
    const nodeColors = []
    const nodeSizes = []
    const nodeVelocities = []

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD * 2
      const y = (Math.random() - 0.5) * SPREAD * 1.2
      const z = (Math.random() - 0.5) * SPREAD * 0.8
      nodePositions.push(x, y, z)
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      nodeColors.push(c.r, c.g, c.b)
      nodeSizes.push(0.12 + Math.random() * 0.25)
      nodeVelocities.push(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.004,
      )
    }

    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3))
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3))
    nodeGeo.setAttribute('size', new THREE.Float32BufferAttribute(nodeSizes, 1))

    const nodeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: glowTex },
        uTime: { value: 0 },
        uScale: { value: H * window.devicePixelRatio },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uScale;
        void main() {
          vColor = color;
          float pulse = 0.8 + 0.4 * sin(uTime * 1.5 + position.x * 2.0 + position.y * 1.5);
          vAlpha = pulse;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uScale * pulse / -mvPos.z;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor * 1.6, tex.a * vAlpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const nodePoints = new THREE.Points(nodeGeo, nodeMat)
    scene.add(nodePoints)

    /* ── Connection lines ── */
    const CONNECT_DIST = 5.5
    const MAX_LINES = 600
    const linePositions = new Float32Array(MAX_LINES * 6)
    const lineColors = new Float32Array(MAX_LINES * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3))
    lineGeo.setDrawRange(0, 0)
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    /* ── DNA double helix ── */
    const helixGroup = new THREE.Group()
    const HELIX_NODES = 40
    const HELIX_RADIUS = 3.5
    const HELIX_PITCH = 0.7
    const helixMat = new THREE.MeshBasicMaterial({
      color: TEAL,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    const helixMat2 = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    const sphereGeo = new THREE.SphereGeometry(0.12, 8, 8)
    const bondGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 4)

    for (let i = 0; i < HELIX_NODES; i++) {
      const t = (i / HELIX_NODES) * Math.PI * 6
      const y = (i / HELIX_NODES - 0.5) * HELIX_NODES * HELIX_PITCH
      const x1 = Math.cos(t) * HELIX_RADIUS
      const z1 = Math.sin(t) * HELIX_RADIUS
      const x2 = Math.cos(t + Math.PI) * HELIX_RADIUS
      const z2 = Math.sin(t + Math.PI) * HELIX_RADIUS

      const s1 = new THREE.Mesh(sphereGeo, helixMat)
      s1.position.set(x1, y, z1)
      helixGroup.add(s1)

      const s2 = new THREE.Mesh(sphereGeo, helixMat2)
      s2.position.set(x2, y, z2)
      helixGroup.add(s2)

      /* Connecting bond */
      if (i % 3 === 0) {
        const bond = new THREE.Mesh(bondGeo, new THREE.MeshBasicMaterial({
          color: GOLD,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
        }))
        const mx = (x1 + x2) / 2
        const mz = (z1 + z2) / 2
        const dist = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)
        bond.scale.set(1, dist, 1)
        bond.position.set(mx, y, mz)
        bond.lookAt(x2, y, z2)
        bond.rotateX(Math.PI / 2)
        helixGroup.add(bond)
      }
    }
    helixGroup.position.set(12, 0, -5)
    helixGroup.rotation.z = 0.3
    scene.add(helixGroup)

    /* ── Large volumetric orbs ── */
    const orbGroup = new THREE.Group()
    const orbData = [
      { pos: [-15, 8, -10], color: TEAL, size: 6, alpha: 0.08 },
      { pos: [18, -5, -8], color: MAGENTA, size: 5, alpha: 0.06 },
      { pos: [-8, -10, -12], color: CYAN, size: 7, alpha: 0.07 },
      { pos: [10, 12, -6], color: GOLD, size: 4, alpha: 0.05 },
      { pos: [0, 0, -15], color: TEAL, size: 8, alpha: 0.06 },
    ]
    orbData.forEach((o) => {
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        color: o.color,
        transparent: true,
        opacity: o.alpha,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.position.set(...o.pos)
      sprite.scale.set(o.size * 6, o.size * 6, 1)
      sprite.userData = { baseY: o.pos[1], speed: 0.2 + Math.random() * 0.3 }
      orbGroup.add(sprite)
    })
    scene.add(orbGroup)

    /* ── Ambient dust particles ── */
    const DUST_COUNT = 500
    const dustPositions = new Float32Array(DUST_COUNT * 3)
    const dustColors = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 60
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 40
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      dustColors[i * 3] = c.r
      dustColors[i * 3 + 1] = c.g
      dustColors[i * 3 + 2] = c.b
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3))
    dustGeo.setAttribute('color', new THREE.Float32BufferAttribute(dustColors, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: glowTex,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    /* ── Animation ── */
    let animId = null
    let running = true
    const clock = new THREE.Clock()

    function updateConnections(positions) {
      const pos = positions
      let idx = 0
      for (let i = 0; i < NODE_COUNT && idx < MAX_LINES; i++) {
        for (let j = i + 1; j < NODE_COUNT && idx < MAX_LINES; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECT_DIST) {
            const fade = 1 - dist / CONNECT_DIST
            const ci = nodeColors
            linePositions[idx * 6] = pos[i * 3]
            linePositions[idx * 6 + 1] = pos[i * 3 + 1]
            linePositions[idx * 6 + 2] = pos[i * 3 + 2]
            linePositions[idx * 6 + 3] = pos[j * 3]
            linePositions[idx * 6 + 4] = pos[j * 3 + 1]
            linePositions[idx * 6 + 5] = pos[j * 3 + 2]
            lineColors[idx * 6] = ci[i * 3] * fade
            lineColors[idx * 6 + 1] = ci[i * 3 + 1] * fade
            lineColors[idx * 6 + 2] = ci[i * 3 + 2] * fade
            lineColors[idx * 6 + 3] = ci[j * 3] * fade
            lineColors[idx * 6 + 4] = ci[j * 3 + 1] * fade
            lineColors[idx * 6 + 5] = ci[j * 3 + 2] * fade
            idx++
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true
      lineGeo.setDrawRange(0, idx * 2)
    }

    function animate() {
      if (!running) return
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      /* Camera orbit */
      camera.position.x = Math.sin(t * 0.12) * 6
      camera.position.y = Math.cos(t * 0.08) * 3
      camera.lookAt(0, 0, 0)

      /* Move nodes */
      const pos = nodeGeo.attributes.position.array
      for (let i = 0; i < NODE_COUNT; i++) {
        pos[i * 3] += nodeVelocities[i * 3] + Math.sin(t * 0.5 + i) * 0.002
        pos[i * 3 + 1] += nodeVelocities[i * 3 + 1] + Math.cos(t * 0.4 + i * 0.7) * 0.002
        pos[i * 3 + 2] += nodeVelocities[i * 3 + 2]
        /* Soft boundary bounce */
        for (let a = 0; a < 3; a++) {
          const limit = a === 1 ? SPREAD * 0.6 : SPREAD
          if (Math.abs(pos[i * 3 + a]) > limit) {
            nodeVelocities[i * 3 + a] *= -1
            pos[i * 3 + a] = Math.sign(pos[i * 3 + a]) * limit
          }
        }
      }
      nodeGeo.attributes.position.needsUpdate = true

      /* Update connections every 3rd frame for perf */
      if (Math.floor(t * 60) % 3 === 0) {
        updateConnections(pos)
      }

      /* Rotate DNA helix */
      helixGroup.rotation.y = t * 0.2
      helixGroup.position.y = Math.sin(t * 0.3) * 2

      /* Float orbs */
      orbGroup.children.forEach((orb) => {
        orb.position.y = orb.userData.baseY + Math.sin(t * orb.userData.speed) * 2
      })

      /* Rotate dust slowly */
      dust.rotation.y = t * 0.02
      dust.rotation.x = Math.sin(t * 0.01) * 0.1

      /* Background time */
      bgMat.uniforms.uTime.value = t
      nodeMat.uniforms.uTime.value = t

      renderer.render(scene, camera)
    }

    /* ── Resize ── */
    function onResize() {
      const r = container.getBoundingClientRect()
      W = r.width
      H = r.height
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
      nodeMat.uniforms.uScale.value = H * Math.min(window.devicePixelRatio, 2)
    }
    window.addEventListener('resize', onResize)

    /* ── Visibility: pause when off-screen ── */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!running) {
          running = true
          clock.start()
          animate()
        }
      } else {
        running = false
        if (animId) {
          cancelAnimationFrame(animId)
          animId = null
        }
      }
    }, { threshold: 0 })
    observer.observe(container)

    animate()
  }).catch((err) => {
    console.warn('Hero WebGL failed to load, falling back gracefully:', err)
  })
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
