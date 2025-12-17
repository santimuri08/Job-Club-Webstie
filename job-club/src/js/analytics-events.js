(function() {
  'use strict'

  if (!window.trackEvent) return

  function onClick(e) {
    const el = e.target && e.target.closest ? e.target.closest('[data-track-event]') : null
    if (!el) return

    const eventName = el.getAttribute('data-track-event')
    if (!eventName) return

    const props = {}
    const label = el.getAttribute('data-track-label')
    const href = el.getAttribute('href')

    if (label) props.label = label
    if (href) props.href = href

    window.trackEvent(eventName, props)
  }

  document.addEventListener('click', onClick)
})()
