import React from 'react'
import Sizer from '../containers/Sizer';
import { createUseStyles } from 'react-jss';
import { components } from '../styling'
import Page from '../containers/Page';

const useStyles = createUseStyles(theme => ({
  message: {
    ...theme.sizing.headings(0),
    ...theme.fonts.headings,
    textAlign: 'center',
  }
}))

export default function() {
  const { message } = useStyles()
  return (
    <Page>
      <Sizer>
        <div className={message}>404—If this is unexpected, please <components.a href='https://github.com/david476/davidbol.es/issues'>submit an issue</components.a> or <components.a href="mailto:me@davidbol.es">contact me</components.a>.</div>
      </Sizer>
    </Page>
  )
}
