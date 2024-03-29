import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  initialColorMode: 'light',
  //  If true, your app will change color mode based on the user's system preferences.
  // useSystemColorMode: false,
  colors: {
    acsys: {
      backgroundColor: '#f1f3f6',
      titleColor: '#5D6A7E',
      fontColor: '#758399',
      iconColor: '#384a66',
      toggleBackgroundColor: '#f1f3f6',
      subtitleColor: '#757F8F',

      whiteTextColor: '#ffffff',

      primaryColor: '#109AC6',
      redColor: '#ef476f',

      redColorState: '#D35F7B',
      violetColorState: '#A475B4',
      greenColorState: '#5F9E7B',
      blueColorState: '#5A83AF',

      gray1: '#333333',
      gray2: '#4F4F4F',
    }
  }
})