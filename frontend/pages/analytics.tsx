import { NextPage } from 'next'
import { PortableText } from '@portabletext/react'

import { client } from '../client'

import { urlFor } from '../helpers/urlFor'
import { ptComponents } from "../helpers/ptComponents";

import { Meta } from "../components/meta";
import { AnalyticsForm } from "../components/analyticsForm";
import { LeftAdBar } from '../components/leftAdBar'
import { RightAdBar } from '../components/rightAdBar'

interface Props {
  page: any,
  leftAds: any,
  rightAds: any,
}

const Analytics: NextPage<Props> = ({ page, leftAds, rightAds }) => {
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

      <div id="wrapper">
        <section id="main-content">
          <LeftAdBar ads={leftAds}/>
          <main>
            <div className="post-body page-wrapper">
              <PortableText
                value={page.body}
                components={ptComponents}
              />
            </div>
            <AnalyticsForm/>
          </main>
          <RightAdBar ads={rightAds}/>
        </section>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "page" && page == "analytics"][0]`)
  const leftAds = await client.fetch(`*[_type == "leftAdBar"]`)
  const rightAds = await client.fetch(`*[_type == "rightAdBar"]`)

  return {
    revalidate: 10,
    props: {
      page,
      leftAds,
      rightAds,
    }
  }
}

export default Analytics;