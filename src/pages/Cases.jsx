
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cases, caseStages, caseTypes, statusOptions, priorityOptions, slaFlagOptions } from '../data/mockData';
import { SearchIcon, FilterIcon, ExportIcon, EyeIcon, ChevronDownIcon } from '../components/Icons';

const ProgressBar = ({ elapsed, total, slaFlag }) => {
  const percentage = Math.min((elapsed / total) * 100, 100);
  let barColor = 'bg-green-500';

  if (slaFlag === 'Delayed' || elapsed > total) {
    barColor = 'bg-red-500';
  } else if (percentage > 75) {
    barColor = 'bg-orange-500';
  }

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {elapsed}/{total} days
      </p>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    'Closed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Approved': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
  };
  return (
    <span className={`badge ${colors[status] || 'badge-gray'}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    'High': 'bg-orange-100 text-orange-800',
    'Medium': 'bg-blue-100 text-blue-800',
    'Low': 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`badge ${colors[priority] || 'badge-gray'}`}>
      {priority}
    </span>
  );
};

const SlaFlag = ({ flag }) => {
  const isOnTime = flag === 'On Time';
  return (
    <span className={`inline-flex items-center gap-1 text-sm ${isOnTime ? 'text-green-600' : 'text-red-600'}`}>
      {isOnTime ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      {flag}
    </span>
  );
};

const EscalationBadge = ({ escalation }) => {
  const colors = {
    'None': 'bg-gray-100 text-gray-600',
    'Raised': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
  };
  return (
    <span className={`badge ${colors[escalation] || 'badge-gray'}`}>
      {escalation}
    </span>
  );
};

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    caseType: 'All',
    status: 'All',
    priority: 'All',
    slaFlag: 'All',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  // Filter cases based on search, tab, and filters
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        c.customerName.toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower) ||
        c.certificateNumber.toLowerCase().includes(searchLower);

      // Tab filter
      const matchesTab = activeTab === 'All' || c.currentStage === activeTab;

      // Other filters
      const matchesCaseType = filters.caseType === 'All' || c.caseType === filters.caseType;
      const matchesStatus = filters.status === 'All' || c.status === filters.status;
      const matchesPriority = filters.priority === 'All' || c.priority === filters.priority;
      const matchesSlaFlag = filters.slaFlag === 'All' || c.slaFlag === filters.slaFlag;

      return matchesSearch && matchesTab && matchesCaseType && matchesStatus && matchesPriority && matchesSlaFlag;
    });
  }, [searchQuery, activeTab, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / rowsPerPage);
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleExportCSV = () => {
    const headers = ['Case ID', 'Customer Name', 'Case Type', 'Current Stage', 'Status', 'Priority', 'SLA Flag', 'Created Date'];
    const csvData = filteredCases.map(c => [
      c.id, c.customerName, c.caseType, c.currentStage, c.status, c.priority, c.slaFlag, c.createdDate
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cases_export.csv';
    link.click();
  };

  const resetFilters = () => {
    setFilters({
      caseType: 'All',
      status: 'All',
      priority: 'All',
      slaFlag: 'All',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Cases</h2>
          <p className="text-sm text-gray-500">{filteredCases.length} cases found</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <ExportIcon className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, case ID, certificate number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary inline-flex items-center gap-2 ${showFilters ? 'bg-primary-50 border-primary-200' : ''}`}
          >
            <FilterIcon className="w-4 h-4" />
            Filters
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
                <select
                  value={filters.caseType}
                  onChange={(e) => setFilters({ ...filters, caseType: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="All">All Types</option>
                  {caseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SLA Flag</label>
                <select
                  value={filters.slaFlag}
                  onChange={(e) => setFilters({ ...filters, slaFlag: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {slaFlagOptions.map(flag => (
                    <option key={flag} value={flag}>{flag}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex -mb-px min-w-max">
            {caseStages.map((stage) => {
              const count = stage === 'All'
                ? cases.length
                : cases.filter(c => c.currentStage === stage).length;
              return (
                <button
                  key={stage}
                  onClick={() => {
                    setActiveTab(stage);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === stage
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {stage}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === stage ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Case Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Stage</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Operations RM</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SLA Flag</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Escalation</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                    No cases found matching your criteria
                  </td>
                </tr>
              ) : (
                paginatedCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <Link
                        to={`/cases/${caseItem.id}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {caseItem.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">{caseItem.caseType}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{caseItem.currentStage}</td>
                    <td className="px-4 py-4 w-32">
                      <ProgressBar
                        elapsed={caseItem.slaElapsed}
                        total={caseItem.slaTotal}
                        slaFlag={caseItem.slaFlag}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={caseItem.status} />
                    </td>
                    <td className="px-4 py-4">
                      <PriorityBadge priority={caseItem.priority} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{caseItem.operationsRM}</td>
                    <td className="px-4 py-4">
                      <SlaFlag flag={caseItem.slaFlag} />
                    </td>
                    <td className="px-4 py-4">
                      <EscalationBadge escalation={caseItem.escalation} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{caseItem.createdDate}</td>
                    <td className="px-4 py-4">
                      <Link
                        to={`/cases/${caseItem.id}`}
                        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <EyeIcon className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredCases.length)} of {filteredCases.length} cases
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm rounded-lg ${
                    currentPage === page
                      ? 'bg-primary-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
