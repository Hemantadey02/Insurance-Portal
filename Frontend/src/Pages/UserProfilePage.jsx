import { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../api/Auth/authApi';
import { login } from '../store/authSlice';
import Loader from '../components/Loader';

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      try {
        setLoading(true);
        const res = await getUserDetails();
        dispatch(login(res));
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [])

  return (
    <>
      {loading ? (
        <div className="col-span-full">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <UserProfile user={user} />
      )}
    </>
  )
}

export default UserProfilePage