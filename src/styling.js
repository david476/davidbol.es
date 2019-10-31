import { MDXProvider } from '@mdx-js/react'
import { Link } from '@reach/router'
import React from 'react'
import { createUseStyles, ThemeProvider } from 'react-jss'
import 'typeface-lato'
import 'typeface-raleway'
import 'typeface-roboto-slab'
import 'typeface-ubuntu-mono'
import Article from './containers/Article'
import './reset.css'


// --- STYLING ---
const t = {}

t.sizing = (f) => (f * 4)
t.sizing.navbar = {
  height: t.sizing(12),
  fontSize: t.sizing(5),
  padding: [0, t.sizing(4)],
}
t.sizing.footer = t.sizing.navbar
t.sizing.headings = (i) => {
  const size = 4 * Math.pow(1.26, 5 - i)
  return {
    marginTop: t.sizing(size/1.5),
    marginBottom: t.sizing(size/3),
    fontSize: t.sizing(size),
  }
}

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



// --- MDX ---
function styledElt(type, styles) {
  const useStyles = createUseStyles(theme => ({elt: styles(theme)}))
  return ({children, ...props}) => {
    const { elt } = useStyles()
    return React.createElement(type, Object.assign({className: elt}, props), children)
  }
}
export const components = {
  wrapper: Article,
  p: styledElt('p', theme => ({
    marginTop: theme.sizing(4),
    marginBottom: theme.sizing(4),
    fontSize: theme.sizing(5),
    ...theme.fonts.content
  })),
  ...Object.assign(...Array.from({length: 6}, (_, i) => ({[`h${i+1}`]: styledElt(`h${i+1}`, theme => ({
      ...theme.sizing.headings(i+1),
      ...theme.fonts.headings
    }
  ))}))),
  hr: styledElt('hr', theme => ({
    marginTop: theme.sizing(4),
    marginBottom: theme.sizing(4),
  })),
  blockquote: styledElt('blockquote', theme => ({
    borderLeft: [theme.sizing(2), 'solid', '#ccc'],
    paddingLeft: theme.sizing(4),
    paddingRight: theme.sizing(4),
    backgroundColor: '#eee',
    overflow: 'auto',
    marginTop: theme.sizing(8),
    marginBottom: theme.sizing(8),
  })),
  ul: styledElt('ul', theme => ({
    marginTop: theme.sizing(4),
    marginBottom: theme.sizing(4),
    paddingLeft: theme.sizing(6),
  })),
  ol: styledElt('ol', theme => ({
    marginTop: theme.sizing(4),
    marginBottom: theme.sizing(4),
    paddingLeft: theme.sizing(6),
  })),
  li: styledElt('li', theme => ({
    fontSize: theme.sizing(5),
    ...theme.fonts.content
  })),
  table: ((props) => {
    const Outer = styledElt('div', theme => ({
      marginTop: theme.sizing(8),
      marginBottom: theme.sizing(8),
      overflowX: 'auto',
      fontSize: theme.sizing(5),
      ...theme.fonts.content
    }))
    const Table = styledElt('table', theme => ({
      marginLeft: 'auto',
      marginRight: 'auto',
    }))
    return <Outer><Table {...props}/></Outer>
  }),
  td: styledElt('td', theme => ({
    border: ['1px', 'solid', '#ccc'],
    padding: theme.sizing(2),
  })),
  th: styledElt('th', theme => ({
    border: ['1px', 'solid', '#ccc'],
    padding: theme.sizing(2),
    ...theme.fonts.headings,
    backgroundColor: '#eee',
  })),
  pre: styledElt('pre', theme => ({
    marginTop: theme.sizing(8),
    marginBottom: theme.sizing(8),
    padding: theme.sizing(4),
    backgroundColor: '#eee',
    boxShadow: [0, 0, 4, '#aaa', 'inset'],
    overflowX: 'auto',
  })),
  code: styledElt('code', theme => ({
    fontSize: theme.sizing(5),
    ...theme.fonts.monospace,
    paddingRight: theme.sizing(4), // Fixes padding when h-scrolling
  })),
  inlineCode: styledElt('code', theme => ({
    fontSize: theme.sizing(5),
    ...theme.fonts.monospace,
    padding: [theme.sizing(0.5), theme.sizing(2)],
    backgroundColor: '#eee',
    boxShadow: [0, 0, 4, '#aaa', 'inset'],
  })),
  a: styledElt('a', theme => ({
    color: '#009cd3',
    textDecoration: 'none',
  })),
  link: (() => { // Internal links, use the reach router.
    const useStyles = createUseStyles({
      elt: {
        color: '#009cd3',
        textDecoration: 'none',
      },
    })
    return (props) => {
      const { elt } = useStyles()
      return (<Link className={elt} {...props}/>)
    }
  })(),
  A: (props) => React.createElement('a', props), // unstyled external link
  Link, // unstyled internal link
  img: styledElt('img', theme => ({
    marginTop: theme.sizing(8),
    marginBottom: theme.sizing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxHeight: '50vh',
    maxWidth: '100%',
  })),
  YouTube: ({id, aspectRatio, ...props}) => {
    //console.log(id, w, h);
    const Container = styledElt('div', theme => ({
      marginTop: theme.sizing(8),
      marginBottom: theme.sizing(8),
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      maxHeight: '50vh',
      maxWidth: '100%',
      position: 'relative',
      paddingTop: aspectRatio ? `${(aspectRatio[1] / aspectRatio[0]) * 100}%` : '56.25%',
    }))

    const IFrame = styledElt('iframe', theme => ({
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
    }))

    return (
      <Container>
        <IFrame src={`https://www.youtube.com/embed/${id}`} allow="encrypted-media" allowFullScreen={true} {...props}/>
      </Container>
    )
  },
}


export default function Styling({children}) {
  return (
    <ThemeProvider theme={t}>
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </ThemeProvider>
  )
}