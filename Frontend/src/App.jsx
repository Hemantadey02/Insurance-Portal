import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./api/Auth/authApi";
import { login, logout } from "./store/authSlice";
import Loader from "./components/Loader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);

  const hasFetched = useRef(false);
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUser = async () => {
      try {
        if (!authData?.user) {
          const res = await getUserDetails();
          if (res) {
            dispatch(login(res));
          } else {
            dispatch(logout());
          }
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setBootLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (bootLoading) {
    return <Loader fullHeight={true} />;
  }

  return <AppRoutes />;
}

export default App;