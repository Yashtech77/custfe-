
import { useState, useRef, useEffect } from 'react';
import { messages, cases } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { SendIcon, SearchIcon } from '../components/Icons';

export default function Messages() {
  const { user } = useAuth();
  const [selectedCase, setSelectedCase] = useState(cases[0]?.id || null);
  const [messageInput, setMessageInput] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, selectedCase]);

  const caseMessages = localMessages
    .filter(m => m.caseId === selectedCase)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const filteredCases = cases.filter(c =>
    !searchQuery ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUnreadCount = (caseId) => {
    return localMessages.filter(m => m.caseId === caseId && !m.read && m.senderType === 'rm').length;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedCase) return;

    const newMessage = {
      id: `MSG-${Date.now()}`,
      caseId: selectedCase,
      sender: user?.name || 'Customer',
      senderType: 'customer',
      message: messageInput,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      read: true
    };

    setLocalMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // Simulate RM response
    setTimeout(() => {
      const rmResponse = {
        id: `MSG-${Date.now()}-RM`,
        caseId: selectedCase,
        sender: 'Priya Patel',
        senderType: 'rm',
        message: "Thank you for your message. I'll review this and get back to you shortly.",
        timestamp: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        read: false
      };
      setLocalMessages(prev => [...prev, rmResponse]);
    }, 2000);
  };

  const selectedCaseData = cases.find(c => c.id === selectedCase);

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="card flex-1 overflow-hidden flex">
        {/* Case List Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Case List */}
          <div className="flex-1 overflow-y-auto">
            {filteredCases.map((caseItem) => {
              const unreadCount = getUnreadCount(caseItem.id);
              const lastMessage = localMessages
                .filter(m => m.caseId === caseItem.id)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

              return (
                <button
                  key={caseItem.id}
                  onClick={() => setSelectedCase(caseItem.id)}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedCase === caseItem.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium truncate ${
                          selectedCase === caseItem.id ? 'text-primary-600' : 'text-gray-800'
                        }`}>
                          {caseItem.id}
                        </p>
                        {unreadCount > 0 && (
                          <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{caseItem.caseType}</p>
                      {lastMessage && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {lastMessage.senderType === 'customer' ? 'You: ' : ''}
                          {lastMessage.message}
                        </p>
                      )}
                    </div>
                    <span className={`badge text-xs ${
                      caseItem.status === 'Closed' ? 'badge-green' :
                      caseItem.status === 'Delayed' ? 'badge-red' : 'badge-blue'
                    }`}>
                      {caseItem.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {selectedCaseData && (
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedCaseData.id}</h3>
                  <p className="text-sm text-gray-500">{selectedCaseData.caseType} - {selectedCaseData.currentStage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Operations RM</p>
                  <p className="text-sm text-gray-500">{selectedCaseData.operationsRM}</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {caseMessages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No messages yet</h3>
                <p className="text-gray-500">Start a conversation with your relationship manager</p>
              </div>
            ) : (
              caseMessages.map((msg) => {
                const isCustomer = msg.senderType === 'customer';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isCustomer ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        isCustomer
                          ? 'bg-primary-500 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 rounded-bl-sm'
                      }`}>
                        <p className={`text-sm ${isCustomer ? 'text-white' : 'text-gray-800'}`}>
                          {msg.message}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-400">{msg.sender}</span>
                        <span className="text-xs text-gray-400">
                          {msg.timestamp.split(' ').slice(-2).join(' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon className="w-4 h-4" />
                Send
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              Messages are not real-time. Your RM will respond during business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
