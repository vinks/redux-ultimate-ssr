/* global webpackIsomorphicTools */

import React from 'react'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'
import _ from 'lodash'

const Html = ({ store, appString, asyncState }) => {
  // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
  const head = Helmet.renderStatic()
  const attrs = head.htmlAttributes.toComponent()
  const { lang, ...rest } = attrs || {}
  const assets = webpackIsomorphicTools.assets()

  return (
    <html {...rest} lang={lang || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {/* Styles will be presented in production with webpack extract text plugin */}
        {_.keys(assets.styles).map(style =>
          <link
            key={_.uniqueId()}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />,
        )}
      </head>
      <body>
        {/* Rendering the route, which passed from server-side */}
        <div
          id="react-view"
          dangerouslySetInnerHTML={{ __html: appString || '' }}
        />

        {/* Store the initial state into window */}
        <script
          dangerouslySetInnerHTML={{
            __html: store && `window.__INITIAL_STATE__=${serialize(store.getState())};`
          }}
        />

        {/* Serialise the async state into the HTML response */}
        <script
          dangerouslySetInnerHTML={{
            __html: asyncState && `window.ASYNC_COMPONENTS_STATE=${serialize(asyncState)};`
          }}
        />

        {/* Reverse the order of scripts for accessing vendor.js first */}
        {
          _.keys(assets.javascript).reverse().map(script =>
            <script key={_.uniqueId()} src={assets.javascript[script]} />,
          )
        }
        {head.script.toComponent()}
      </body>
    </html>
  )
}

Html.defaultProps = { htmlContent: '' }

export default Html
