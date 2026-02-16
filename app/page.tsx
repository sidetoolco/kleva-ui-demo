"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, Download, Code2, MoreHorizontal, Headphones, ArrowUpDown, Phone, Clock, User, FileText, Play } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Pagination } from "@/components/Pagination";
import { Tooltip } from "@/components/Tooltip";
import { useToast } from "@/components/Toast";
import { TableSkeleton } from "@/components/LoadingSkeleton";
import { ActivityFeed } from "@/components/ActivityFeed";
import { SlideOver } from "@/components/SlideOver";

type Tab = "all" | "answered" | "promises" | "no-answer";
type SortField = "to" | "status" | "sent";
type SortDirection = "asc" | "desc";

interface Call {
  to: string;
  status: "promise" | "answered" | "no-answer" | "voicemail";
  statusLabel: string;
  subject: string;
  sent: string;
  sentTimestamp: number;
  hasRecording: boolean;
}

const calls: Call[] = [
  {
    to: "Juan Martinez",
    status: "promise",
    statusLabel: "Promise",
    subject: "VISA-1234 • Payment commitment $1,250",
    sent: "about 2 hours ago",
    sentTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Maria Gonzalez",
    status: "answered",
    statusLabel: "Answered",
    subject: "LOAN-5678 • Follow-up scheduled",
    sent: "about 2 hours ago",
    sentTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Pedro Silva",
    status: "promise",
    statusLabel: "Promise",
    subject: "AUTO-9012 • Payment plan $890",
    sent: "about 3 hours ago",
    sentTimestamp: Date.now() - 3 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Carmen Lopez",
    status: "answered",
    statusLabel: "Answered",
    subject: "VISA-3456 • Callback requested",
    sent: "about 3 hours ago",
    sentTimestamp: Date.now() - 3 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Roberto Diaz",
    status: "no-answer",
    statusLabel: "No Answer",
    subject: "LOAN-7890 • Voicemail left",
    sent: "about 4 hours ago",
    sentTimestamp: Date.now() - 4 * 60 * 60 * 1000,
    hasRecording: false
  },
  {
    to: "Ana Torres",
    status: "answered",
    statusLabel: "Answered",
    subject: "AUTO-2345 • Will pay tomorrow",
    sent: "about 5 hours ago",
    sentTimestamp: Date.now() - 5 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Carlos Ramirez",
    status: "promise",
    statusLabel: "Promise",
    subject: "VISA-6789 • Payment commitment $2,100",
    sent: "1 day ago",
    sentTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Sofia Mendez",
    status: "voicemail",
    statusLabel: "Voicemail",
    subject: "LOAN-3456 • No contact",
    sent: "1 day ago",
    sentTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    hasRecording: false
  },
  {
    to: "Miguel Angel",
    status: "answered",
    statusLabel: "Answered",
    subject: "AUTO-7890 • Hardship request",
    sent: "2 days ago",
    sentTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    hasRecording: true
  },
  {
    to: "Patricia Ruiz",
    status: "promise",
    statusLabel: "Promise",
    subject: "VISA-4567 • Payment commitment $750",
    sent: "2 days ago",
    sentTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    hasRecording: true
  }
];

export default function CallsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("sent");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const itemsPerPage = 5;
  const { showToast } = useToast();

  const filteredAndSortedCalls = useMemo(() => {
    let filtered = calls;
    
    // Filter by tab
    if (activeTab === "answered") filtered = filtered.filter(c => c.status === "answered");
    if (activeTab === "promises") filtered = filtered.filter(c => c.status === "promise");
    if (activeTab === "no-answer") filtered = filtered.filter(c => c.status === "no-answer" || c.status === "voicemail");
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "to") {
        comparison = a.to.localeCompare(b.to);
      } else if (sortField === "status") {
        comparison = a.statusLabel.localeCompare(b.statusLabel);
      } else if (sortField === "sent") {
        comparison = a.sentTimestamp - b.sentTimestamp;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    return filtered;
  }, [activeTab, searchQuery, sortField, sortDirection]);

  const paginatedCalls = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCalls.slice(start, start + itemsPerPage);
  }, [filteredAndSortedCalls, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedCalls.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const exportToCSV = () => {
    const headers = ["To", "Status", "Subject", "Sent"];
    const rows = filteredAndSortedCalls.map(call => [
      call.to,
      call.statusLabel,
      call.subject,
      call.sent
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kleva-calls-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showToast("success", `Exported ${filteredAndSortedCalls.length} calls to CSV`);
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Calls</h1>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Calls</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "all"
              ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("answered")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "answered"
              ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Answered
        </button>
        <button
          onClick={() => setActiveTab("promises")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "promises"
              ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Promises
        </button>
        <button
          onClick={() => setActiveTab("no-answer")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "no-answer"
              ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          No Answer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
          />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
          Last 15 days
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
          All Statuses
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
          All Campaigns
        </button>
        <Tooltip content="API docs">
          <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Code2 className="w-4 h-4" />
          </button>
        </Tooltip>
        <Tooltip content="Export to CSV">
          <button 
            onClick={exportToCSV}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th 
                onClick={() => handleSort("to")}
                className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  To
                  {sortField === "to" && <ArrowUpDown className="w-3 h-3" />}
                </div>
              </th>
              <th 
                onClick={() => handleSort("status")}
                className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Status
                  {sortField === "status" && <ArrowUpDown className="w-3 h-3" />}
                </div>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Subject
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Recording
              </th>
              <th 
                onClick={() => handleSort("sent")}
                className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-end gap-2">
                  Sent
                  {sortField === "sent" && <ArrowUpDown className="w-3 h-3" />}
                </div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCalls.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Headphones className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No calls found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {searchQuery ? "Try adjusting your search" : "Calls will appear here once they're made"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedCalls.map((call, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedCall(call)}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Headphones className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {call.to}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded transition-colors ${
                        call.status === "promise"
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : call.status === "answered"
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : call.status === "voicemail"
                          ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {call.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-gray-300">{call.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    {call.hasRecording ? (
                      <AudioPlayer duration={call.status === "promise" ? "1:45" : call.status === "answered" ? "1:22" : "0:32"} />
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{call.sent}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {paginatedCalls.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedCalls.length}
          />
        )}
      </div>

      {/* Live Activity Feed */}
      <div className="mt-6">
        <ActivityFeed />
      </div>

      {/* Call Detail Slide-Over */}
      <SlideOver isOpen={!!selectedCall} onClose={() => setSelectedCall(null)} title="Call Details">
        {selectedCall && (
          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedCall.to}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedCall.sent}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedCall.status === "promise" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                selectedCall.status === "answered" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                selectedCall.status === "voicemail" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" :
                "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>{selectedCall.statusLabel}</span>
              {selectedCall.hasRecording && (
                <span className="text-xs text-gray-500 dark:text-gray-400">• Recording available</span>
              )}
            </div>

            {/* Subject */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</p>
              <p className="text-sm text-gray-900 dark:text-white">{selectedCall.subject}</p>
            </div>

            {/* Recording Player */}
            {selectedCall.hasRecording && (
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Call Recording</p>
                <AudioPlayer duration={selectedCall.status === "promise" ? "1:45" : "1:22"} compact={false} />
              </div>
            )}

            {/* Call Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Direction</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Outbound</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Duration</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedCall.status === "promise" ? "1:45" : selectedCall.status === "answered" ? "1:22" : "0:12"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Agent</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Maria - Mexico</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Campaign</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Vana Peru B0-30</p>
              </div>
            </div>

            {/* AI Transcript */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">AI Transcript Summary</p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">Agent:</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">Buenos días, hablo con {selectedCall.to}? Le llamo de parte del banco respecto a su cuenta.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 flex-shrink-0">Contact:</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">Sí, soy yo. ¿De qué se trata?</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">Agent:</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">Tenemos un saldo pendiente en su cuenta. ¿Podemos revisar opciones de pago?</p>
                </div>
                {selectedCall.status === "promise" && (
                  <div className="flex gap-3">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 flex-shrink-0">Contact:</span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">Sí, puedo hacer el pago este viernes sin falta.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={() => { showToast("info", "Scheduling follow-up..."); setSelectedCall(null); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                Schedule Follow-up
              </button>
              <button onClick={() => { showToast("success", "Added note to contact"); setSelectedCall(null); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Add Note
              </button>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
