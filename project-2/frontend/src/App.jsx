import './App.css'
import { RouterProvider } from "react-router"
import routes from './routes/AppRoute'

function App() {

  return (
    <>
      <RouterProvider router={routes}>
        
      </RouterProvider>
    </>
  )
}

export default App
