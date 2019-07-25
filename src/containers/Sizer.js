import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  outer: {
    display: 'flex',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    margin: [theme.sizing(4), theme.sizing(8), theme.sizing(32), theme.sizing(8)],
    maxWidth: theme.sizing(270),
    minWidth: 0,
    overflow: 'visible',
  },
  [`@media (min-width: ${theme.sizing(180)}px)`]: {
    inner:{
      width: '87.5%',
      margin: [theme.sizing(8), theme.sizing(8), theme.sizing(32), theme.sizing(8)],
    }
  },
  [`@media (min-width: ${theme.sizing(270)}px)`]: {
    inner:{
      width: '75%',
      margin: [theme.sizing(16), theme.sizing(8), theme.sizing(32), theme.sizing(8)],
    }
  }
}))

export default function Sizer({children, component: Component}) {
  const {outer, inner} = useStyles()
  if(!Component) {
    Component = (props) => React.createElement('div', props)
  }
  return (
    <div className={outer}>
      <Component className={inner}>
        {children}
      </Component>
    </div>
  )
}