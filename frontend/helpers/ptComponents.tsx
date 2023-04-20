import { urlFor } from "./urlFor"
import { PortableText } from "@portabletext/react"
import { TypedObject } from "@portabletext/types"

interface labeledImageType {
	value: {
		image: {
			asset: {
				_ref: string
			}
		}
		label: TypedObject
	}
}

interface imageType {
	value: {
		asset: {
			_ref: string
		}
	}
}

export const ptComponents = {
  types: {
    labeledImage: ({ value }: labeledImageType) => {
      if (!value?.image?.asset?._ref) {
        return null
      }
      const url = urlFor(value.image).width(1500).url()
      const [w, h] = url.split("-")[1].split(".")[0].split("x")
      return (
        <div className={`labeled-image ${parseInt(h) > parseInt(w) ? 'portrait' : ''}`}>
          <div className="title-bar">
            <div className="title-bar-text">{value.label?.toString() ?? "Untitled"}</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <img alt={value.label?.toString() ?? ""} loading="lazy" src={url}/>
          </div>
        </div>
      )
    },
    image: ({ value }: imageType) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img loading="lazy" src={urlFor(value).width(1500).url()}/>
      )
    }
  }
}