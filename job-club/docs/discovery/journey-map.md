# Customer Journey Map

## Primary Persona: Jordan (Career-Switching Senior)

> Jordan is a senior graduating in 6 months who needs to build an AI portfolio fast to compete in the job market.

---

## Journey Overview
```
AWARENESS → INTEREST → JOIN → ONBOARD → ENGAGE → CAREER READY
```

---

## Stage 1: AWARENESS

### Touchpoint
- Instagram post from NJIT account
- Campus flyer in GITC building
- Friend recommendation
- Professor mention in class

### User Action
- Sees Job Club promoted
- Clicks link or scans QR code
- Lands on Introduction page (3D cube)
- Clicks "Get Started" to view homepage

### Thoughts
> "Is this legit? Will it actually help me? I've seen so many 'career help' things that don't deliver."

### Emotions
😐 **Curious but skeptical**

### Pain Points
- Doesn't know if this is worth their limited time
- Has been disappointed by career resources before
- Wonders if it's just another email list

### Opportunities
- Clear value proposition on homepage
- Social proof (member count, testimonials)
- Professional design builds trust
- Show quick wins ("Get your checklist in 2 minutes")

### Success Metrics
- Homepage bounce rate < 40%
- Time on page > 30 seconds

---

## Stage 2: INTEREST

### Touchpoint
- Homepage (`/home/`)
- Events page (`/events/`)
- Resources page (`/resources/`)

### User Action
- Reads about Job Club benefits
- Watches hero video
- Browses upcoming events
- Checks out resource library
- Considers joining

### Thoughts
> "This looks useful. The events seem relevant. What do I have to do to join?"

### Emotions
🤔 **Interested, evaluating**

### Pain Points
- Wants to know time commitment
- Worried about spam emails
- Unsure what "onboarding" means

### Opportunities
- Show clear CTA (Join button prominent)
- Highlight quick wins ("Get your personalized checklist today")
- Show upcoming events as value preview
- Display resource previews

### Success Metrics
- Click-through to Join page > 25%
- Events page views
- Resource page engagement

---

## Stage 3: JOIN

### Touchpoint
- Join page (`/join/`)
- Onboarding form

### User Action
- Fills out onboarding form
- Enters name, NJIT email, major
- Provides LinkedIn, GitHub URLs (or leaves blank)
- Selects career goal
- Submits form

### Thoughts
> "Hope this is worth it. My LinkedIn is embarrassing—I haven't updated it since freshman year."

### Emotions
😬 **Committed but nervous**

### Pain Points
- Embarrassed about incomplete profiles
- Worried about judgment
- Form feels like commitment

### Opportunities
- Make form feel easy (clear labels, helpful placeholders)
- Reassure: "We'll help you improve these profiles"
- Optional fields reduce friction
- Show what they'll get after submitting
- Real-time validation prevents frustration

### Success Metrics
- Form completion rate > 70%
- Form abandonment < 30%
- Valid submissions (no errors)

---

## Stage 4: ONBOARD

### Touchpoint
- Success message on website
- Personalized email (via Zapier)
- Discord welcome message
- CRM entry created

### User Action
- Sees success confirmation
- Receives personalized checklist email
- Gets Discord intro posted
- Reviews tasks to complete

### Thoughts
> "Okay, I know exactly what to do now. They identified that I'm missing a portfolio and Calendly—that's actually helpful."

### Emotions
😊 **Relieved, motivated**

### Pain Points
- Email might go to spam
- Checklist might feel overwhelming
- Might not join Discord immediately

### Opportunities
- Personalized email based on missing items
- Clear, prioritized next steps
- Discord intro creates accountability
- Follow-up reminder if no engagement

### Success Metrics
- Email open rate > 50%
- Discord join rate > 40%
- Checklist item completion started > 30%

---

## Stage 5: ENGAGE

### Touchpoint
- Events (workshops, office hours)
- Resources (guides, templates)
- Discord community
- Follow-up emails

### User Action
- Attends first workshop
- Completes checklist items (LinkedIn, GitHub, portfolio)
- Asks questions in Discord
- Uses resource guides
- Connects with other members

### Thoughts
> "I'm making progress. This community is actually helpful—people answer my questions."

### Emotions
🚀 **Motivated, connected**

### Pain Points
- Might lose momentum after initial excitement
- Events might conflict with schedule
- Checklist items take time

### Opportunities
- Regular events keep engagement
- Progress tracking and reminders
- Peer support in Discord
- Celebrate milestones
- Mentor matching for accountability

### Success Metrics
- Event attendance rate
- Checklist completion rate > 60%
- Discord messages sent
- Resource downloads

---

## Stage 6: CAREER READY

### Touchpoint
- Completed portfolio
- Optimized LinkedIn
- Job applications
- Interview prep

### User Action
- Has complete professional portfolio
- LinkedIn fully optimized
- GitHub showcases AI projects
- Calendly set up for networking
- Applies to AI jobs with confidence
- Recommends Job Club to friends

### Thoughts
> "I'm ready. Job Club made the difference. I went from nothing to a real portfolio in 3 months."

### Emotions
💪 **Confident, grateful**

### Pain Points
- Job search is still stressful
- Rejection is part of the process
- Might need ongoing support

### Opportunities
- Showcase success stories
- Alumni network for continued support
- Referral program ("Invite a friend")
- Track job placement outcomes

### Success Metrics
- Portfolio completion rate > 50%
- Job/internship placement rate
- Referrals generated
- NPS score > 8

---

## Journey Map Summary

| Stage | Emotion | Key Action | Success Metric |
|-------|---------|------------|----------------|
| Awareness | 😐 Curious | Lands on site | Bounce rate < 40% |
| Interest | 🤔 Evaluating | Explores pages | CTR to Join > 25% |
| Join | 😬 Committed | Submits form | Completion > 70% |
| Onboard | 😊 Relieved | Gets checklist | Email open > 50% |
| Engage | 🚀 Motivated | Attends events | Checklist > 60% |
| Career Ready | 💪 Confident | Applies to jobs | Placement tracked |

---

## Moments That Matter

### 🌟 Critical Moments (Make or Break)
1. **First 10 seconds on homepage** - Must communicate value immediately
2. **Form submission** - Must feel easy and worthwhile
3. **First email received** - Must be personalized and actionable
4. **First event attended** - Must feel welcoming and valuable

### ⚠️ Risk Points (Where We Lose People)
1. Homepage doesn't load fast → bounce
2. Form feels too long → abandonment
3. Email goes to spam → lost engagement
4. Discord feels intimidating → no community connection
5. No follow-up → momentum dies

---

## Automation Touchpoints

| Trigger | Action | Channel |
|---------|--------|---------|
| Form submitted | Create member in Sanity + Airtable | Backend |
| Form submitted | Send personalized checklist | Email (Zapier) |
| Form submitted | Post intro to #jobclub-intros | Discord (Zapier) |
| Event published | Announce to community | Discord (Zapier) |
| Resource published | Share with members | Discord (Zapier) |
