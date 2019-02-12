import React from 'react'
import Helmet from 'react-helmet'
import {graphql, StaticQuery} from "gatsby"

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({children}) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en"/>
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description}/>

          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png"/>
          <link rel="manifest" href="/img/site.webmanifest"/>
          <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#58b8cb"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>

          <meta property="og:type" content="article"/>
          <meta property="og:title" content={data.site.siteMetadata.title}/>
          <meta property="og:description" content={data.site.siteMetadata.description}/>
          <meta property="og:url" content="https://aha-oretama.work/"/>
          <meta property="og:image" content="/img/og-image.jpg"/>
          <meta property="og:image:width" content="279"/>
          <meta property="og:image:height" content="279"/>
        </Helmet>
        <Navbar/>
        <div>{children}</div>
      </div>
    )}
  />
);

export default TemplateWrapper
