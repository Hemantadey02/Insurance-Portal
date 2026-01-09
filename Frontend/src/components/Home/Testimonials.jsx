import { Quote } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Anita Sharma",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul Verma",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Singh",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[var(--color-lavender-mist)] to-[var(--color-chestnut-brown)]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl text-[var(--color-cobalt-blue)] font-semibold mb-16">
          What our users say about us
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 items-end">
          {testimonials.map((item, index) => (
            <div key={index} className="group flex flex-col items-center">

              {/* Testimonial Card */}
              <div
                className="
                  relative w-full rounded-2xl px-6 py-8 text-sm leading-relaxed
                  bg-[#EAF1FF] text-gray-600
                  transition-all duration-500 ease-out
                  transform group-hover:-translate-y-4 group-hover:scale-105
                  group-hover:bg-[var(--color-cobalt-blue)]
                  group-hover:text-white
                "
              >
                {/* Quote Icon */}
                <Quote
                  size={28}
                  className="
                    mx-auto mb-4
                    text-[var(--color-cobalt-blue)]
                    transition-colors duration-300
                    group-hover:text-white
                  "
                />

                <p>
                  Website is not only visually appealing but also highly responsive.
                  The informative content, from case studies to client testimonials.
                </p>

                {/* Speech Bubble Pointer */}
                <div
                  className="
                    absolute -bottom-3 left-1/2 -translate-x-1/2
                    w-6 h-6 rotate-45
                    bg-[#EAF1FF]
                    transition-colors duration-300
                    group-hover:bg-[var(--color-cobalt-blue)]
                  "
                />
              </div>

              {/* Avatar */}
              <img
                src={item.img}
                alt={item.name}
                className="
                  w-12 h-12 rounded-full mt-6
                  border-2 border-[#EAF1FF]
                  shadow
                  transition-all duration-500
                  group-hover:-translate-y-1
                  group-hover:border-[var(--color-cobalt-blue)]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
