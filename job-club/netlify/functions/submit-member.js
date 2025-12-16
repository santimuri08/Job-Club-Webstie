const Airtable = require('airtable');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Required fields validation
    const requiredFields = ['name', 'email', 'careerGoal'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'Missing required fields',
          missing: missingFields
        })
      };
    }

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    // Check for existing member
    const existing = await base('Members')
      .select({ 
        filterByFormula: `{Email} = '${data.email.replace("'", "''")}'`,
        maxRecords: 1
      })
      .firstPage();

    if (existing && existing.length > 0) {
      return {
        statusCode: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'Member already exists',
          id: existing[0].id
        })
      };
    }

    // Create new member
    const record = await base('Members').create({
      'Name': data.name,
      'Email': data.email,
      'Career Goal': data.careerGoal,
      'Status': 'new',
      'Join Date': new Date().toISOString(),
      'Last Active': new Date().toISOString(),
      'Bio': data.bio || '',
      'Skills': Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''),
      ...(data.linkedin && { 'LinkedIn': data.linkedin }),
      ...(data.github && { 'GitHub': data.github }),
      ...(data.portfolio && { 'Portfolio': data.portfolio })
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true,
        id: record.id,
        message: 'Member created successfully'
      })
    };

  } catch (error) {
    console.error('Error in submit-member function:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      })
    };
  }
};
