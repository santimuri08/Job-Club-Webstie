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

      const json = await resp.json().catch(function() {
        return {}
      })

      if (!resp.ok) {
        const message = (json && (json.message || json.error)) || 'Submission failed'
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
