import axios from "axios"
import { useSelector } from "react-redux"
import { addUser, setAccessToken } from "../features/authSlice"
import { useDispatch } from "react-redux"



const useApi = () => {

    const { accessToken } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const data = axios.create({
        baseURL: "http://localhost:5173/api",
        withCredentials: true
    })



    data.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${accessToken}`
            return config
        })


    data.interceptors.response.use(

        (response) => {
            return response
        },

        async (error) => {

            if (error.response?.status === 401){
                const res = await axios.post("/api/auth/refresh", {}, { withCredentials: true })
                console.log(res)
                dispatch(setAccessToken(res.data.accessToken))
                
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`

                console.log(error.config)
                return axios(error.config)
            }
            return Promise.reject(error)
        }

    )


    return data
}

export default useApi
