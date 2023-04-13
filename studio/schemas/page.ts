import {defineField, defineType} from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  icon: EarthGlobeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'ogImage',
      title: 'Share Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'labeledImage'}
      ],
    }),
  ],
})
