const { createClient } = require('@sanity/client')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    // Parse the incoming data
    const data = JSON.parse(event.body)
    
    // Validate required fields
    const { name, email, careerGoal } = data
    if (!name || !email || !careerGoal) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          required: ['name', 'email', 'careerGoal']
        })
      }
    }

    // Check if member already exists
    const existingMember = await client.fetch(
      `*[_type == "memberProfile" && email == $email][0]`,
      { email }
    )

    if (existingMember) {
      return {
        statusCode: 409,
        body: JSON.stringify({ 
          error: 'Member already exists',
          member: existingMember
        })
      }
    }

    // Create new member profile
    const member = await client.create({
      _type: 'memberProfile',
      name,
      email,
      careerGoal,
      status: 'new',
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      ...data // Include any additional fields from the form
    })

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        member: member,
        message: 'Member profile created successfully'
      })
    }

  } catch (error) {
    console.error('Error submitting form:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message
      })
    }
  }
}
