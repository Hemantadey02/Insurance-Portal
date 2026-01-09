import React, { useState } from "react";
import { allPolicies } from "../Data/Policies";
import { X } from 'lucide-react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { policyPurchase } from "../api/Policy/policyApi";
import toast from "react-hot-toast";

const PolicyPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typeFilter, setTypeFilter] = useState(""); // Policy type filter
  const [regionFilter, setRegionFilter] = useState(""); // Region filter

  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const openModal = (policy) => {
    setSelectedPolicy(policy);
  };

  const closeModal = () => {
    setSelectedPolicy(null);
  };

  const handleConfirmPurchase = async () => {
    if (authData.status !== "active") {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);

      const policyData = {

        "userId": authData.user.userId,
        "insurer": selectedPolicy.insurer,
        "policyType": selectedPolicy.policyType,
        "premium": selectedPolicy.premium,
        "status": "Active",
        "expiry": new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      };

      await policyPurchase(policyData);
      toast.success("Policy Purchesed Successfully!")
      closeModal();
    } catch (error) {
      toast.error("Failed to purchase!!")
      console.error("Purchase failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract unique policy types and regions for dropdowns
  const uniqueTypes = [...new Set(allPolicies.map((p) => p.policyType))];
  const uniqueRegions = [...new Set(allPolicies.map((p) => p.region))];

  // Filter policies based on selected filters
  const filteredPolicies = allPolicies.filter((policy) => {
    const matchesType = typeFilter ? policy.policyType === typeFilter : true;
    const matchesRegion = regionFilter ? policy.region === regionFilter : true;
    return matchesType && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto mb-6">
          Explore Our Insurance Policies
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="border border-gray-300 rounded-md px-4 py-2 bg-white"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-md px-4 py-2 bg-white"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All Regions</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Policy Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="relative bg-white rounded-lg shadow-md p-6 pt-10"
              style={{
                borderLeft: `6px solid var(--color-cobalt-blue)`,
              }}
            >
              <div
                className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--color-deep-magenta)",
                  color: "white",
                }}
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

              <div className="flex">
                <button
                  className="w-full py-2 rounded-md text-[var(--color-cobalt-blue)] font-semibold border-2 border-[var(--color-cobalt-blue)]
                hover:bg-[var(--color-cobalt-blue)] hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
                  onClick={() => openModal(policy)}
                >
                  View Policy
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full">No policies found matching the filters.</p>
        )}
      </div>

      {/* Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-cobalt-blue)" }}>
              {selectedPolicy.insurer}
            </h2>

            <div className="mb-2 text-sm text-[var(--color-cool-gray)]">
              <span className="font-semibold">Type:</span> {selectedPolicy.policyType}
            </div>

            <div className="mb-2 text-sm text-[var(--color-cool-gray)]">
              <span className="font-semibold">Region:</span> {selectedPolicy.region}
            </div>

            <div className="mb-2 text-sm text-[var(--color-cool-gray)]">
              <span className="font-semibold">Premium:</span> ${selectedPolicy.premium.toFixed(2)}
            </div>

            <div className="mt-4 text-sm text-[var(--color-licorice)]">
              <span className="font-semibold">Description:</span>
              <p className="mt-1">{selectedPolicy.description}</p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleConfirmPurchase}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-md bg-[var(--color-cobalt-blue)] text-white font-semibold border-2 border-[var(--color-cobalt-blue)]
               hover:text-[var(--color-cobalt-blue)] hover:bg-white transition-all ease-in-out duration-300 cursor-pointer"
              >
                {isSubmitting ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyPage;
