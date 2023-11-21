// Import necessary modules and functions from Sanity
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// Define the 'achievement' schema type for Sanity
export default defineType({
  name: 'achievement', // The name of the schema type
  title: 'Achievement', // The title displayed in the Sanity Studio
  type: 'document', // The type of schema, which is a document
  orderings: [orderRankOrdering], // Define an ordering for the schema documents

  // Define the fields for the 'achievement' schema
  fields: [
    // Define the 'title' field
    defineField({
      name: 'title', // The name of the field
      title: 'Title', // The title displayed in the Studio
      type: 'string', // The type of the field, which is a string
    }),

    // Define the 'subtitle' field
    defineField({
      name: 'subtitle', // The name of the field
      title: 'Subtitle', // The title displayed in the Studio
      type: 'string', // The type of the field, which is a string
    }),

    defineField({
      name: 'image', // The name of the field
      title: 'Image', // The title displayed in the Studio
      type: 'image', // The type of the field, which is an image
      options: {
        hotspot: true, // Enable hotspot for the image
      },
    }),

    // Define the 'date' field for the start date
    defineField({
      name: 'date', // The name of the field
      title: 'Date', // The title displayed in the Studio
      type: 'date', // The type of the field, which is a date
      options: {dateFormat: 'MMMM YYYY'}, // Define date format
      description: 'If you do not select the Date, the current date is selected by default.', // Description of the field
    }),

    // Define the 'description' field as block content
    defineField({
      name: 'description', // The name of the field
      title: 'Description', // The title displayed in the Studio
      type: 'blockContent', // The type of the field, which is block content
    }),

    // Define the 'location' field for the location
    defineField({
      name: 'location', // The name of the field
      title: 'Location', // The title displayed in the Studio
      type: 'string', // The type of the field, which is a string
    }),

    // Define the 'link' field as a URL
    defineField({
      name: 'link', // The name of the field
      title: 'Link', // The title displayed in the Studio
      type: 'url', // The type of the field, which is a URL
    }),

    // Define the orderRankField to enable ordering of achievement
    orderRankField({type: 'achievement'}),
  ],
})
