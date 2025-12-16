// Simple test to verify function structure and validation

// Read the function file
const fs = require('fs');
const path = require('path');

// Test validation logic
function testValidation() {
  console.log('Testing validation logic...');
  
  // Test data
  const validData = {
    name: 'Test User',
    email: 'test@example.com',
    careerGoal: 'Get a job in tech'
  };
  
  const invalidData = {
    name: 'Test User',
    email: 'test@example.com'
    // missing careerGoal
  };
  
  // Validation function (copied from submit-member.js)
  function validateData(data) {
    const requiredFields = ['name', 'email', 'careerGoal'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return {
        isValid: false,
        missing: missingFields
      };
    }
    
    return { isValid: true };
  }
  
  // Test valid data
  const validResult = validateData(validData);
  console.log('Valid data test:', validResult.isValid ? 'PASS' : 'FAIL');
  
  // Test invalid data
  const invalidResult = validateData(invalidData);
  console.log('Invalid data test:', !invalidResult.isValid ? 'PASS' : 'FAIL');
  console.log('Missing fields:', invalidResult.missing);
}

// Test function file exists
function testFileExists() {
  const functionPath = path.join(__dirname, 'netlify', 'functions', 'submit-member.js');
  const exists = fs.existsSync(functionPath);
  console.log('Function file exists:', exists ? 'PASS' : 'FAIL');
  
  if (exists) {
    const content = fs.readFileSync(functionPath, 'utf8');
    const hasHandler = content.includes('exports.handler');
    const hasAirtable = content.includes('require(\'airtable\')');
    const hasValidation = content.includes('requiredFields');
    
    console.log('Has handler:', hasHandler ? 'PASS' : 'FAIL');
    console.log('Has airtable import:', hasAirtable ? 'PASS' : 'FAIL');
    console.log('Has validation:', hasValidation ? 'PASS' : 'FAIL');
  }
}

// Run tests
testValidation();
testFileExists();
