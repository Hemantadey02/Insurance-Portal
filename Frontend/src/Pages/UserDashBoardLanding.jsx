import React from 'react'

const UserDashboardLanding = () => {
  const stats = [
    {
      title: 'Policies Purchased',
      value: 12,
      icon: '📦',
      color: 'bg-[var(--color-cobalt-blue)]',
    },
    {
      title: 'Claims Submitted',
      value: 7,
      icon: '📝',
      color: 'bg-[var(--color-azure-blue)]',
    },
    {
      title: 'Active Policies',
      value: 9,
      icon: '✅',
      color: 'bg-[var(--color-deep-magenta)]',
    },
    {
      title: 'Requests Pending',
      value: 4,
      icon: '📩',
      color: 'bg-[var(--color-chestnut-brown)]',
    },
    {
      title: 'Total Premium Collected',
      value: '$200',
      icon: '💰',
      color: 'bg-[var(--color-licorice)]',
    },
    {
      title: 'Regions Covered',
      value: 'US, UK',
      icon: '🌐',
      color: 'bg-[var(--color-cool-gray)]',
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[var(--color-cobalt-blue)] mb-8">
        Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-6 text-white flex items-center space-x-4 hover:shadow-lg transition-all duration-300 ${item.color}`}
          >
            <div className="text-4xl">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashboardLanding
