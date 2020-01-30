import React from 'react'
import { createUseStyles } from 'react-jss';
import { EmailIcon, GitHubIcon, LinkedInIcon } from './social_icons';

const useStyles = createUseStyles(theme => ({
  container: {
    boxShadow: [0, 0, theme.sizing(1), theme.colors.navigation.backgroundColor],
    display: 'flex',
    alignItems: 'center',
    ...theme.fonts.navigation,
    ...theme.colors.navigation,
    ...theme.sizing.footer
  },
  icon: {
    width: theme.sizing.footer.height * 2 / 3,
    height: theme.sizing.footer.height * 2 / 3,
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
  const {container, icon, link, pad, filler} = useStyles()

  return (
    <nav className={container}>
      <a href="https://github.com/david476/davidbol.es/issues" className={link} target="_blank" rel="noopener noreferrer">See a problem?</a>
      <div className={filler}/>
      <a href='mailto:me@davidbol.es'className={link}><EmailIcon className={icon}/></a>
      <div className={pad}/>
      <a href='https://github.com/david-boles/'className={link} target="_blank" rel="noopener noreferrer"><GitHubIcon className={icon}/></a>
      <div className={pad}/>
      <a href='https://www.linkedin.com/in/david-e-boles/'className={link} target="_blank" rel="noopener noreferrer"><LinkedInIcon className={icon}/></a>
    </nav>
  )
}