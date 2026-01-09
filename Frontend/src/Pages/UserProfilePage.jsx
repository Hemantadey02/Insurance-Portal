import React, { useEffect } from 'react'
import UserProfile from '../components/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../api/Auth/authApi';
import { login } from '../store/authSlice';

const UserProfilePage = () => {
  const authData = useSelector((state) => state.auth);

  const user = {
    userId: authData.user?.userId,
    username: authData.user?.username,
    fullName: authData.user?.fullName,
    email: authData.user?.email,
    kycId: authData.user?.kycId,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const res = await getUserDetails();
      dispatch(login(res));
    }

    getUserData();
  }, [])

  return (
    <>
      <UserProfile user={user} />
    </>
  )
}

export default UserProfilePage
