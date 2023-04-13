import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'labeledImage',
  title: 'Image',
  icon: ImageIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
			options: {
				hotspot: true,
			}
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
  ],
})