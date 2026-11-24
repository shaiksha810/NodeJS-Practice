import {createBrowserRouter} from "react-router"
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'

const routes = createBrowserRouter([
        {
            path:"/register",
            element:<RegisterPage />
        },
        {
            path:"/profile",
            element:<ProfilePage />
        }

    ])


export default routes