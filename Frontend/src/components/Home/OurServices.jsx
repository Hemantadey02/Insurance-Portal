import { ArrowUpRight } from "lucide-react";
import AutoInsuranceImg from '../../assets/Images/AutoInsuranceImg.jpg';
import MedicalInsuranceImg from '../../assets/Images/MedicalInsuranceImg.jpg';
import HomeInsuranceImg from '../../assets/Images/HomeInsuranceImg.jpg';
import FinalExpenseInsuranceImg from '../../assets/Images/FinalExpenseInsuranceImg.jpg';

function OurServices() {
  const services = [
    {
      title: "Auto Insurance",
      desc: "Protect your vehicle with coverage designed to keep you secure.",
      img: AutoInsuranceImg,
    },
    {
      title: "Medicare Insurance",
      desc: "Reliable health coverage plans for peace of mind.",
      img: MedicalInsuranceImg,
    },
    {
      title: "Home Insurance",
      desc: "Protect your home and everything you value inside.",
      img: HomeInsuranceImg,
    },
    {
      title: "Final Expense Insurance",
      desc: "Plan ahead to protect your loved ones financially.",
      img: FinalExpenseInsuranceImg,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[var(--color-lavender-mist)] to-[var(--color-deep-magenta)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <p className="text-[var(--color-cobalt-blue)] font-semibold mb-2 text-3xl">
          Our Services
        </p>
        <h2 className="text-2xl font-bold mb-12">
          Tailored Protection for Every Need
        </h2>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[var(--color-cool-gray)] p-4 flex flex-col hover:shadow-xl hover:scale-105 transition ease-in-out duration-300"
            >
              {/* Top Content */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold w-32 text-wrap text-lg">
                  {service.title}
                </h3>
                <span className="p-2 rounded-full bg-[var(--color-azure-blue)] text-white">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {service.desc}
              </p>

              {/* Image */}
              <div className="mt-auto">
                <img
                  src={service.img}
                  alt={service.title}
                  className="rounded-xl w-full h-40 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default OurServices;
