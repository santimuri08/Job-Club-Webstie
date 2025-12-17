(function() {
  'use strict'

  const form = document.getElementById('join-form')
  if (!form) return

  const successMessage = document.getElementById('join-success-message')
  const submitButton = form.querySelector('button[type="submit"]')

  function setSubmitting(isSubmitting) {
    if (submitButton) {
      submitButton.disabled = isSubmitting
      submitButton.setAttribute('aria-busy', String(isSubmitting))
    }
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    try {
      setSubmitting(true)

      const resp = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          major: data.major,
          graduationYear: data.graduationYear,
          careerPath: data.careerPath,
          experience: data.experience,
          goals: data.goals
        })
      })

      const rawText = await resp.text().catch(function() {
        return ''
      })

      const json = (function() {
        try {
          return rawText ? JSON.parse(rawText) : {}
        } catch {
          return {}
        }
      })()

      if (!resp.ok) {
        const messageFromJson = json && (json.message || json.error)
        const messageFromText = rawText && rawText.length < 400 ? rawText : ''
        const message =
          messageFromJson || messageFromText || `Submission failed (HTTP ${resp.status}${resp.statusText ? ` ${resp.statusText}` : ''})`
        throw new Error(message)
      }

      form.hidden = true
      if (successMessage) successMessage.hidden = false

      if (window.trackEvent) {
        window.trackEvent('form_submission', {careerPath: data.careerPath})
      }
    } catch (err) {
      console.error('Join form submission error:', err)
      alert((err && err.message) || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  })
})()
