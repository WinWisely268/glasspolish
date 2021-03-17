import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import NoSsr from '@material-ui/core/NoSsr'

const defaultTheme = {
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  },
  palette: {
    action: {
      disabledBackground: 'rgba(255,255,255,0.5)',
      disabled: 'rgba(255,255,255,0.12)'
    }
  }
}
const theme = createMuiTheme(defaultTheme)

export interface ThemerProps {
  children: any
}

export const Themer: React.FunctionComponent<ThemerProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NoSsr>{children}</NoSsr>
    </ThemeProvider>
  )
}

export default Themer
