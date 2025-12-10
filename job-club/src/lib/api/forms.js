// Form submission utilities
export async function submitJoinForm(formData) {
  try {
    const response = await fetch('/.netlify/functions/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Submission failed')
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Form submission error:', error)
    return { success: false, error: error.message }
  }
}

export async function submitEventRegistration(eventId, memberEmail) {
  try {
    const response = await fetch('/.netlify/functions/register-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        memberEmail,
        registrationDate: new Date().toISOString()
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed')
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Event registration error:', error)
    return { success: false, error: error.message }
  }
}

export async function subscribeToNewsletter(email) {
  try {
    const response = await fetch('/.netlify/functions/newsletter-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subscriptionDate: new Date().toISOString()
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Subscription failed')
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, error: error.message }
  }
}
