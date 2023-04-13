import {defineField, defineType} from 'sanity'
import { ArrowRightIcon } from '@sanity/icons'

export default defineType({
  name: 'rightAdBar',
  title: 'Right Bar Ads',
  icon: ArrowRightIcon,
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