"use client";

import { useState, useMemo } from "react";
import { Search, Download, Code2, MoreHorizontal, MessageSquare, ArrowUpDown, User, Clock, CheckCircle, Send } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { Tooltip } from "@/components/Tooltip";
import { useToast } from "@/components/Toast";
import { SlideOver } from "@/components/SlideOver";

type Tab = "all" | "whatsapp" | "sms" | "delivered";
type SortField = "to" | "platform" | "status" | "sent";
type SortDirection = "asc" | "desc";

interface Message {
  to: string;
  platform: "whatsapp" | "sms";
  status: "delivered" | "read" | "failed" | "sent";
  statusLabel: string;
  content: string;
  sent: string;
  sentTimestamp: number;
}

const messages: Message[] = [
  { to: "Juan Martinez", platform: "whatsapp", status: "read", statusLabel: "Read", content: "Hola Juan, recordatorio de su pago pendiente de $1,250 en VISA-1234...", sent: "about 1 hour ago", sentTimestamp: Date.now() - 1 * 60 * 60 * 1000 },
  { to: "Maria Gonzalez", platform: "sms", status: "delivered", statusLabel: "Delivered", content: "Hola Maria, su préstamo LOAN-5678 tiene un pago vencido. Responda para opciones...", sent: "about 2 hours ago", sentTimestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { to: "Pedro Silva", platform: "whatsapp", status: "read", statusLabel: "Read", content: "Buenos días Pedro, confirmamos su plan de pago de $890 para AUTO-9012...", sent: "about 2 hours ago", sentTimestamp: Date.now() - 2.5 * 60 * 60 * 1000 },
  { to: "Carmen Lopez", platform: "whatsapp", status: "delivered", statusLabel: "Delivered", content: "Hola Carmen, gracias por su compromiso de pago. Link de pago: https://...", sent: "about 3 hours ago", sentTimestamp: Date.now() - 3 * 60 * 60 * 1000 },
  { to: "Roberto Diaz", platform: "sms", status: "sent", statusLabel: "Sent", content: "Estimado Roberto, intentamos contactarlo sobre LOAN-7890. Por favor llame...", sent: "about 4 hours ago", sentTimestamp: Date.now() - 4 * 60 * 60 * 1000 },
  { to: "Ana Torres", platform: "whatsapp", status: "read", statusLabel: "Read", content: "Hola Ana, confirmamos pago para mañana de AUTO-2345. Muchas gracias...", sent: "about 5 hours ago", sentTimestamp: Date.now() - 5 * 60 * 60 * 1000 },
  { to: "Carlos Ramirez", platform: "sms", status: "delivered", statusLabel: "Delivered", content: "Hola Carlos, recordatorio de pago comprometido de $2,100 en VISA-6789...", sent: "1 day ago", sentTimestamp: Date.now() - 24 * 60 * 60 * 1000 },
  { to: "Sofia Mendez", platform: "whatsapp", status: "failed", statusLabel: "Failed", content: "Hola Sofia, necesitamos actualizar información de LOAN-3456...", sent: "1 day ago", sentTimestamp: Date.now() - 26 * 60 * 60 * 1000 },
  { to: "Miguel Angel", platform: "sms", status: "delivered", statusLabel: "Delivered", content: "Estimado Miguel, recibimos su solicitud de apoyo. Nuestro equipo contactará...", sent: "2 days ago", sentTimestamp: Date.now() - 48 * 60 * 60 * 1000 },
  { to: "Patricia Ruiz", platform: "whatsapp", status: "read", statusLabel: "Read", content: "Hola Patricia, confirmamos su compromiso de pago de $750 en VISA-4567...", sent: "2 days ago", sentTimestamp: Date.now() - 50 * 60 * 60 * 1000 },
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("sent");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const itemsPerPage = 5;
  const { showToast } = useToast();

  const filteredAndSorted = useMemo(() => {
    let filtered = messages;
    if (activeTab === "whatsapp") filtered = filtered.filter(m => m.platform === "whatsapp");
    if (activeTab === "sms") filtered = filtered.filter(m => m.platform === "sms");
    if (activeTab === "delivered") filtered = filtered.filter(m => m.status === "delivered" || m.status === "read");
    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === "to") cmp = a.to.localeCompare(b.to);
      else if (sortField === "platform") cmp = a.platform.localeCompare(b.platform);
      else if (sortField === "status") cmp = a.statusLabel.localeCompare(b.statusLabel);
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
    const headers = ["To", "Platform", "Status", "Content", "Sent"];
    const rows = filteredAndSorted.map(m => [m.to, m.platform, m.statusLabel, m.content, m.sent]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kleva-messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast("success", `Exported ${filteredAndSorted.length} messages to CSV`);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "sms", label: "SMS" },
    { key: "delivered", label: "Delivered" },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Messages</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setCurrentPage(1); }}
            className={`text-sm font-medium pb-2 transition-colors ${activeTab === t.key ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >{t.label}</button>
        ))}
      </div>

      {/* Search Bar */}
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

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th onClick={() => handleSort("to")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">To {sortField === "to" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("platform")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Platform {sortField === "platform" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("status")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Status {sortField === "status" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Message</th>
              <th onClick={() => handleSort("sent")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Sent {sortField === "sent" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No messages found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{searchQuery ? "Try adjusting your search" : "Messages will appear here once sent"}</p>
                  </div>
                </td>
              </tr>
            ) : paginated.map((msg, i) => (
              <tr key={i} onClick={() => setSelectedMessage(msg)} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.platform === "whatsapp" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}>
                      <MessageSquare className={`w-4 h-4 ${msg.platform === "whatsapp" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{msg.to}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{msg.platform === "whatsapp" ? "WhatsApp" : "SMS"}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded transition-colors ${
                    msg.status === "read" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    msg.status === "delivered" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    msg.status === "sent" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" :
                    "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}>{msg.statusLabel}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{msg.content}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{msg.sent}</span>
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

      {/* Message Detail Slide-Over */}
      <SlideOver isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="Message Details">
        {selectedMessage && (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedMessage.platform === "whatsapp" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}>
                <MessageSquare className={`w-7 h-7 ${selectedMessage.platform === "whatsapp" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedMessage.to}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMessage.platform === "whatsapp" ? "WhatsApp" : "SMS"} • {selectedMessage.sent}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedMessage.status === "read" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                selectedMessage.status === "delivered" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                selectedMessage.status === "sent" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" :
                "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
              }`}>{selectedMessage.statusLabel}</span>
            </div>

            {/* Message Content */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Message Content</p>
              <div className={`rounded-lg p-4 ${selectedMessage.platform === "whatsapp" ? "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800" : "bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800"}`}>
                <p className="text-sm text-gray-800 dark:text-gray-200">{selectedMessage.content}</p>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Delivery Timeline</p>
              <div className="space-y-3">
                {[
                  { label: "Sent", time: selectedMessage.sent, done: true },
                  { label: "Delivered", time: selectedMessage.status !== "sent" ? "2 seconds later" : null, done: selectedMessage.status !== "sent" && selectedMessage.status !== "failed" },
                  { label: "Read", time: selectedMessage.status === "read" ? "5 minutes later" : null, done: selectedMessage.status === "read" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-700"}`}>
                      {step.done ? <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" /> : <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${step.done ? "text-gray-900 dark:text-white font-medium" : "text-gray-400 dark:text-gray-500"}`}>{step.label}</p>
                    </div>
                    {step.time && <span className="text-xs text-gray-500 dark:text-gray-400">{step.time}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Campaign</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Vana Peru B0-30</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Template</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Reminder v2</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => { showToast("info", "Resending message..."); setSelectedMessage(null); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Resend
              </button>
              <button onClick={() => { showToast("success", "Viewing contact profile"); setSelectedMessage(null); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> View Contact
              </button>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
