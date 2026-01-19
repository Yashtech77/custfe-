
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { documents, cases } from '../data/mockData';
import { UploadIcon, DownloadIcon, FileIcon, SearchIcon, FilterIcon, ChevronDownIcon } from '../components/Icons';

const DocumentStatusBadge = ({ status }) => {
  const colors = {
    'Verified': 'bg-green-100 text-green-800',
    'Pending Review': 'bg-orange-100 text-orange-800',
    'Rejected': 'bg-red-100 text-red-800',
  };
  return (
    <span className={`badge ${colors[status] || 'badge-gray'}`}>
      {status}
    </span>
  );
};

const FileTypeIcon = ({ type }) => {
  const colors = {
    'PDF': 'bg-red-100 text-red-600',
    'DOC': 'bg-blue-100 text-blue-600',
    'DOCX': 'bg-blue-100 text-blue-600',
    'PNG': 'bg-green-100 text-green-600',
    'JPG': 'bg-green-100 text-green-600',
  };
  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[type] || 'bg-gray-100 text-gray-600'}`}>
      <span className="text-xs font-bold">{type}</span>
    </div>
  );
};

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCase, setFilterCase] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    const matchesCase = filterCase === 'All' || doc.caseId === filterCase;
    return matchesSearch && matchesStatus && matchesCase;
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: `NEW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.name.split('.').pop().toUpperCase(),
      status: 'Uploading...',
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload completion
    setTimeout(() => {
      setUploadedFiles(prev =>
        prev.map(f => ({
          ...f,
          status: 'Pending Review'
        }))
      );
    }, 1500);
  };

  const handleDownload = (doc) => {
    // Simulate download
    alert(`Downloading ${doc.fileName}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
          <p className="text-sm text-gray-500">{filteredDocuments.length} documents</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <UploadIcon className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary inline-flex items-center gap-2 ${showFilters ? 'bg-primary-50 border-primary-200' : ''}`}
          >
            <FilterIcon className="w-4 h-4" />
            Filters
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case</label>
                <select
                  value={filterCase}
                  onChange={(e) => setFilterCase(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="All">All Cases</option>
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>{c.id} - {c.caseType}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <FileTypeIcon type={doc.type} />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">{doc.name}</h3>
                <p className="text-sm text-gray-500 truncate">{doc.fileName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">{doc.size}</span>
                  <span className="text-xs text-gray-400">|</span>
                  <Link
                    to={`/cases/${doc.caseId}`}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    {doc.caseId}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <DocumentStatusBadge status={doc.status} />
              <button
                onClick={() => handleDownload(doc)}
                className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
              >
                <DownloadIcon className="w-4 h-4" />
                Download
              </button>
            </div>
            {doc.status === 'Rejected' && doc.rejectionReason && (
              <div className="mt-3 p-2 bg-red-50 rounded-lg">
                <p className="text-xs text-red-600">
                  <span className="font-medium">Reason:</span> {doc.rejectionReason}
                </p>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2">Uploaded: {doc.uploadedDate}</p>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="card p-12 text-center">
          <FileIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No documents found</h3>
          <p className="text-gray-500 mb-4">Upload your first document to get started</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <UploadIcon className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Upload Documents</h2>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFiles([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your files here, or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    browse
                  </button>
                </p>
                <p className="text-sm text-gray-400">Supported: PDF, DOC, DOCX, PNG, JPG</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileTypeIcon type={file.type} />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <span className={`badge ${
                        file.status === 'Uploading...' ? 'badge-blue' : 'badge-orange'
                      }`}>
                        {file.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadedFiles([]);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadedFiles([]);
                }}
                className="btn-primary"
                disabled={uploadedFiles.length === 0}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
