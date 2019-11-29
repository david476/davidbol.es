import { createHistory, createMemorySource, LocationProvider, Router } from '@reach/router';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Root, Routes } from 'react-static';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Styling from './styling';

const history = (typeof window !== 'undefined') ? createHistory(window) : createHistory(createMemorySource())

history.listen((...props) => {
  console.log(props)
  const { action } = props[0]
  if (action !== 'POP') {
    window.scrollTo(0, 0);
  }
})

const useStyles = () => createUseStyles(theme => ({
  outer: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  content: {
    width: '100%',
    minHeight: `calc(100vh - ${theme.sizing.navbar.height}px - ${theme.sizing.footer.height}px)`,
  }
}))

export default function App() {
  return (
    <Root>
      <Styling>
        <React.Suspense fallback={<em>Loading...</em>}>
          {React.createElement(() => {
            return (
              <LocationProvider history={history}>
                <Router>
                  {React.createElement(() => {
                    const { outer, content } = useStyles()
                  
                    return (
                      <div className={outer}>
                        <NavBar/>
                        <div className={content}>
                          <Routes/>
                        </div>
                        <Footer/>
                      </div>
                    )
                  }, {path: '*'})}
                </Router>
              </LocationProvider>
            )
          })}
        </React.Suspense>
      </Styling>
    </Root>
  )
}