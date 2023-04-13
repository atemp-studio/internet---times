import Link from 'next/link'
import { NextPage } from 'next'
import { PortableText } from '@portabletext/react'
import crypto from 'crypto'

import { ptComponents } from "../helpers/ptComponents";
import { urlFor } from "../helpers/urlFor";

import { LeftAdBar } from './leftAdBar'
import { RightAdBar } from './rightAdBar'

function sha256(input: string) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex').slice(0,7);
} 

interface Props {
	leftAds: any,
	rightAds: any,
	body: any,
	posts: any,
	fallbackText: string,
}

export const Wrapper: NextPage<Props> = ({ leftAds, rightAds, body, posts, fallbackText }) => {
	return (
		<div id="wrapper">
			<section id="main-content">
				<LeftAdBar ads={leftAds}/>
				<main>
					{body && (
						<div className="post-body">
							<PortableText
								value={body}
								components={ptComponents}
							/>
						</div>
					)}

					{posts && posts.length > 0 ? posts.map(
						({ _id = "", slug = {"current": ""}, mainImage = '', title = '', publishedAt = "", name = [], authorSlug = [{"current":""}], body = [], moreInfo = ""}) =>
							slug && (
								<div key={_id} className="post">
									<Link href={`/posts/${encodeURIComponent(slug.current)}`} className="post-image">
										{mainImage && (
											<img src={urlFor(mainImage).width(1000).url()} alt={title}/>
										)}
									</Link>

									<Link href={`/posts/${encodeURIComponent(slug.current)}`} className="post-title">
										<h2>
											{title}
										</h2>{' '}
									</Link>

									<div className="post-body">
										<PortableText
											value={body}
											components={ptComponents}
										/>
									</div>

									<ul className="post-links">
										{moreInfo && (
											<li><a href={moreInfo} target="_blank">Link to more information</a></li>)
										}
										<li>Date Posted: {new Date(publishedAt).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</li> 
										<li>Posted By:&nbsp;
											{name && name.length > 0 ? name.map(
												(n: string, index) => (
													<span key={index}>
														<Link href={`/authors/${encodeURIComponent(authorSlug[index].current)}`}>
															{n.toUpperCase()} [{sha256("a+" + authorSlug[index].current)}]
														</Link>
														{index < name.length - 1 ? ', ' : ''}
													</span>
												)
											) : (<span>ANONYMOUS</span>)}
										</li>
										<li className="permalink"><Link href={`/posts/${encodeURIComponent(slug.current)}`}>PERMALINK</Link></li>
									</ul>
								</div>
							)
					) : (
						<div className="post-body">
							<p>{fallbackText}</p>
						</div>
					)}
				</main>
				<RightAdBar ads={rightAds}/>
			</section>
		</div>
	)
}