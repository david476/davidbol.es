import React from 'react'
import { Head } from 'react-static';
import Sizer from './Sizer';
import { createUseStyles } from 'react-jss';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const useStyles = createUseStyles(theme => ({
  outer: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  content: {
    width: '100%',
    minHeight: `calc(100vh - ${theme.sizing.navbar.height}px - ${theme.sizing.footer.height}px)`,
  }
}))

export default function Page({children}) {
  const { outer, content } = useStyles()
                  
  return (
    <div className={outer}>
      <NavBar/>
      <div className={content}>
        {children}
      </div>
      <Footer/>
    </div>
  )
}