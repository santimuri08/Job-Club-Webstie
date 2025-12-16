export default {
  name: 'memberProfile',
  title: 'Member Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: [
        Rule => Rule.required().email(),
        Rule => Rule.custom(email => {
          if (!email.includes('@njit.edu')) {
            return 'Must use an NJIT email address';
          }
          return true;
        })
      ]
    },
    {
      name: 'major',
      title: 'Major',
      type: 'string'
    },
    {
      name: 'graduationYear',
      title: 'Graduation Year',
      type: 'string'
    },
    {
      name: 'careerGoal',
      title: 'Career Goal',
      type: 'string',
      options: {
        list: [
          { title: 'Software Engineer', value: 'swe' },
          { title: 'Product Manager', value: 'pm' },
          { title: 'Data Scientist', value: 'ds' },
          { title: 'AI/ML Engineer', value: 'ai' },
          { title: 'UX/UI Designer', value: 'ux' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'onboarding',
      title: 'Onboarding',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'Onboarding Status',
          type: 'string',
          options: {
            list: [
              { title: 'New', value: 'new' },
              { title: 'In Progress', value: 'in_progress' },
              { title: 'Completed', value: 'completed' }
            ]
          },
          initialValue: 'new'
        },
        {
          name: 'submittedAt',
          title: 'Submitted At',
          type: 'datetime'
        },
        {
          name: 'completedAt',
          title: 'Completed At',
          type: 'datetime'
        },
        {
          name: 'missingPrerequisites',
          title: 'Missing Prerequisites',
          type: 'object',
          fields: [
            {
              name: 'linkedin',
              title: 'Missing LinkedIn',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'github',
              title: 'Missing GitHub',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'portfolio',
              title: 'Missing Portfolio',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'calendly',
              title: 'Missing Calendly',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ]
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Active', value: 'active' },
          { title: 'Alumni', value: 'alumni' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A short bio/description'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'Your LinkedIn profile URL'
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'Your GitHub profile URL'
        },
        {
          name: 'portfolio',
          title: 'Portfolio/Website',
          type: 'url'
        },
        {
          name: 'calendly',
          title: 'Calendly Link',
          type: 'url',
          description: 'Your Calendly scheduling link'
        }
      ]
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'joinDate',
      title: 'Join Date',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    },
    {
      name: 'lastActive',
      title: 'Last Active',
      type: 'datetime',
      readOnly: true
    },
    {
      name: 'isAdmin',
      title: 'Is Admin',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'preferences',
      title: 'Preferences',
      type: 'object',
      fields: [
        {
          name: 'notifications',
          title: 'Email Notifications',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'emailFrequency',
          title: 'Email Frequency',
          type: 'string',
          options: {
            list: [
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-weekly', value: 'biweekly' },
              { title: 'Monthly', value: 'monthly' }
            ]
          },
          initialValue: 'weekly'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'careerGoal',
      media: 'profileImage'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: `Career Goal: ${subtitle}`,
        media: media
      };
    }
  }
};
