function WhyChooseUs() {
  return (
    <section className="py-24 bg-[var(--color-lavender-mist)]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          className="rounded-3xl shadow-lg"
          alt="Why choose us"
        />

        <div>
          <p className="text-3xl text-[var(--color-cobalt-blue)] font-semibold mb-2">
            Why Choose Us
          </p>
          <h2 className="text-2xl font-bold mb-6">
            Innovative Solutions for Your Insurance Needs
          </h2>

          <div className="space-y-4">
            <div>✔ Certified and trusted providers</div>
            <div>✔ Easy plan comparison</div>
            <div>✔ Expert claim guidance</div>
            <div>✔ Secure & compliant platform</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;