import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about', // Define the schema type as 'about'
  title: 'About', // Display name for the schema type
  type: 'document', // Define it as a document type

  // Define fields for the 'about' schema type
  fields: [
    defineField({
      name: 'title', // Field name for the title
      title: 'Title', // Display name for the title field
      type: 'string', // Data type for the title is a string
    }),
    defineField({
      name: 'body', // Field name for the about body
      title: 'About Body', // Display name for the about body field
      type: 'blockContent', // Data type for the about body is 'blockContent'
    }),
    defineField({
      name: 'image', // Field name for the main image
      title: 'Main image', // Display name for the main image field
      type: 'image', // Data type for the main image is an 'image'
      options: {
        hotspot: true, // Enable hotspot functionality for the image
      },
      fields: [
        {
          name: 'alt', // Name of the 'alt' text field
          title: 'Alt text', // Title displayed for 'alt' text field
          type: 'string', // Type of the 'alt' text field, which is a string
          description: 'Important for SEO and accessiblity.', // Description of the field's purpose
        },
      ],
    }),
    defineField({
      name: 'file', // Field name for the resume (PDF)
      title: 'Resume (PDF)', // Display name for the resume (PDF) field
      type: 'file', // Data type for the resume is 'file'
      description: 'Please select only a PDF file. Not required!', // Additional description for the field
      options: {
        accept: '.pdf', // Specify that only PDF files are accepted
      },
    }),
    defineField({
      name: 'email', // Field name for the email
      title: 'Email', // Display name for the email field
      type: 'email', // Data type for the email is 'email'
    }),
    defineField({
      name: 'newspaper', // Field name for the newspaper (PDF)
      title: 'Newspaper (PDF)', // Display name for the newspaper (PDF) field
      type: 'file', // Data type for the newspaper is 'file'
      description: 'Please select only a PDF file. Not required!', // Additional description for the field
      options: {
        accept: '.pdf', // Specify that only PDF files are accepted
      },
    }),
  ],
})
