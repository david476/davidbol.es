import React from 'react'
import { Head } from 'react-static';
import Sizer from './Sizer';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  title: {
    ...theme.sizing.headings(0),
    ...theme.fonts.headings
  }
}))

export default function Article({children, meta: {title, headTitle}}) {
  const {title: titleClass} = useStyles()
  return (
    <Sizer component={props => React.createElement('article', props)}>
      <header>
        {headTitle || (headTitle == undefined && title) ? (
          <Head>
            <title>David Boles: {headTitle || title}</title>
          </Head>
        ) : null}
        {title ? (
          <div className={titleClass}>
            {title}
          </div>
        ) : null}
      </header>
      {children}
    </Sizer>
  )
}