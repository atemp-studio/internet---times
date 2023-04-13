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

const Index: NextPage<Props> = ({ page, leftAds, rightAds, posts }) => {
  return (
    <div>
      <Meta 
        title={page.title}
        description={page.description}
        ogType="website"
        ogSlug=""
        ogImageURL={urlFor(page.ogImage).size(1200, 630).focalPoint(page.ogImage.hotspot.x, page.ogImage.hotspot.y).fit("crop").url()}
      />

      <Wrapper body={page.body} leftAds={leftAds} rightAds={rightAds} posts={posts} fallbackText="No posts. Please check back later."/>
    </div>
  )
}

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "page" && page == "/"][0]`)
  const leftAds = await client.fetch(`*[_type == "leftAdBar"]`)
  const rightAds = await client.fetch(`*[_type == "rightAdBar"]`)
  const postsQuery = groq`*[_type == "post" && publishedAt < now()]{
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


export default Index;