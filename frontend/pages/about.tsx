import { NextPage } from 'next'

import { client } from '../client'

import { urlFor } from '../helpers/urlFor'

import { Meta } from "../components/meta";
import { PageWrapper } from "../components/pageWrapper";

interface Props {
  page: any,
  leftAds: any,
  rightAds: any,
}

const About: NextPage<Props> = ({ page, leftAds, rightAds }) => {
  leftAds = leftAds.sort(() => Math.random() - 0.5).slice(0, 3)
  rightAds = rightAds.sort(() => Math.random() - 0.5).slice(0, 3)

  return (
    <div>
      <Meta 
        title={page.title}
        description={page.description}
        ogType="website"
        ogSlug=""
        ogImageURL={urlFor(page.ogImage).size(1200, 630).focalPoint(page.ogImage.hotspot.x, page.ogImage.hotspot.y).fit("crop").url()}
      />

      <PageWrapper leftAds={leftAds} rightAds={rightAds} body={page.body}/>
    </div>
  )
}

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "page" && page == "about"][0]`)
  const leftAds = await client.fetch(`*[_type == "leftAdBar"]`)
  const rightAds = await client.fetch(`*[_type == "rightAdBar"]`)

  return {
    props: {
      revalidate: 10,
      page,
      leftAds,
      rightAds,
    }
  }
}


export default About;