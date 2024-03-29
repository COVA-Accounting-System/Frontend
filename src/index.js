// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import './index.css'

// React router imports
import { BrowserRouter } from 'react-router-dom'

// Redux imports
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { theme } from './styles/chakraTheme'
import { LightMode } from '@chakra-ui/react'

// Library imports
// import { Toaster } from 'react-hot-toast'
import { ToasterR } from './services/toastService'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
        <LightMode>
          <App />
          </LightMode>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
    <ToasterR />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
