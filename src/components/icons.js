const ICONS = {
  globe: `<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a14 14 0 0 1 0 18"></path><path d="M12 3a14 14 0 0 0 0 18"></path>`,
  chevronDown: `<path d="m6 9 6 6 6-6"></path>`,
  cart: `<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.6 13h10.8l2-8H6"></path>`,
  menu: `<path d="M3 12h18"></path><path d="M3 6h18"></path><path d="M3 18h18"></path>`,
  pill: `<path d="m9 3 12 12"></path><path d="M15 3a6 6 0 0 1 0 12L9 9a6 6 0 1 1 6-6Z"></path>`,
  document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h8"></path>`,
  chat: `<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H5l-4 2 1.5-4.5A8.5 8.5 0 1 1 21 11.5z"></path>`,
  microscope: `<path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 3 9 8"></path><path d="M11 6 8 9"></path><path d="M12 12a4 4 0 1 1-5.66 5.66"></path><path d="M10 14h7"></path>`,
  dna: `<path d="M4 4c4 0 4 6 8 6s4-6 8-6"></path><path d="M4 20c4 0 4-6 8-6s4 6 8 6"></path><path d="M8 5v14"></path><path d="M16 5v14"></path>`,
  heart: `<path d="M20.8 7.6a5.5 5.5 0 0 0-9.8-3.3A5.5 5.5 0 0 0 1.2 7.6c0 6.3 9.8 12.4 9.8 12.4s9.8-6.1 9.8-12.4Z"></path>`,
  brain: `<path d="M9 2a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 2 2.83V14a3 3 0 0 0 3 3h1"></path><path d="M15 2a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3 3 3 0 0 1-2 2.83V14a3 3 0 0 1-3 3h-1"></path><path d="M12 2v20"></path>`,
  syringe: `<path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="m2 22 7-7"></path><path d="m10 14 8-8"></path><path d="m13 2 9 9"></path>`,
  stethoscope: `<path d="M6 2v7a4 4 0 0 0 8 0V2"></path><circle cx="18" cy="18" r="3"></circle><path d="M14 10v4a4 4 0 0 0 4 4"></path>`,
  clipboard: `<rect x="7" y="4" width="10" height="16" rx="2"></rect><path d="M9 4.5h6v3H9z"></path><path d="M10 11h4"></path><path d="M10 15h4"></path>`,
  refresh: `<path d="M20 11a8 8 0 0 0-14-4"></path><path d="M4 7V3h4"></path><path d="M4 13a8 8 0 0 0 14 4"></path><path d="M20 17v4h-4"></path>`,
  search: `<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>`,
  link: `<path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1.5 1.5"></path><path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7L6.5 11.5"></path>`,
  calendar: `<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path>`,
  arrowRight: `<path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path>`,
  arrowLeft: `<path d="M19 12H5"></path><path d="m11 5-7 7 7 7"></path>`,
  externalLink: `<path d="M14 5h5v5"></path><path d="M10 14 19 5"></path><path d="M19 14v5h-5"></path><path d="M5 10v9h9"></path>`,
  clock: `<circle cx="12" cy="12" r="9"></circle><path d="M12 7v6l4 2"></path>`,
  video: `<rect x="2" y="6" width="14" height="12" rx="2"></rect><path d="m16 10 6-3v10l-6-3z"></path>`,
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
  badge: `<circle cx="12" cy="8" r="6"></circle><path d="m9 14 3 7 3-7"></path>`,
  close: `<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>`,
  trash: `<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>`,
  minus: `<path d="M5 12h14"></path>`,
  plus: `<path d="M12 5v14"></path><path d="M5 12h14"></path>`,
  star: `<path d="m12 2 3.1 6.3 7 1-5 4.8 1.2 6.9L12 18l-6.3 3.2 1.2-6.9-5-4.8 7-1z"></path>`,
  telegram: `<path fill="currentColor" stroke="none" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19l-9.47 5.96-4.1-1.3c-.88-.28-.89-.86.2-1.3l15.98-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.85.42z"></path>`,
  mail: `<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>`,
  mapPin: `<path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"></path><circle cx="12" cy="10" r="2"></circle>`,
  shield: `<path d="M12 2 4 5v6c0 5 3 9 8 11 5-2 8-6 8-11V5z"></path>`,
  box: `<path d="M3 7 12 2l9 5-9 5-9-5Z"></path><path d="M3 7v10l9 5 9-5V7"></path><path d="M12 12v10"></path>`,
  truck: `<path d="M10 17h4"></path><path d="M1 4h12v10H1z"></path><path d="M13 8h5l3 3v3h-8z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>`,
  quote: `<path d="M9 7H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2"></path><path d="M19 7h-4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2"></path>`,
  play: `<polygon points="9,7 19,12 9,17" fill="currentColor" stroke="none"></polygon>`,
  eye: `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle>`,
  info: `<circle cx="12" cy="12" r="9"></circle><path d="M12 8v1"></path><path d="M12 12v4"></path>`,
  facebook: `<path d="M14 9h3V5h-3a4 4 0 0 0-4 4v3H7v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z"></path>`,
  twitter: `<path d="M22 5.9c-.7.3-1.5.5-2.3.6a4.1 4.1 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 12 8.8c0 .3 0 .6.1.9A11.7 11.7 0 0 1 3.6 5a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.2-.2-1.7-.4 0 1.9 1.3 3.6 3.2 4-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1a4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.5a11.6 11.6 0 0 0 6.3 1.8c7.6 0 11.8-6.3 11.8-11.8V8a8.6 8.6 0 0 0 2.1-2.1Z"></path>`,
  linkedin: `<path d="M6 9v12"></path><path d="M6 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path><path d="M11 21V9h4v1.7c.6-1 1.7-1.7 3.4-1.7 2.4 0 3.6 1.6 3.6 4.6V21h-4v-6.5c0-1.6-.6-2.6-1.9-2.6-1.5 0-2.1 1-2.1 2.6V21z"></path>`,
  instagram: `<rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle>`,
  check: `<path d="m5 12 4 4 10-10"></path>`,
  whatsapp: `<path d="M17.4 16.4c-.3.5-.8.9-1.3 1.1-.6.2-1.2.3-1.8.3s-1.2-.1-1.8-.3c-.5-.2-1-.6-1.3-1.1-.3-.5-.4-1.1-.4-1.8s.1-1.2.4-1.8c.3-.5.8-.9 1.3-1.1.2-.1.4-.2.6-.2h1c.2 0 .4.1.6.2.5.2 1 .6 1.3 1.1.3.5.4 1.1.4 1.8s-.1 1.2-.4 1.8zM13 15h.5c.2 0 .4-.1.5-.2l1-1c.2-.2.3-.4.3-.6s-.1-.4-.3-.6l-1-1c-.2-.2-.4-.3-.6-.3h-.5c-.2 0-.4.1-.5.2l-1 1c-.2.2-.3.4-.3.6s.1.4.3.6l1 1c.1.1.3.2.5.2z"></path><path d="M18 2h-8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6z"></path>`,
}

export function icon(name, className = '', options = {}) {
  const path = ICONS[name]
  if (!path) {
    return ''
  }

  const {
    viewBox = '0 0 24 24',
    strokeWidth = 2,
    fill = 'none',
    stroke = 'currentColor',
    attrs = '',
  } = options

  return `<svg class="icon ${className}" viewBox="${viewBox}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${path}</svg>`
}
