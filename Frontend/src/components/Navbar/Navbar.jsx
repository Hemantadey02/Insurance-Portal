import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../api/Auth/authApi";
import { login } from "../../store/authSlice";
import { useEffect, useRef, useState } from "react";
import { LogOut, User } from "lucide-react";
import { logout } from '../../store/authSlice'  // Adjust the path as needed

function Navbar() {
    const authData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                        <Link to="/">Insurance</Link>
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
                                    onClick={handleLogout}
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
                                className="text-cool-gray hover:text-cobalt-blue transition"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="text-cool-gray hover:text-cobalt-blue transition"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;