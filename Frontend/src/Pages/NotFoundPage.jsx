import { useNavigate } from "react-router-dom";
import NotFoundImg from "../assets/Images/NotFoundImg.png";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
            <div className="flex justify-center text-center -mt-20">
                <img src={NotFoundImg} alt="404 Not Found" className="img-fluid w-[80%] h-full" />
            </div>
            
            <p className="text-gray-600 text-lg font-semibold mb-6 max-w-2xl my-4">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <div className="flex gap-8">
                <button
                    onClick={() => navigate("/")}
                    className="bg-deep-magenta font-semibold border-2 cursor-pointer border-deep-magenta text-white px-4 py-2 rounded-md hover:bg-white hover:text-deep-magenta transition-all ease-in-out duration-300"
                >
                    Go to Home
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="bg-white font-semibold text-black px-4 cursor-pointer py-2 border-2 border-gray-400 rounded-md hover:bg-gray-400 transition-all ease-in-out duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;