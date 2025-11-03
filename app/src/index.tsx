import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('my-react-settings-root')

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
} else {
    console.error("Root element 'my-react-settings-root' not found!")
}