// Import required modules and functions from Sanity
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// Define the 'project' schema type for Sanity
export default defineType({
  name: 'project', // The name of the schema type
  title: 'project', // The title displayed in the Sanity Studio
  type: 'document', // The type of schema, which is a document
  orderings: [orderRankOrdering], // Define an ordering for the schema documents

  // Define the fields for the 'project' schema
  fields: [
    // Define the 'title' field
    defineField({
      name: 'title', // The name of the field
      title: 'Title', // The title displayed in the Studio
      type: 'string', // The type of the field, which is a string
      validation: (Rule) => Rule.required(), // Add a validation rule to make it required
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
      validation: (Rule) => Rule.required(), // Add a validation rule to make it required
    }),

    // Define the 'category' field as an array of references to 'category' schema
    defineField({
      name: 'category', // The name of the field
      title: 'Category', // The title displayed in the Studio
      type: 'array', // The type of the field, which is an array
      of: [{type: 'reference', to: {type: 'category'}}], // References to the 'category' schema
      validation: (Rule) => Rule.max(1).required(), // Add validation rules (max 1 and required)
    }),

    // Define the 'details' field as a short text description
    defineField({
      name: 'details', // The name of the field
      title: 'Short Details', // The title displayed in the Studio
      type: 'text', // The type of the field, which is text
    }),

    // Define the 'body' field as block content
    defineField({
      name: 'body', // The name of the field
      title: 'Project Body', // The title displayed in the Studio
      type: 'blockContent', // The type of the field, which is block content
      description: 'Write your project content here', // Description of the field's purpose
    }),

    // Define the 'image' field as an image with 'alt' text
    defineField({
      name: 'image', // The name of the field
      title: 'Main Image', // The title displayed in the Studio
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

    // Define the 'file' field as a file (PDF)
    defineField({
      name: 'file', // The name of the field
      title: 'File (PDF)', // The title displayed in the Studio
      type: 'file', // The type of the field, which is a file
      description: 'Please select only pdf file. Not required!', // Description of the field's purpose
      options: {
        accept: '.pdf', // Specify that only PDF files are accepted
      },
    }),

    // Define the 'images' field as an array of images with hotspot
    defineField({
      name: 'images', // The name of the field
      title: 'Images', // The title displayed in the Studio
      type: 'array', // The type of the field, which is an array
      of: [{type: 'image'}], // The array contains images
      options: {
        hotspot: true, // Enable hotspot for images
      },
    }),

    // Define the 'link' field as a URL
    defineField({
      name: 'link', // The name of the field
      title: 'Project Link', // The title displayed in the Studio
      type: 'url', // The type of the field, which is a URL
    }),

    // Define the orderRankField to enable ordering of projects
    orderRankField({type: 'project'}),
  ],
})
