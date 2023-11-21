import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
    }),
    // Define the 'image' field as an image with 'alt' text
    defineField({
      name: 'image', // The name of the field
      title: 'Photo', // The title displayed in the Studio
      type: 'image', // The type of the field, which is an image
      fields: [
        {
          name: 'alt', // Name of the 'alt' text field
          title: 'Alt text', // Title displayed for 'alt' text field
          type: 'string', // Type of the 'alt' text field, which is a string
          description: 'Important for SEO and accessiblity.', // Description of the field's purpose
        },
      ],
      options: {
        hotspot: true, // Enable hotspot for image
      },
    }),
    orderRankField({type: 'photo'}),
  ],
})
