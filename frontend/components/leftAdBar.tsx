import Link from 'next/link'
import { Window } from './window'
import { urlFor } from '../helpers/urlFor'

export const LeftAdBar = ({ ads }: any) => {
	return (
		<div id="left-ab" className="ab">
			<Window>
				{(ads.length > 0) ?
					ads.sort(() => Math.random() - 0.5).map(
						({ _id = '', image = '', link = ''}) =>
							image && (
								<Link href={link} target="_blank" key={_id}>
									{image && (
										<img src={urlFor(image).width(250).url()} alt=""/>
									)}
								</Link>
							)
					) : (
						<p>YOUR ADS GO HERE</p>
					)
				}
			</Window>
		</div>
	)
}