import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useApi from '../api/api'
import { addUser } from '../features/authSlice'

const ProfilePage = () => {


  const { user } = useSelector(store => store.user)
  const api = useApi()
  const dispatch = useDispatch()


 async function fetchProfile() {
  const response = await api.get("/auth/me")

  // console.log(response);

  dispatch(addUser(response.data))
  
  
 }


  useEffect(() => {
    fetchProfile()
  }, [])

  return (

    <div>
      <h1>Profile</h1>
      <h3>Name:{user?.name}</h3>
      <h3>Email:{user?.email}</h3>
    </div>
  )
}

export default ProfilePage