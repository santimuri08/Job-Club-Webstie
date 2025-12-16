const { handler } = require('./netlify/functions/submit-member.js');

// Test event
const testEvent = {
  httpMethod: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    major: 'Computer Science',
    graduationYear: '2024',
    linkedinProfile: 'https://linkedin.com/in/testuser'
  })
};

// Run the handler
handler(testEvent, {}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response);
    console.log('Body:', response.body);
  }
});
