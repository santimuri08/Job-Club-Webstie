export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              {title: 'Javascript', value: 'javascript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'Python', value: 'python'}
            ]
          }
        }
      ]
    },
    {
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Guide', value: 'guide'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Template', value: 'template'},
          {title: 'Cheat Sheet', value: 'cheatsheet'},
          {title: 'Video', value: 'video'},
          {title: 'Article', value: 'article'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}]
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'memberProfile'}]
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to external resource (if applicable)'
    },
    {
      name: 'fileUpload',
      title: 'File Upload',
      type: 'file',
      description: 'Upload a file (PDF, DOCX, etc.)',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
      }
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'}
        ]
      }
    },
    {
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
      description: 'e.g., 30 minutes, 2 hours, etc.'
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this resource on the homepage',
      initialValue: false
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    },
    {
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'resource'}]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      type: 'resourceType'
    },
    prepare(selection) {
      const {title, author, media, type} = selection;
      return {
        title: title,
        subtitle: `${type} by ${author || 'Unknown'}`,
        media: media
      };
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Alphabetical (A-Z)',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
};
