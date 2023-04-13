import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'The Internet Times',

  projectId: 'tz66tnke',
  dataset: 'production',

  plugins: [
    deskTool({
			structure: (S, context) => { 
				return  S.list()
					.title('Content')
					.items([
            ...S.documentTypeListItems().filter((item) => item.getId() != 'media.tag'),
				])
			},
		}),
    media(),
    visionTool()
  ],



  schema: {
    types: schemaTypes,
  },
})
