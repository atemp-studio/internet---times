import Link from 'next/link'
import { NextPage } from 'next'
import { PortableText } from '@portabletext/react'
import { useEffect } from 'react';
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

function applyShiftStyle() {
  const labeledImages = document.querySelectorAll('.labeled-image');
  labeledImages.forEach((labeledImage) => {
    const initialLeftValue = (labeledImage as HTMLElement).dataset.initialLeft;
    let randomShift = Math.random() * 6 - 3;
    if (window.innerWidth < 900) {
      randomShift = Math.random() * 4 - 1.5;
    }
    const style = {
      "left": `calc(${initialLeftValue} - ${randomShift}vw)`,
    };
    (labeledImage as HTMLElement).style.cssText = Object.entries(style)
      .map(([prop, val]) => `${prop}: ${val};`)
      .join(' ');
  });
}

function storeInitialLeftValues() {
  const labeledImages = document.querySelectorAll('.labeled-image');
  labeledImages.forEach((labeledImage) => {
    const computedStyle = window.getComputedStyle(labeledImage as HTMLElement);
    const leftValue = computedStyle.getPropertyValue('left');
    (labeledImage as HTMLElement).dataset.initialLeft = leftValue;
  });
}


export const Wrapper: NextPage<Props> = ({ leftAds, rightAds, body, posts, fallbackText }) => {
	useEffect(() => {
		storeInitialLeftValues();
    applyShiftStyle();

		window.addEventListener('resize', applyShiftStyle);

    return () => {
      window.removeEventListener('resize', applyShiftStyle);
    };
  }, []);

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
										{body ? (
											<PortableText
												value={body}
												components={ptComponents}
											/>
										) : (
											<p>Still gotta write this&hellip; oops.</p>
										)}
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