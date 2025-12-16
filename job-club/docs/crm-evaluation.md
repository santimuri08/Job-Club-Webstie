# CRM Platform Evaluation for Job Club

## Requirements
- Track member profiles and onboarding status
- Store career goals and skill information
- Integration with Sanity CMS
- API access for automation
- Free/low-cost for student organization
- Simple setup and maintenance

## Platform Comparison

### Airtable
**Pros:**
- Free tier with 1,000 records
- Visual database with custom fields
- Excellent API and webhook support
- Easy to set up automations
- Great for small teams
- Can create custom interfaces
- Integrates with Zapier/Make

**Cons:**
- Limited automation in free tier
- Record limits on free plan
- Learning curve for complex setups

**Cost:** Free (up to 1,000 records), then $10/month

### HubSpot
**Pros:**
- Robust CRM features
- Excellent contact management
- Marketing automation tools
- Professional interface
- Good documentation
- Scalable for growth

**Cons:**
- Free tier limited to 1 million contacts but limited features
- More complex setup
- Overkill for small organization
- Marketing tools require paid plans

**Cost:** Free (limited), then $45/month starter

### Notion
**Pros:**
- Flexible database structure
- Free for personal use
- Great documentation capabilities
- Can create member profiles
- Clean interface
- Good for small organizations

**Cons:**
- Limited API capabilities
- No native CRM features
- Webhook support limited
- Not designed for CRM workflows
- Automation requires third-party tools

**Cost:** Free (personal), $8/month team

## Recommendation: Airtable

**Why Airtable:**
1. **Perfect Fit**: Designed exactly for this use case
2. **API First**: Excellent webhook and API support
3. **Cost Effective**: Free tier sufficient for current needs
4. **Easy Integration**: Works well with automation platforms
5. **Scalable**: Can grow with the organization
6. **Visual**: Easy for team members to understand

## Next Steps
1. Create Airtable base
2. Set up member tracking table
3. Configure API access
4. Create webhook endpoints
5. Test integration with Sanity

## Field Mapping
| Sanity Field | Airtable Field | Type |
|-------------|----------------|------|
| name | Name | Single line text |
| email | Email | Email |
| careerGoal | Career Goal | Single line text |
| bio | Bio | Long text |
| status | Status | Single select (new, active, inactive) |
| joinDate | Join Date | Date |
| lastActive | Last Active | Date |
| skills | Skills | Multi-select |
| socialLinks | LinkedIn | URL |
| socialLinks | GitHub | URL |
| socialLinks | Portfolio | URL |

## Integration Points
- Sanity webhook → Airtable record creation
- Form submissions → Airtable + Sanity
- Member updates → Sync both ways
- Automation triggers based on status changes
