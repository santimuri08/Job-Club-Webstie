# Airtable Setup Guide

## 1. Create Airtable Base

1. Go to [Airtable](https://airtable.com)
2. Sign up or log in
3. Click "Create a base" → "Start from scratch"
4. Name it "Job Club Members"
5. Choose "Start with data"

## 2. Create the Members Table

Create the following fields in your Members table:

| Field Name | Type | Description |
|-----------|------|-------------|
| Name | Single line text | Member's full name |
| Email | Email address | Member's email (unique) |
| Career Goal | Single line text | Member's career objective |
| Status | Single select | Options: new, active, inactive |
| Join Date | Date | When they joined |
| Last Active | Date | Last activity date |
| Bio | Long text | Member bio/description |
| Skills | Multiple select | Add options: JavaScript, React, Node.js, Python, etc. |
| LinkedIn | URL | LinkedIn profile URL |
| GitHub | URL | GitHub profile URL |
| Portfolio | URL | Portfolio website URL |

## 3. Get Your Base ID

1. In your Airtable base, click "Help" → "API documentation"
2. Find your "Base ID" (looks like `appXXXXXXXXXXXXXX`)
3. Copy this ID

## 4. Update Environment Variables

In your `.env` file, update:
```
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX  # Replace with your actual Base ID
AIRTABLE_TABLE_NAME=Members
```

## 5. Test the Integration

1. Run `netlify dev` in your project directory
2. Open `test-form.html` in your browser
3. Fill out the form and submit
4. Check your Airtable base for the new record

## 6. Deploy to Production

1. Add environment variables in Netlify dashboard:
   - Go to Site settings → Build & deploy → Environment
   - Add `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID`
2. Deploy your site
3. Test the live function at `/.netlify/functions/submit-member`

## Field Mapping

The Netlify function maps form fields to Airtable fields as follows:

| Form Field | Airtable Field |
|------------|----------------|
| name | Name |
| email | Email |
| careerGoal | Career Goal |
| bio | Bio |
| skills | Skills |
| linkedin | LinkedIn |
| github | GitHub |
| portfolio | Portfolio |

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables in production
- The Airtable API key should be kept secret
- Consider using Airtable's permission settings to limit access
