import path from 'path'

import ReactPDF from '@react-pdf/renderer';
import Resume from './src/resume/Resume';
import React from 'react';
import { buffer } from 'get-stream'

export default {
  getRoutes: () => {
    return [
      {
        path: '/',
        getData: async () => ({resume: (await buffer(await ReactPDF.renderToStream(<Resume />))).toString('base64')})
      }
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    // CUSTOM
    require.resolve('react-static-plugin-mdx'),
    'inject-jss-provider'
  ],
}

console.log(require.resolve('react-jss'))