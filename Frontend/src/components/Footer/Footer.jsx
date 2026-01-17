import React from 'react'

function Footer() {
    return (
        <footer className="bg-licorice w-full">
  <div className="max-w-[94%] mx-auto px-2 py-10">

    {/* Top Section */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

      {/* Brand */}
      <div>
        <h3 className="text-3xl font-semibold text-cobalt-blue">
          Insureva
        </h3>
        <p className="mt-2 text-sm text-cool-gray max-w-sm leading-relaxed">
          Manage your insurance policies, claims, and requests securely from one trusted platform.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap gap-x-10 gap-y-4 text-md text-lavender-mist">
        <a
          href="/dashboard/policies"
          className="hover:text-azure-blue text-deep-magenta transition"
        >
          Explore Policies
        </a>
        <a
          href="/dashboard/myPolicies"
          className="hover:text-azure-blue text-deep-magenta transition"
        >
          My Policies
        </a>
        <a
          href="/dashboard/claims"
          className="hover:text-azure-blue text-deep-magenta transition"
        >
          My Claims
        </a>
        <a
          href="/dashboard/requests"
          className="hover:text-azure-blue text-deep-magenta transition"
        >
          My Requests
        </a>
        <a
          href="/dashboard/messages"
          className="hover:text-azure-blue text-deep-magenta transition"
        >
          Messages
        </a>
      </nav>

      {/* Support CTA */}
      <a
        href="mailto:support123@gmail.com"
        className="inline-flex items-center rounded-full border  px-5 py-2 text-md border-azure-blue text-azure-blue hover:bg-azure-blue hover:text-[var(--color-lavender-mist)] transition ease-in duration-200"
      >
        Need help?
      </a>

    </div>

    {/* Divider */}
    <div className="my-8 h-[0.5px] bg-[var(--color-cool-gray)]" />

    {/* Bottom Section */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-lavender-mist)]">

      <span>
        © {new Date().getFullYear()} Insureva. All rights reserved.
      </span>

      <div className="flex gap-6">
        <a
          href="/privacy"
          className="hover:text-lavender-mist transition"
        >
          Privacy
        </a>
        <a
          href="/terms"
          className="hover:text-lavender-mist transition"
        >
          Terms
        </a>
        <a
          href="/compliance"
          className="hover:text-lavender-mist transition"
        >
          Compliance
        </a>
      </div>

    </div>

  </div>
</footer>

    )
}

export default Footer