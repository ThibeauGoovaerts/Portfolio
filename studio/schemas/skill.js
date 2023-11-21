import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
    }),
    defineField({
      name: 'percentage',
      title: 'Percentage',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(100), // Add a validation rule to make it required
    }),
    orderRankField({type: 'skill'}),
  ],
})
