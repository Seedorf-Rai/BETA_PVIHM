import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from '../router/app.route.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      {/* <Provider store={store}>
      <App />
    </Provider> */}
    </RouterProvider>

  </React.StrictMode>,
)
