"use client";

import { useState, useMemo } from "react";
import { Search, Download, Code2, MoreHorizontal, Mail, ArrowUpDown } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { Tooltip } from "@/components/Tooltip";
import { useToast } from "@/components/Toast";

type Tab = "all" | "sent" | "opened" | "clicked";
type SortField = "to" | "status" | "subject" | "sent";
type SortDirection = "asc" | "desc";

interface Email {
  to: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "bounced";
  statusLabel: string;
  subject: string;
  sent: string;
  sentTimestamp: number;
}

const emails: Email[] = [
  { to: "juan.martinez@email.com", status: "opened", statusLabel: "Opened", subject: "Payment Reminder - VISA-1234", sent: "about 1 hour ago", sentTimestamp: Date.now() - 1 * 60 * 60 * 1000 },
  { to: "maria.gonzalez@email.com", status: "clicked", statusLabel: "Clicked", subject: "Payment Link for LOAN-5678", sent: "about 2 hours ago", sentTimestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { to: "pedro.silva@email.com", status: "opened", statusLabel: "Opened", subject: "Payment Plan Confirmation - AUTO-9012", sent: "about 2 hours ago", sentTimestamp: Date.now() - 2.5 * 60 * 60 * 1000 },
  { to: "carmen.lopez@email.com", status: "delivered", statusLabel: "Delivered", subject: "Account Update - VISA-3456", sent: "about 3 hours ago", sentTimestamp: Date.now() - 3 * 60 * 60 * 1000 },
  { to: "roberto.diaz@email.com", status: "sent", statusLabel: "Sent", subject: "Important Account Notice - LOAN-7890", sent: "about 4 hours ago", sentTimestamp: Date.now() - 4 * 60 * 60 * 1000 },
  { to: "ana.torres@email.com", status: "clicked", statusLabel: "Clicked", subject: "Payment Confirmation - AUTO-2345", sent: "about 5 hours ago", sentTimestamp: Date.now() - 5 * 60 * 60 * 1000 },
  { to: "carlos.ramirez@email.com", status: "opened", statusLabel: "Opened", subject: "Thank You - VISA-6789", sent: "1 day ago", sentTimestamp: Date.now() - 24 * 60 * 60 * 1000 },
  { to: "sofia.mendez@email.com", status: "bounced", statusLabel: "Bounced", subject: "Account Status - LOAN-3456", sent: "1 day ago", sentTimestamp: Date.now() - 26 * 60 * 60 * 1000 },
  { to: "miguel.angel@email.com", status: "delivered", statusLabel: "Delivered", subject: "Support Request Received - AUTO-7890", sent: "2 days ago", sentTimestamp: Date.now() - 48 * 60 * 60 * 1000 },
  { to: "patricia.ruiz@email.com", status: "clicked", statusLabel: "Clicked", subject: "Payment Options - VISA-4567", sent: "2 days ago", sentTimestamp: Date.now() - 50 * 60 * 60 * 1000 },
];

export default function EmailsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("sent");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { showToast } = useToast();

  const filteredAndSorted = useMemo(() => {
    let filtered = emails;
    if (activeTab === "sent") filtered = filtered.filter(e => e.status === "sent" || e.status === "delivered");
    if (activeTab === "opened") filtered = filtered.filter(e => e.status === "opened");
    if (activeTab === "clicked") filtered = filtered.filter(e => e.status === "clicked");
    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === "to") cmp = a.to.localeCompare(b.to);
      else if (sortField === "status") cmp = a.statusLabel.localeCompare(b.statusLabel);
      else if (sortField === "subject") cmp = a.subject.localeCompare(b.subject);
      else if (sortField === "sent") cmp = a.sentTimestamp - b.sentTimestamp;
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return filtered;
  }, [activeTab, searchQuery, sortField, sortDirection]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDirection("asc"); }
  };

  const exportToCSV = () => {
    const headers = ["To", "Status", "Subject", "Sent"];
    const rows = filteredAndSorted.map(e => [e.to, e.statusLabel, e.subject, e.sent]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kleva-emails-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast("success", `Exported ${filteredAndSorted.length} emails to CSV`);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "sent", label: "Sent" },
    { key: "opened", label: "Opened" },
    { key: "clicked", label: "Clicked" },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Emails</h1>
      </div>

      <div className="flex items-center gap-6 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setCurrentPage(1); }}
            className={`text-sm font-medium pb-2 transition-colors ${activeTab === t.key ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >{t.label}</button>
        ))}
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all" />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Last 15 days</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">All Statuses</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">All Campaigns</button>
        <Tooltip content="API docs">
          <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Code2 className="w-4 h-4" />
          </button>
        </Tooltip>
        <Tooltip content="Export to CSV">
          <button onClick={exportToCSV} className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th onClick={() => handleSort("to")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">To {sortField === "to" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("status")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Status {sortField === "status" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("subject")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Subject {sortField === "subject" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("sent")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Sent {sortField === "sent" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No emails found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{searchQuery ? "Try adjusting your search" : "Emails will appear here once sent"}</p>
                  </div>
                </td>
              </tr>
            ) : paginated.map((email, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{email.to}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded transition-colors ${
                    email.status === "clicked" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    email.status === "opened" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    email.status === "delivered" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" :
                    email.status === "sent" ? "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400" :
                    "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}>{email.statusLabel}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 dark:text-gray-300">{email.subject}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{email.sent}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginated.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} itemsPerPage={itemsPerPage} totalItems={filteredAndSorted.length} />
        )}
      </div>
    </div>
  );
}
