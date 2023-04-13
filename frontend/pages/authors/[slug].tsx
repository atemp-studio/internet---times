import groq from 'groq'
import { NextPage } from 'next'
import { PortableText } from '@portabletext/react'
import crypto from 'crypto'

import { client } from '../../client'

import { ptComponents } from "../../helpers/ptComponents";
import { urlFor } from '../../helpers/urlFor'

import { Meta } from "../../components/meta";
import { AuthorWrapper } from "../../components/authorWrapper";

function sha256(input: string) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex').slice(0,7);
} 

interface Props {
  leftAds: any,
  rightAds: any,
	author: any,
  posts: any,
}

const Author: NextPage<Props> = ({ leftAds, rightAds, author, posts }) => {
  return (
    <div>
      <Meta 
        title={`The Internet Times | ${author.name}`}
        description={author.bio}
        ogType="website"
        ogSlug=""
        ogImageURL={urlFor(author.image).size(1200, 630).fit("crop").url()}
      />

      <AuthorWrapper leftAds={leftAds} rightAds={rightAds} posts={posts}>
        <div className="author-wrapper">
          <div className="author">
            <div className="author-image">
              <img src={urlFor(author.image).size(500,500).fit("crop").url()} alt={author.name}/>
            </div>
            <div className="author-info">
              <h1>{author.name}</h1>
              <p className="author-email">📬 → <a href={`mailto:${author.email}`}>{author.email}</a></p>
              
              <PortableText
                value={author.bio}
                components={ptComponents}
              />
            </div>
          </div>
          <hr/>
          <h3>
            POSTS BY {author.nickname.toUpperCase()}
            <br/>
            ↓
          </h3>
        </div>
			</AuthorWrapper>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "author" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({params: {slug}})),
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
	const { slug = "" } = context.params
  const leftAds = await client.fetch(`*[_type == "leftAdBar"]`)
  const rightAds = await client.fetch(`*[_type == "rightAdBar"]`)

	const authorQuery = groq`*[_type == "author" && slug.current == $slug][0]{
		name,
    nickname,
		_createdAt,
		image,
		email,
		position,
		bio,
		slug,
	}`
  const author = await client.fetch(authorQuery, { slug })

  const postsQuery = groq`*[_type == "post" && $slug in author[]->slug.current]{
    _id,
    slug,
    mainImage,
    title,
    publishedAt,
    "name": author[]->nickname,
    "authorSlug": author[]->slug,
    moreInfo,
    body,
  } | order(publishedAt desc)`
  const posts = await client.fetch(postsQuery, { slug })

  return {
    props: {
      revalidate: 10,
      leftAds,
      rightAds,
			author,
      posts,
    }
  }
}


export default Author;