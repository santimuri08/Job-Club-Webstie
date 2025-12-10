export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        }
      ]
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Networking', value: 'networking' },
          { title: 'Hackathon', value: 'hackathon' },
          { title: 'Info Session', value: 'info' },
          { title: 'Social', value: 'social' },
          { title: 'Other', value: 'other' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15
      },
      validation: Rule => Rule.required().min(Rule.valueOfField('startDateTime'))
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'isVirtual',
          title: 'Is Virtual Event',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'physicalLocation',
          title: 'Physical Location',
          type: 'string',
          description: 'Building and room number',
          hidden: ({ parent }) => parent?.isVirtual
        },
        {
          name: 'virtualLink',
          title: 'Virtual Meeting Link',
          type: 'url',
          description: 'Zoom, Google Meet, etc.',
          hidden: ({ parent }) => !parent?.isVirtual
        },
        {
          name: 'mapLink',
          title: 'Map URL',
          type: 'url',
          description: 'Google Maps link',
          hidden: ({ parent }) => parent?.isVirtual
        }
      ]
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'speakers',
      title: 'Speakers/Presenters',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'memberProfile' }]
        }
      ]
    },
    {
      name: 'maxAttendees',
      title: 'Maximum Attendees',
      type: 'number',
      description: 'Leave empty for unlimited attendees',
      validation: Rule => Rule.min(1).positive().integer()
    },
    {
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Link to external registration (if applicable)',
      hidden: ({ parent }) => !parent?.registrationRequired
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'isRecurring',
      title: 'Is this a recurring event?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'recurrence',
      title: 'Recurrence Details',
      type: 'object',
      fields: [
        {
          name: 'frequency',
          title: 'Frequency',
          type: 'string',
          options: {
            list: [
              { title: 'Daily', value: 'daily' },
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-weekly', value: 'biweekly' },
              { title: 'Monthly', value: 'monthly' }
            ]
          },
          hidden: ({ parent }) => !parent?.isRecurring
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
          hidden: ({ parent }) => !parent?.isRecurring
        }
      ],
      hidden: ({ parent }) => !parent?.isRecurring
    }
  ],
  preview: {
    select: {
      title: 'title',
      eventType: 'eventType',
      start: 'startDateTime',
      media: 'featuredImage'
    },
    prepare(selection) {
      const { title, eventType, start, media } = selection;
      const date = new Date(start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      return {
        title: title,
        subtitle: `${eventType} • ${date}`,
        media: media
      };
    }
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [
        { field: 'startDateTime', direction: 'desc' }
      ]
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [
        { field: 'startDateTime', direction: 'asc' }
      ]
    }
  ]
};
