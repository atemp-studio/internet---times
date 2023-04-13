import { NextPage } from 'next'
import { PortableText } from '@portabletext/react'

import { ptComponents } from "../helpers/ptComponents";

import { LeftAdBar } from './leftAdBar'
import { RightAdBar } from './rightAdBar'

interface Props {
	leftAds: any,
	rightAds: any,
	body: any,
}

export const PageWrapper: NextPage<Props> = ({ leftAds, rightAds, body }) => {
	return (
		<div id="wrapper">
			<section id="main-content">
				<LeftAdBar ads={leftAds}/>
				<main>
					<div className="post-body page-wrapper">
						<PortableText
							value={body}
							components={ptComponents}
						/>
					</div>
				</main>
				<RightAdBar ads={rightAds}/>
			</section>
		</div>
	)
}