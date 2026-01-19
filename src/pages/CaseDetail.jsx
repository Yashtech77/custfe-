
import { useParams, Link } from 'react-router-dom';
import { cases, documents, messages } from '../data/mockData';
import { ChevronLeftIcon, CheckCircleIcon, ClockIcon, FileIcon } from '../components/Icons';

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

const TimelineStep = ({ stage, status, date, isLast }) => {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-500' : 'bg-gray-200'
        }`}>
          {isCompleted ? (
            <CheckCircleIcon className="w-5 h-5 text-white" />
          ) : isInProgress ? (
            <ClockIcon className="w-5 h-5 text-white" />
          ) : (
            <span className="w-3 h-3 bg-gray-400 rounded-full" />
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-16 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
        )}
      </div>
      <div className="pb-8">
        <p className={`font-medium ${isCompleted || isInProgress ? 'text-gray-800' : 'text-gray-500'}`}>
          {stage}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {date || (isInProgress ? 'In Progress' : 'Pending')}
        </p>
        {isInProgress && (
          <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Currently Active
          </span>
        )}
      </div>
    </div>
  );
};

export default function CaseDetail() {
  const { id } = useParams();
  const caseData = cases.find(c => c.id === id);

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800">Case not found</h2>
        <p className="text-gray-500 mt-2">The case you're looking for doesn't exist.</p>
        <Link to="/cases" className="btn-primary inline-block mt-4">
          Back to Cases
        </Link>
      </div>
    );
  }

  const caseDocuments = documents.filter(d => d.caseId === id);
  const caseMessages = messages.filter(m => m.caseId === id).slice(0, 3);

  const progressPercentage = Math.min((caseData.slaElapsed / caseData.slaTotal) * 100, 100);
  let progressColor = 'bg-green-500';
  if (caseData.slaFlag === 'Delayed') {
    progressColor = 'bg-red-500';
  } else if (progressPercentage > 75) {
    progressColor = 'bg-orange-500';
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/cases"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Back to Cases
      </Link>

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">{caseData.id}</h1>
              <StatusBadge status={caseData.status} />
              <PriorityBadge priority={caseData.priority} />
            </div>
            <p className="text-gray-600 mt-2">{caseData.description}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${
            caseData.slaFlag === 'On Time' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <p className="text-sm font-medium">{caseData.slaFlag}</p>
            <p className="text-xs">{caseData.slaElapsed} / {caseData.slaTotal} days</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{caseData.overallProgress}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-500`}
              style={{ width: `${caseData.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Case Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Case Type</p>
                <p className="font-medium text-gray-800">{caseData.caseType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lead Source</p>
                <p className="font-medium text-gray-800">{caseData.leadSource}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Stage</p>
                <p className="font-medium text-gray-800">{caseData.currentStage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Certificate Number</p>
                <p className="font-medium text-gray-800">{caseData.certificateNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created Date</p>
                <p className="font-medium text-gray-800">{caseData.createdDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-800">{caseData.lastUpdated}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valuation</p>
                <p className="font-medium text-gray-800">{caseData.valuation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Client Benefit</p>
                <p className="font-medium text-green-600">{caseData.clientBenefit}</p>
              </div>
            </div>
          </div>

          {/* Case Timeline */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Case Timeline</h2>
            <div className="pl-2">
              {caseData.timeline.map((step, index) => (
                <TimelineStep
                  key={step.stage}
                  stage={step.stage}
                  status={step.status}
                  date={step.date}
                  isLast={index === caseData.timeline.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
              <Link
                to="/documents"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </Link>
            </div>
            {caseDocuments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No documents uploaded yet</p>
            ) : (
              <div className="space-y-3">
                {caseDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} - {doc.uploadedDate}</p>
                      </div>
                    </div>
                    <span className={`badge ${
                      doc.status === 'Verified' ? 'badge-green' :
                      doc.status === 'Rejected' ? 'badge-red' : 'badge-orange'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Relationship Managers */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Relationship Managers</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Sales RM</p>
                <p className="font-medium text-gray-800">{caseData.salesRM}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Operations RM</p>
                <p className="font-medium text-gray-800">{caseData.operationsRM}</p>
              </div>
            </div>
            <Link
              to="/messages"
              className="btn-primary w-full mt-4 text-center block"
            >
              Contact RM
            </Link>
          </div>

          {/* Recent Messages */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Messages</h2>
              <Link
                to="/messages"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </Link>
            </div>
            {caseMessages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No messages yet</p>
            ) : (
              <div className="space-y-3">
                {caseMessages.map((msg) => (
                  <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-800">{msg.sender}</p>
                      <p className="text-xs text-gray-400">{msg.timestamp.split(' ').slice(-2).join(' ')}</p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Escalation Status */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Escalation Status</h2>
            <div className={`p-4 rounded-lg ${
              caseData.escalation === 'None' ? 'bg-gray-50' :
              caseData.escalation === 'Raised' ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <p className={`font-medium ${
                caseData.escalation === 'None' ? 'text-gray-600' :
                caseData.escalation === 'Raised' ? 'text-yellow-700' : 'text-green-700'
              }`}>
                {caseData.escalation === 'None' ? 'No Escalation' :
                 caseData.escalation === 'Raised' ? 'Escalation Raised' : 'Escalation Resolved'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {caseData.escalation === 'None' ? 'Case is progressing normally' :
                 caseData.escalation === 'Raised' ? 'Your case has been escalated for priority handling' :
                 'Previous escalation has been resolved'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
