import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author', // Define the schema type as 'author'
  title: 'Author', // Display name for the schema type
  type: 'document', // Define it as a document type

  // Define fields for the 'author' schema type
  fields: [
    defineField({
      name: 'name', // Field name for the author's name
      title: 'Name', // Display name for the name field
      type: 'string', // Data type for the name is a string
    }),
    defineField({
      name: 'slug', // Field name for the slug
      title: 'Slug', // Display name for the slug field
      type: 'slug', // Data type for the slug is a 'slug'
      options: {
        source: 'name', // Automatically generate the slug based on the 'name' field
        maxLength: 96, // Define the maximum length for the generated slug
      },
    }),
    defineField({
      name: 'image', // Field name for the image
      title: 'Image', // Display name for the image field
      type: 'image', // Data type for the image is an 'image'
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
      name: 'bio', // Field name for the bio
      title: 'Bio', // Display name for the bio field
      type: 'array', // Data type for the bio is an array
      of: [
        {
          title: 'Block', // Title for the block type within the array
          type: 'block', // Data type for the block is 'block'
          styles: [{title: 'Normal', value: 'normal'}], // Define styles for the block
          lists: [], // Define supported lists for the block
        },
      ],
    }),
  ],

  // Define the preview configuration for the 'author' schema type
  preview: {
    select: {
      title: 'name', // Display the 'name' field as the title in the preview
      media: 'image', // Use the 'image' field as media in the preview
    },
  },
})
