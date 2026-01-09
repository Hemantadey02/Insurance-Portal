import { useNavigate } from 'react-router-dom';
import HeroBannerImg from '../../assets/Images/HeroBannerImg.jfif';

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-[#272c48] to-[var(--color-azure-blue)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <p className="text-sm tracking-widest uppercase opacity-80 mb-3">
            Trusted Insurance Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Secure Your Future <br />
            With Smart Insurance
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Manage policies, claims, and requests securely from one trusted platform.
          </p>

          <div className="flex gap-4">
            <button onClick={()=> navigate('/registration')} className="px-6 py-3 rounded-full bg-white text-[var(--color-deep-magenta)] border border-deep-magenta font-semibold hover:opacity-90 hover:bg-[var(--color-deep-magenta)] hover:text-white transition ease-in-out duration-300 cursor-pointer">
              Get Started
            </button>
            {/* <button className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10 transition">
              Watch Video
            </button> */}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={HeroBannerImg}
              alt="Happy family"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-[40%]  bg-white text-black px-4 py-3 rounded-xl shadow-lg">
            <p className="text-xl font-bold text-[var(--color-cobalt-blue)] text-center">10K+</p>
            <p className="text-sm text-gray-600">Satisfied Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;