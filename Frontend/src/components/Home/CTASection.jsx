import { useNavigate } from "react-router-dom";
import { allPolicies } from "../../Data/Policies";

function CTASection() {
  const navigate = useNavigate();

  const getRandomPolicies = (allPolicies, count = 3) => {
    const shuffled = [...allPolicies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Inside your component render
  const randomPolicies = getRandomPolicies(allPolicies, 3);

  return (
    <section className="py-24 bg-gradient-to-r from-[var(--color-cobalt-blue)] to-[white] text-center">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-4">
        Success! Your Journey Toward Better Coverage Starts Now
      </h2>
      <p className="mb-8 text-lg opacity-90">
        Explore plans and secure what matters most today.
      </p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {randomPolicies.map((policy) => (
          <div
            key={policy.id}
            className="relative text-left bg-white rounded-lg shadow-md p-6 pt-10"
            style={{ borderLeft: `6px solid var(--color-cobalt-blue)` }}
          >
            <div
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: "var(--color-deep-magenta)", color: "white" }}
            >
              {policy.policyType}
            </div>

            <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--color-cobalt-blue)" }}>
              Insurer: {policy.insurer}
            </h3>

            <p className="text-sm mb-1" style={{ color: "var(--color-cool-gray)" }}>
              Premium: ${policy.premium.toFixed(2)}
            </p>
            <p className="text-sm mb-3" style={{ color: "var(--color-cool-gray)" }}>
              Region: {policy.region}
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--color-licorice)" }}>
              {policy.description.length > 45
                ? policy.description.slice(0, 45) + "..."
                : policy.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => navigate("/dashboard/policies")} className="px-6 py-3 bg-white border border-cobalt-blue text-[var(--color-cobalt-blue)] hover:bg-[var(--color-cobalt-blue)] hover:text-white rounded-full font-semibold transition ease-in-out duration-300 cursor-pointer">
          Explore Plans
        </button>
        {/* <button className="px-6 py-3 border border-white/40 rounded-full">
          Back to Home
        </button> */}
      </div>
      </div>
    </section>
  );
}

export default CTASection;