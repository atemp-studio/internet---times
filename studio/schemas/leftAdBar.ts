import {defineField, defineType} from 'sanity'
import { ArrowLeftIcon } from '@sanity/icons'

export default defineType({
  name: 'leftAdBar',
  title: 'Left Bar Ads',
  icon: ArrowLeftIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'text',
    }),
	],
  preview: {
    select: {
      title: 'link',
      media: 'image',
    },
  },
})
