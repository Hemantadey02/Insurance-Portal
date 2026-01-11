import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../api/Auth/authApi";
import { login } from "../../store/authSlice";
import { useEffect, useRef, useState } from "react";
import { LogOut, User } from "lucide-react";
import { logout } from '../../store/authSlice'  // Adjust the path as needed
import toast from "react-hot-toast";

function Navbar() {
    const authData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logOut, setLogOut] = useState(false);

    const onClose = () => {
        setLogOut(false);
    };

    const navRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [navHeight, setNavHeight] = useState(0);


    // Fetch user
    useEffect(() => {
        const getUserData = async () => {
            const res = await getUserDetails();
            dispatch(login(res));
        };
        getUserData();
    }, []);

    // Scroll logic
    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }

        const handleScroll = () => {
            if (window.scrollY > navHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navHeight]);

    // Logout handler
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')  // Redirect to login page after logout
        toast.success("Logged out successfully");
    }

    return (
        <>
            {/* Spacer to avoid layout jump */}
            {isSticky && <div style={{ height: navHeight }} />}

            <nav
                ref={navRef}
                className={`bg-white z-50 transition-all duration-500 ease-out
        ${isSticky
                        ? "fixed top-0 left-0 w-full shadow-lg animate-slideDown"
                        : "relative shadow-md"}`}
            >
                <div className="max-w-[94%] mx-auto px-2 py-3 flex justify-between items-center">
                    <div className="text-3xl font-bold text-cobalt-blue">
                        <Link to="/">Insureva</Link>
                    </div>

                    {authData.status === "active" ? (
                        <div className="flex gap-8">
                            {/* Profile Button */}
                            <div
                                onClick={() => navigate("/dashboard/profile")}
                                className="cursor-pointer inline-flex items-center gap-4 px-4 py-2 rounded-2xl 
              bg-gradient-to-br from-[#F6F5FF] to-[#ECEBFF]
              shadow-[0_10px_30px_rgba(0,0,0,0.04)]
              border border-gray-200 transition"
                            >
                                {/* Avatar */}
                                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-azure-blue to-indigo-500 opacity-20" />
                                    <User className="w-5 h-5 text-azure-blue relative z-10" />
                                </div>

                                {/* Name */}
                                <div className="flex flex-col leading-tight">
                                    <span className="text-xs text-gray-400 tracking-widest uppercase">
                                        Profile
                                    </span>
                                    <span className="text-sm font-semibold tracking-wide text-cobalt-blue">
                                        {authData.user?.username}
                                    </span>
                                </div>
                            </div>

                            {/* Logout button */}
                            <div className="cursor-pointer inline-flex items-center gap-4 px-4 py-2 rounded-2xl 
              bg-gradient-to-br from-[#ffe1e1] to-[#ffd6d6]
              shadow-[0_10px_30px_rgba(0,0,0,0.04)]
              border border-red-200 transition">
                                <button
                                    onClick={() => setLogOut(true)}
                                    className="w-full text-left text-red-500 font-semibold p-2 flex gap-2 items-center cursor-pointer"
                                >
                                    <LogOut />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6 h-[58px]">
                            <Link
                                to="/registration"
                                className="text-white rounded-xl border-2 border-deep-magenta bg-deep-magenta px-4 py-2  hover:text-deep-magenta hover:bg-white transition"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="border-2 border-lavender-mist hover:border-cool-gray px-4 py-2 rounded-xl hover:text-deep-magenta transition"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            {logOut && <div className="fixed inset-0 flex justify-center items-center z-50">
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
                ></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg min-w-[300px] z-10">
                    <h3 className="text-lg font-semibold">Confirm Logout</h3>
                    <p className="mt-2 text-sm">
                        Are you sure you want to logout?
                    </p>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleLogout();
                                onClose();
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Navbar;