import AboutUsImg from "../../assets/images/AboutUsImg.jpg";

function AboutUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--color-cool-gray)] to-[var(--color-lavender-mist)]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <div className="relative">
          <img
            src={AboutUsImg}
            className="rounded-3xl shadow-lg"
            alt="About us"
          />
          <div className="absolute -bottom-10 right-[35%] bg-white px-4 py-3 rounded-xl shadow">
            <p className="text-3xl font-bold text-[var(--color-cobalt-blue)] text-center">20+</p>
            <p className="text-sm text-gray-600">Years Experience</p>
          </div>
        </div>

        <div>
          <p className="text-3xl text-[var(--color-cobalt-blue)] font-semibold mb-2">
            About Us
          </p>
          <h2 className="text-2xl font-bold mb-6">
            Our Company Makes Your Family Secure
          </h2>
          <p className="text-gray-600 mb-6">
            We connect individuals with trusted insurance providers, offering transparent,
            reliable, and simplified insurance management.
          </p>

          <ul className="space-y-3">
            <li>✔ Protect and grow your financial security</li>
            <li>✔ Instant policy and claim tracking</li>
            <li>✔ Guaranteed transparent processes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;