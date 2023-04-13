import groq from 'groq'
import { NextPage } from 'next'

import { client } from '../client'

import { urlFor } from '../helpers/urlFor'

import { Meta } from "../components/meta";
import { Wrapper } from "../components/wrapper";

interface Props {
  page: any,
  leftAds: any,
  rightAds: any,
  posts: any,
}

const Friends: NextPage<Props> = ({ page, leftAds, rightAds, posts }) => {
  return (
    <div>
      <Meta 
        title={page.title}
        description={page.description}
        ogType="website"
        ogSlug=""
        ogImageURL={urlFor(page.ogImage).size(1200, 630).focalPoint(page.ogImage.hotspot.x, page.ogImage.hotspot.y).fit("crop").url()}
      />

      <Wrapper body={page.body} leftAds={leftAds} rightAds={rightAds} posts={posts} fallbackText="No stories by friends posted. Please check back later."/>
    </div>
  )
}

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "page" && page == "friends"][0]`)
  const leftAds = await client.fetch(`*[_type == "leftAdBar"]`)
  const rightAds = await client.fetch(`*[_type == "rightAdBar"]`)
  const postsQuery = groq`*[_type == "post" && publishedAt < now() && "Friend" in categories[]->title]{
    _id,
    slug,
    mainImage,
    title,
    publishedAt,
    "name": author->name,
    "authorSlug": author->slug,
    moreInfo,
    body,
  } | order(publishedAt desc)`
  const posts = await client.fetch(postsQuery)

  return {
    props: {
      revalidate: 10,
      page,
      leftAds,
      rightAds,
      posts,
    }
  }
}


export default Friends;