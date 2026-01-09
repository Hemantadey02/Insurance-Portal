// import React from 'react';

import AboutUs from "../components/Home/AboutUs";
import CTASection from "../components/Home/CTASection";
import HeroSection from "../components/Home/HeroSection";
import OurServices from "../components/Home/OurServices";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";

// const HomePage = () => {
//     return (
//         <div className="font-sans bg-lavender-mist min-h-screen flex flex-col justify-center items-center">
//             {/* Hero Section  */}
//             <section
//                 className="w-full relative h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
//                 style={{
//                     backgroundImage: "url('https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg')",
//                 }}
//             >
//                 <div className="w-full h-full absolute bg-black/60 z-0" />
//                 <div className=" w-full h-full flex flex-col justify-center items-center px-6 z-10">
//                     <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center text-cobalt-blue">
//                         Welcome to Insurance Policies
//                     </h1>
//                     <p className="text-lg font-medium md:text-2xl mb-6 text-center text-cool-gray">
//                         Your trusted partner for expert insurance solutions tailored to your needs.
//                     </p>
//                     <a
//                         href="#services"
//                         className="bg-deep-magenta text-white px-6 py-3 rounded-full text-lg transition hover:bg-cobalt-blue"
//                     >
//                         Learn More
//                     </a>
//                 </div>
//             </section>

//             {/* About Section */}
//             <section id="about" className="py-20 px-6 md:px-12 bg-white w-full">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <h2 className="text-3xl font-bold text-cobalt-blue mb-4">About Us</h2>
//                     <p className="text-cool-gray text-lg max-w-2xl mx-auto mb-8">
//                         We are a trusted policy brokerage firm, connecting you with the best insurance providers to secure
//                         your future. Our team of experts offers personalized solutions for life, health, and auto insurance.
//                     </p>
//                     <img
//                         src="https://media.istockphoto.com/id/1644459705/photo/parents-and-daughter-with-umbrella-against-white-background.jpg?b=1&s=612x612&w=0&k=20&c=VIFpUpWzoHyl6xuf5Gnf-21VbWYypz0jnragSttTIuw="
//                         alt="About Us"
//                         className="mx-auto rounded-lg shadow-lg"
//                     />
//                 </div>
//             </section>

//             {/* Services Section */}
//             <section id="services" className="py-20 px-6 md:px-12 bg-lavender-mist w-full">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <h2 className="text-3xl font-bold text-cobalt-blue mb-8">Our Services</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="bg-white shadow-lg rounded-lg p-6">
//                             <img
//                                 src="https://images.pexels.com/photos/27073784/pexels-photo-27073784.jpeg"
//                                 alt="Life Insurance"
//                                 className="rounded-full mb-4 mx-auto"
//                             />
//                             <h3 className="text-2xl font-semibold text-cobalt-blue mb-4">Life Insurance</h3>
//                             <p className="text-cool-gray">
//                                 Secure your family's future with the best life insurance policies.
//                             </p>
//                         </div>
//                         <div className="bg-white shadow-lg rounded-lg p-6">
//                             <img
//                                 src="https://images.pexels.com/photos/2416864/pexels-photo-2416864.jpeg"
//                                 alt="Health Insurance"
//                                 className="rounded-full mb-4 mx-auto"
//                             />
//                             <h3 className="text-2xl font-semibold text-cobalt-blue mb-4">Health Insurance</h3>
//                             <p className="text-cool-gray">
//                                 Get access to affordable and reliable health insurance plans.
//                             </p>
//                         </div>
//                         <div className="bg-white shadow-lg rounded-lg p-6">
//                             <img
//                                 src="https://images.pexels.com/photos/1822838/pexels-photo-1822838.jpeg"
//                                 alt="Auto Insurance"
//                                 className="rounded-full mb-4 mx-auto"
//                             />
//                             <h3 className="text-2xl font-semibold text-cobalt-blue mb-4">Auto Insurance</h3>
//                             <p className="text-cool-gray">
//                                 Protect your vehicle with our comprehensive auto insurance coverage.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Contact Section */}
//             <section id="contact" className="py-20 px-6 md:px-12 bg-cobalt-blue text-white w-full">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
//                     <p className="text-lg mb-6">
//                         Have any questions or need assistance? Get in touch with us today!
//                     </p>
//                     <a
//                         href="mailto:abc@mail.com"
//                         className="bg-deep-magenta text-white px-8 py-3 rounded-full text-lg transition hover:bg-azure-blue"
//                     >
//                         Email Us
//                     </a>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage;


export default function HomePage() {
    return (
        <div className="w-full bg-white text-[var(--color-licorice)]">
            <HeroSection />
            <AboutUs />
            <OurServices />
            <WhyChooseUs />
            <Testimonials />
            <CTASection />
        </div>
    );
}
