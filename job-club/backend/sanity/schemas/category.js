export default {
  name: 'category',
  title: 'Category',
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
      rows: 3
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Name of the icon (e.g., "code", "laptop", "book")'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., #FF5733)',
      options: {
        list: [
          {title: 'Red', value: '#F56565'},
          {title: 'Orange', value: '#ED8936'},
          {title: 'Yellow', value: '#ECC94B'},
          {title: 'Green', value: '#48BB78'},
          {title: 'Teal', value: '#38B2AC'},
          {title: 'Blue', value: '#4299E1'},
          {title: 'Indigo', value: '#667EEA'},
          {title: 'Purple', value: '#9F7AEA'},
          {title: 'Pink', value: '#ED64A6'}
        ]
      }
    },
    {
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optional parent category for nested categories'
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this category in featured sections',
      initialValue: false
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for SEO (leave blank to use default)'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Description for SEO (leave blank to use default)'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon'
    }
  },
  orderings: [
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Title (Z-A)',
      name: 'titleDesc',
      by: [
        {field: 'title', direction: 'desc'}
      ]
    }
  ]
};
