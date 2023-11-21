// Import the necessary modules from Sanity and other packages
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// Define the 'post' schema type for Sanity.io
export default defineType({
  name: 'post', // The name of the schema type
  title: 'Post', // The title displayed in the Sanity Studio
  type: 'document', // The type of schema, which is a document
  orderings: [orderRankOrdering], // Define an ordering for the schema documents

  // Define the fields for the 'post' schema
  fields: [
    // Define the 'title' field
    defineField({
      name: 'title', // The name of the field
      title: 'Title', // The title displayed in the Studio
      type: 'string', // The type of the field, which is a string
    }),

    // Define the 'slug' field
    defineField({
      name: 'slug', // The name of the field
      title: 'Slug', // The title displayed in the Studio
      type: 'slug', // The type of the field, which is a slug
      options: {
        source: 'title', // The source for generating the slug
        maxLength: 96, // The maximum length of the slug
      },
    }),

    // Define the 'author' field as a reference to the 'author' schema
    defineField({
      name: 'author', // The name of the field
      title: 'Author', // The title displayed in the Studio
      type: 'reference', // The type of the field, which is a reference
      to: {type: 'author'}, // The reference is to the 'author' schema
    }),

    // Define the 'mainImage' field as an image with 'alt' text
    defineField({
      name: 'mainImage', // The name of the field
      title: 'Main image', // The title displayed in the Studio
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

    // Define the 'details' field as a short text description
    defineField({
      name: 'details', // The name of the field
      title: 'Short Details', // The title displayed in the Studio
      type: 'text', // The type of the field, which is a text
    }),

    // Define the 'publishedAt' field as a datetime
    defineField({
      name: 'publishedAt', // The name of the field
      title: 'Published at', // The title displayed in the Studio
      type: 'datetime', // The type of the field, which is a datetime
    }),

    // Define the 'body' field as a block content
    defineField({
      name: 'body', // The name of the field
      title: 'Body', // The title displayed in the Studio
      type: 'blockContent', // The type of the field, which is a block content
    }),

    // Define the 'tags' field as an array of strings
    defineField({
      name: 'tags', // The name of the field
      title: 'Tags', // The title displayed in the Studio
      type: 'array', // The type of the field, which is an array
      of: [{type: 'string'}], // The array contains strings
    }),

    // Define the 'featured' field as a boolean
    {
      title: 'Featured Post', // The title displayed in the Studio
      name: 'featured', // The name of the field
      type: 'boolean', // The type of the field, which is a boolean
    },

    // Define the orderRankField to enable ordering of posts
    orderRankField({type: 'post'}),
  ],

  // Define the preview of the post
  preview: {
    select: {
      title: 'title', // Select the 'title' field for the title of the preview
      author: 'author.name', // Select 'author.name' for the author's name in the preview
      media: 'mainImage', // Select 'mainImage' as the media for the preview
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
