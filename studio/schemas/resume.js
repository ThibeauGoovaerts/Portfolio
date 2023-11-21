// Import necessary modules and functions from Sanity
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// Define the 'resume' schema type for Sanity
export default defineType({
  name: 'resume', // The name of the schema type
  title: 'Resume', // The title displayed in the Sanity Studio
  type: 'document', // The type of schema, which is a document
  orderings: [orderRankOrdering], // Define an ordering for the schema documents

  // Define the fields for the 'resume' schema
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

    // Define the 'category' field as a string with predefined options
    defineField({
      name: 'category', // The name of the field
      title: 'Category', // The title displayed in the Studio
      type: 'string', // The type of the field, which is a string
      options: {
        list: [
          {title: 'Education', value: 'education'}, // Predefined options for 'Education'
          {title: 'Experience', value: 'experience'}, // Predefined options for 'Experience'
        ],
      },
    }),

    // Define the 'image' field for the educational institution or company image
    defineField({
      name: 'image', // The name of the field
      title: 'Educational institution or company image', // The title displayed in the Studio
      type: 'image', // The type of the field, which is an image
      options: {
        hotspot: true, // Enable hotspot for the image
      },
    }),

    // Define the 'startDate' field for the start date
    defineField({
      name: 'startDate', // The name of the field
      title: 'Start Date', // The title displayed in the Studio
      type: 'date', // The type of the field, which is a date
      options: {dateFormat: 'MMMM YYYY'}, // Define date format
      description: 'If you do not select the Start Date, the current date is selected by default.', // Description of the field
    }),

    // Define the 'endDate' field for the end date
    defineField({
      name: 'endDate', // The name of the field
      title: 'End Date', // The title displayed in the Studio
      type: 'date', // The type of the field, which is a date
      options: {dateFormat: 'MMMM YYYY'}, // Define date format
      description: "If you don't choose End Date, it will show as Present by default.", // Description of the field
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

    // Define the orderRankField to enable ordering of resumes
    orderRankField({type: 'resume'}),
  ],
})
