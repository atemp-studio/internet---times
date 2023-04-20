import groq from 'groq'
import { NextPage } from 'next'

import { client } from '../../client'

import { urlFor } from '../../helpers/urlFor'

import { Meta } from "../../components/meta";
import { Wrapper } from "../../components/wrapper";

interface Props {
  leftAds: any,
  rightAds: any,
  posts: any,
}

const Post: NextPage<Props> = ({ leftAds, rightAds, posts }) => {
  leftAds = leftAds.sort(() => Math.random() - 0.5).slice(0, 3)
  rightAds = rightAds.sort(() => Math.random() - 0.5).slice(0, 3)

  return (
    <div>
      <Meta 
        title={`The Internet Times | ${posts[0].title}`}
        description={posts[0].body[0].children[0].text.split('.').slice(0, 3).join('.') + "…"}
        ogType="article"
        ogSlug=""
        ogImageURL={urlFor(posts[0].mainImage).size(1200, 630).fit("crop").url()}
      />

      <div className="single-post-wrapper">
        <Wrapper body={null} leftAds={leftAds} rightAds={rightAds} posts={posts} fallbackText="Post not found."/>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({params: {slug}})),
    fallback: "blocking",
  }
}

export async function getStaticProps(context: any) {
	const { slug = "" } = context.params
  const leftAds = await client.fetch(`*[_type == "leftAdBar"]`)
  const rightAds = await client.fetch(`*[_type == "rightAdBar"]`)
  const postsQuery = groq`*[_type == "post" && slug.current == $slug]{
    _id,
    slug,
    mainImage,
    title,
    publishedAt,
    "name": author[]->nickname,
    "authorSlug": author[]->slug,
    moreInfo,
    body,
  }`
  const posts = await client.fetch(postsQuery, { slug })

  return {
    revalidate: 10,
    props: {
      leftAds,
      rightAds,
      posts,
    }
  }
}


export default Post;