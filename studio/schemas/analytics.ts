import {defineField, defineType} from 'sanity'
import {ActivityIcon} from '@sanity/icons'

export default defineType({
  name: 'analytics',
  title: 'Analytics',
  icon: ActivityIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created at',
      type: 'datetime',
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'data',
    },
  },
})
