import React from 'react'
import { Link } from '@reach/router';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  container: {
    boxShadow: [0, 0, theme.sizing(1), theme.colors.navigation.backgroundColor],
    display: 'flex',
    alignItems: 'center',
    ...theme.fonts.navigation,
    ...theme.colors.navigation,
    ...theme.sizing.footer
  },
  logo: {
    width: theme.sizing.footer.height * 0.666,
    height: theme.sizing.footer.height * 0.666,
  },
  link: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none'
  },
  pad: {
    width: theme.sizing.footer.padding[1],
  },
  filler: {
    flexGrow: 1
  }
}))

export default function Footer(props) {
  const {container, logo, link, pad, filler} = useStyles()

  return (
    <nav className={container}>
      
    </nav>
  )
}