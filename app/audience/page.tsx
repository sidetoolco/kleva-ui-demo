"use client";

import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Plus, Users, Trash2, Send, ArrowUpDown, Download } from "lucide-react";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";
import { Tooltip } from "@/components/Tooltip";
import { useToast } from "@/components/Toast";

type Tab = "all" | "active" | "promises" | "inactive";
type SortField = "name" | "balance" | "status" | "lastContact";
type SortDirection = "asc" | "desc";

interface Contact {
  id: string;
  name: string;
  account: string;
  balance: number;
  status: "active" | "promise" | "inactive" | "paid";
  statusLabel: string;
  phone: string;
  lastContact: string;
  lastContactTimestamp: number;
  totalCalls: number;
  totalMessages: number;
}

const contacts: Contact[] = [
  { id: "1", name: "Juan Martinez", account: "VISA-1234", balance: 1250, status: "promise", statusLabel: "Promise", phone: "+52 55 1234 5678", lastContact: "2 hours ago", lastContactTimestamp: Date.now() - 2 * 3600000, totalCalls: 5, totalMessages: 3 },
  { id: "2", name: "Maria Gonzalez", account: "LOAN-5678", balance: 3800, status: "active", statusLabel: "Active", phone: "+52 55 2345 6789", lastContact: "3 hours ago", lastContactTimestamp: Date.now() - 3 * 3600000, totalCalls: 8, totalMessages: 5 },
  { id: "3", name: "Pedro Silva", account: "AUTO-9012", balance: 890, status: "promise", statusLabel: "Promise", phone: "+51 1 3456 7890", lastContact: "5 hours ago", lastContactTimestamp: Date.now() - 5 * 3600000, totalCalls: 3, totalMessages: 2 },
  { id: "4", name: "Carmen Lopez", account: "VISA-3456", balance: 2100, status: "active", statusLabel: "Active", phone: "+52 55 4567 8901", lastContact: "1 day ago", lastContactTimestamp: Date.now() - 24 * 3600000, totalCalls: 4, totalMessages: 2 },
  { id: "5", name: "Roberto Diaz", account: "LOAN-7890", balance: 5600, status: "inactive", statusLabel: "No Contact", phone: "+57 1 5678 9012", lastContact: "3 days ago", lastContactTimestamp: Date.now() - 72 * 3600000, totalCalls: 2, totalMessages: 1 },
  { id: "6", name: "Ana Torres", account: "AUTO-2345", balance: 1450, status: "promise", statusLabel: "Promise", phone: "+502 2345 6789", lastContact: "1 day ago", lastContactTimestamp: Date.now() - 28 * 3600000, totalCalls: 6, totalMessages: 4 },
  { id: "7", name: "Carlos Ramirez", account: "VISA-6789", balance: 0, status: "paid", statusLabel: "Paid", phone: "+52 55 6789 0123", lastContact: "1 week ago", lastContactTimestamp: Date.now() - 168 * 3600000, totalCalls: 4, totalMessages: 2 },
  { id: "8", name: "Sofia Mendez", account: "LOAN-3456", balance: 4200, status: "inactive", statusLabel: "No Contact", phone: "+52 55 7890 1234", lastContact: "5 days ago", lastContactTimestamp: Date.now() - 120 * 3600000, totalCalls: 1, totalMessages: 1 },
  { id: "9", name: "Miguel Angel", account: "AUTO-7890", balance: 3200, status: "active", statusLabel: "Active", phone: "+57 1 8901 2345", lastContact: "2 days ago", lastContactTimestamp: Date.now() - 48 * 3600000, totalCalls: 7, totalMessages: 6 },
  { id: "10", name: "Patricia Ruiz", account: "VISA-4567", balance: 750, status: "promise", statusLabel: "Promise", phone: "+52 55 9012 3456", lastContact: "1 day ago", lastContactTimestamp: Date.now() - 30 * 3600000, totalCalls: 5, totalMessages: 3 },
];

export default function AudiencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastContact");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { showToast } = useToast();

  const filteredAndSorted = useMemo(() => {
    let filtered = contacts;
    if (activeTab === "active") filtered = filtered.filter(c => c.status === "active");
    if (activeTab === "promises") filtered = filtered.filter(c => c.status === "promise");
    if (activeTab === "inactive") filtered = filtered.filter(c => c.status === "inactive");
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
      );
    }
    filtered = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "balance") cmp = a.balance - b.balance;
      else if (sortField === "status") cmp = a.statusLabel.localeCompare(b.statusLabel);
      else if (sortField === "lastContact") cmp = a.lastContactTimestamp - b.lastContactTimestamp;
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

  const toggleContact = (id: string) => setSelectedContacts(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const toggleAll = () => setSelectedContacts(prev => prev.length === paginated.length ? [] : paginated.map(c => c.id));

  const exportToCSV = () => {
    const headers = ["Name", "Account", "Balance", "Status", "Phone", "Last Contact"];
    const rows = filteredAndSorted.map(c => [c.name, c.account, `$${c.balance}`, c.statusLabel, c.phone, c.lastContact]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kleva-audience-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast("success", `Exported ${filteredAndSorted.length} contacts to CSV`);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All Contacts" },
    { key: "active", label: "Active" },
    { key: "promises", label: "Promises" },
    { key: "inactive", label: "No Contact" },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Audience</h1>
      </div>

      <div className="flex items-center gap-6 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setCurrentPage(1); }}
            className={`text-sm font-medium pb-2 transition-colors ${activeTab === t.key ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >{t.label}</button>
        ))}
      </div>

      {/* Bulk Actions Bar */}
      {selectedContacts.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between animate-fade-in">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
            {selectedContacts.length} contact{selectedContacts.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast("info", `Adding ${selectedContacts.length} contacts to campaign`)} className="px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center gap-2">
              <Send className="w-4 h-4" /> Add to Campaign
            </button>
            <button onClick={() => showToast("error", `Removed ${selectedContacts.length} contacts`)} className="px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Remove
            </button>
            <button onClick={() => setSelectedContacts([])} className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name, account, or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all" />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">All Campaigns</button>
        <Tooltip content="Export to CSV">
          <button onClick={exportToCSV} className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </Tooltip>
        <button onClick={() => showToast("info", "Add contact form would open here")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th className="w-12 px-6 py-3">
                <input type="checkbox" checked={selectedContacts.length === paginated.length && paginated.length > 0} onChange={toggleAll} className="rounded border-gray-300 dark:border-gray-600" />
              </th>
              <th onClick={() => handleSort("name")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Contact {sortField === "name" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Account</th>
              <th onClick={() => handleSort("status")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Status {sortField === "status" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("balance")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Balance {sortField === "balance" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Phone</th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Interactions</th>
              <th onClick={() => handleSort("lastContact")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Last Contact {sortField === "lastContact" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Users className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No contacts found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{searchQuery ? "Try adjusting your search" : "Add contacts to get started"}</p>
                  </div>
                </td>
              </tr>
            ) : paginated.map(contact => (
              <tr key={contact.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedContacts.includes(contact.id)} onChange={() => toggleContact(contact.id)} className="rounded border-gray-300 dark:border-gray-600" />
                </td>
                <td className="px-6 py-4">
                  <Link href={`/audience/${contact.id}`} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{contact.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">{contact.name}</span>
                  </Link>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-600 dark:text-gray-400">{contact.account}</span></td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded transition-colors ${
                    contact.status === "promise" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    contact.status === "active" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    contact.status === "paid" ? "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400" :
                    "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  }`}>{contact.statusLabel}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-medium ${contact.balance === 0 ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}>${contact.balance.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-600 dark:text-gray-400">{contact.phone}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{contact.totalCalls} calls</span><span>•</span><span>{contact.totalMessages} msgs</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right"><span className="text-sm text-gray-500 dark:text-gray-400">{contact.lastContact}</span></td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
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
