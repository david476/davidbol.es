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
    ...theme.sizing.navbar
  },
  logo: {
    width: theme.sizing.navbar.height * 2 / 3,
    height: theme.sizing.navbar.height * 2 / 3,
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
    width: theme.sizing.navbar.padding[1],
  },
  filler: {
    flexGrow: 1
  }
}))

export default function NavBar(props) {
  const {container, logo, link, pad, filler} = useStyles()

  return (
    <nav className={container}>
      <Link to="/" className={link}>
        <img src='/logo.svg' xmlns='http://www.w3.org/2000/svg' alt='' className={logo}/>
        <div className={pad}/>
        David Boles
      </Link>
      <div className={filler}/>
      <Link to="/" className={link}>About</Link>
      <div className={pad}/>
      <Link to="/portfolio" className={link}>Portfolio</Link>
    </nav>
  )
}