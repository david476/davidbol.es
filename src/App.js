import { createHistory, createMemorySource, LocationProvider, Router } from '@reach/router';
import React from 'react';
import { Root, Routes } from 'react-static';
import Styling from './styling';

const history = (typeof window !== 'undefined') ? createHistory(window) : createHistory(createMemorySource())

history.listen((...props) => {
  console.log(props)
  const { action } = props[0]
  if (action !== 'POP') {
    window.scrollTo(0, 0);
  }
})

export default function App() {
  return (
    <Root>
      <Styling>
        <React.Suspense fallback={<em>Loading...</em>}>
          {React.createElement(() => {
            return (
              <LocationProvider history={history}>
                <Router>
                  <Routes path='*'/>
                </Router>
              </LocationProvider>
            )
          })}
        </React.Suspense>
      </Styling>
    </Root>
  )
}