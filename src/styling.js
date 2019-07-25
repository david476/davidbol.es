import './reset.css'
import React from 'react'
import { Head, useSiteData } from 'react-static'
import { ThemeProvider } from 'react-jss'
import 'typeface-lato'
import 'typeface-raleway'
import 'typeface-roboto-slab'
import 'typeface-ubuntu-mono'

const t = {}

t.sizing = (f) => (f * 4)
t.sizing.navbar = {
  height: t.sizing(12),
  fontSize: t.sizing(5),
  padding: [0, t.sizing(4)],
}
t.sizing.footer = t.sizing.navbar

t.fonts = {
  navigation: {
    fontFamily: ['Raleway', 'sans-serif'],
    fontWeight: '300',
  },
  headings: {
    fontFamily: ['Roboto Slab', 'serif'],
    fontWeight: '300',
  },
  content: {
    fontFamily: ['Lato', 'sans-serif'],
    fontWeight: '400' // TODO verify bold uses 700 correctly
  },
  monospace: {
    fontFamily: ['Ubuntu Mono', 'monospace'],
    fontWeight: '400' // TODO verify bold uses 700 correctly
  }
}

t.colors = {
  navigation: {
    backgroundColor: '#333',
    color: '#fff'
  }
}

export default function Styling({children}) {
  return (
    <ThemeProvider theme={t}>
      {children}
    </ThemeProvider>
  )
}