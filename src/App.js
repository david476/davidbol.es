import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { Link, Router } from '@reach/router'
import Dynamic from 'containers/Dynamic'
import Styling from './styling'
import NavBar from './components/NavBar';
import { createUseStyles } from 'react-jss';
import Footer from './components/Footer';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

const useStyles = createUseStyles(theme => ({
  outer: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  scroll: {
    overflowY: 'auto',
    height: `calc(100vh - ${theme.sizing.navbar.height}px)`,
  },
  content: {
    width: '100%',
    minHeight: `calc(100vh - ${theme.sizing.navbar.height}px - ${theme.sizing.footer.height}px)`,
  }
}))

function Body() {
  const { outer, scroll, content } = useStyles()
  return (
    <div className={outer}>
      <NavBar/>
      <div className={scroll}>
        <div className={content}>
            <Router>
              <Dynamic path="dynamic" />
              <Routes path="*"/>
            </Router>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

function App() {
  return (
    <Root>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Styling>
          <Body/>
        </Styling>
      </React.Suspense>
    </Root>
  )
}

export default App
