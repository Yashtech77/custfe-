
import { Link } from 'react-router-dom';
import { cases, dashboardStats } from '../data/mockData';
import { CasesIcon, CheckCircleIcon, ClockIcon, AlertIcon } from '../components/Icons';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="card p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const SLAProgressRing = ({ percentage }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#f97316' : '#ef4444';

  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 transform -rotate-90">
        <circle
          cx="56"
          cy="56"
          r="40"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="56"
          cy="56"
          r="40"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
      </div>
    </div>
  );
};

const RecentCaseCard = ({ caseItem }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Closed': return 'badge-green';
      case 'In Progress': return 'badge-blue';
      case 'Delayed': return 'badge-red';
      default: return 'badge-gray';
    }
  };

  const getSlaColor = (slaFlag) => {
    return slaFlag === 'On Time' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            to={`/cases/${caseItem.id}`}
            className="font-medium text-gray-800 hover:text-primary-600"
          >
            {caseItem.id}
          </Link>
          <span className={`badge ${getStatusColor(caseItem.status)}`}>
            {caseItem.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{caseItem.caseType}</p>
        <p className="text-xs text-gray-400 mt-0.5">Stage: {caseItem.currentStage}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${getSlaColor(caseItem.slaFlag)}`}>
          {caseItem.slaFlag}
        </p>
        <p className="text-xs text-gray-400">
          {caseItem.slaElapsed}/{caseItem.slaTotal} days
        </p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const recentCases = cases.slice(0, 5);
  const activeCases = cases.filter(c => c.status !== 'Closed');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <h2 className="text-xl font-semibold">Welcome back, Rajesh!</h2>
        <p className="text-primary-100 mt-1">
          Here's an overview of your cases and their status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Cases"
          value={dashboardStats.activeCases}
          icon={CasesIcon}
          color="bg-blue-100 text-blue-600"
          subtext="Total ongoing cases"
        />
        <StatCard
          title="Completed"
          value={dashboardStats.completedCases}
          icon={CheckCircleIcon}
          color="bg-green-100 text-green-600"
          subtext="Successfully closed"
        />
        <StatCard
          title="In Progress"
          value={dashboardStats.inProgressCases}
          icon={ClockIcon}
          color="bg-orange-100 text-orange-600"
          subtext="Being processed"
        />
        <StatCard
          title="Delayed"
          value={dashboardStats.delayedCases}
          icon={AlertIcon}
          color="bg-red-100 text-red-600"
          subtext="Needs attention"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Performance */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-800 mb-4">SLA Performance</h3>
          <div className="flex items-center justify-center py-4">
            <SLAProgressRing percentage={dashboardStats.slaOnTimePercentage} />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            On-time completion rate
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Valuation</span>
              <span className="font-medium text-gray-800">{dashboardStats.totalValuation}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Total Benefit</span>
              <span className="font-medium text-green-600">{dashboardStats.totalBenefit}</span>
            </div>
          </div>
        </div>

        {/* Recent Cases */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Cases</h3>
            <Link
              to="/cases"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCases.map((caseItem) => (
              <RecentCaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </div>
      </div>

      {/* Stage Distribution */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Active Cases by Stage</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Document Verification', 'DRF Generation', 'DP Processing', 'NSDL/CDSL Processing', 'Credit to Demat'].map((stage) => {
            const count = activeCases.filter(c => c.currentStage === stage).length;
            return (
              <div key={stage} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-gray-800">{count}</p>
                <p className="text-xs text-gray-500 mt-1">{stage}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/cases"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <CasesIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-800">View Cases</span>
          </Link>
          <Link
            to="/documents"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Upload Documents</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Contact RM</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
          >
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">My Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
