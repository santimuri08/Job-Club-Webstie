// Mock test for submit-member function without Airtable connection

// Mock environment variables
process.env.AIRTABLE_API_KEY = 'test-key';
process.env.AIRTABLE_BASE_ID = 'test-base-id';
process.env.NODE_ENV = 'development';

// Mock Airtable module
const mockAirtable = {
  base: () => ({
    select: () => ({
      firstPage: () => Promise.resolve([]) // No existing members
    }),
    create: (record) => Promise.resolve({
      id: 'test-record-id',
      fields: record
    })
  })
};

// Mock the airtable require
require = function(moduleName) {
  if (moduleName === 'airtable') {
    return mockAirtable;
  }
  return require(moduleName);
};

// Load the function
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
    careerGoal: 'Get a job in tech',
    bio: 'Test bio',
    skills: 'JavaScript, React, Node.js',
    linkedin: 'https://linkedin.com/in/testuser',
    github: 'https://github.com/testuser',
    portfolio: 'https://testuser.dev'
  })
};

// Run the handler
handler(testEvent, {}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Status Code:', response.statusCode);
    console.log('Response Body:', JSON.parse(response.body));
  }
});
