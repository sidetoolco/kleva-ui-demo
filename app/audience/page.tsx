"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Plus, Users, Trash2, Send } from "lucide-react";
import Link from "next/link";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { useToast } from "@/components/Toast";

type Tab = "all" | "active" | "promises" | "inactive";

interface Contact {
  id: string;
  name: string;
  account: string;
  balance: number;
  status: "active" | "promise" | "inactive" | "paid";
  statusLabel: string;
  phone: string;
  lastContact: string;
  totalCalls: number;
  totalMessages: number;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Juan Martinez",
    account: "VISA-1234",
    balance: 1250,
    status: "promise",
    statusLabel: "Promise",
    phone: "+52 55 1234 5678",
    lastContact: "2 hours ago",
    totalCalls: 5,
    totalMessages: 3
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    account: "LOAN-5678",
    balance: 3800,
    status: "active",
    statusLabel: "Active",
    phone: "+52 55 2345 6789",
    lastContact: "3 hours ago",
    totalCalls: 8,
    totalMessages: 5
  },
  {
    id: "3",
    name: "Pedro Silva",
    account: "AUTO-9012",
    balance: 890,
    status: "promise",
    statusLabel: "Promise",
    phone: "+51 1 3456 7890",
    lastContact: "5 hours ago",
    totalCalls: 3,
    totalMessages: 2
  },
  {
    id: "4",
    name: "Carmen Lopez",
    account: "VISA-3456",
    balance: 2100,
    status: "active",
    statusLabel: "Active",
    phone: "+52 55 4567 8901",
    lastContact: "1 day ago",
    totalCalls: 4,
    totalMessages: 2
  },
  {
    id: "5",
    name: "Roberto Diaz",
    account: "LOAN-7890",
    balance: 5600,
    status: "inactive",
    statusLabel: "No Contact",
    phone: "+57 1 5678 9012",
    lastContact: "3 days ago",
    totalCalls: 2,
    totalMessages: 1
  },
  {
    id: "6",
    name: "Ana Torres",
    account: "AUTO-2345",
    balance: 1450,
    status: "promise",
    statusLabel: "Promise",
    phone: "+502 2345 6789",
    lastContact: "1 day ago",
    totalCalls: 6,
    totalMessages: 4
  },
  {
    id: "7",
    name: "Carlos Ramirez",
    account: "VISA-6789",
    balance: 0,
    status: "paid",
    statusLabel: "Paid",
    phone: "+52 55 6789 0123",
    lastContact: "1 week ago",
    totalCalls: 4,
    totalMessages: 2
  },
  {
    id: "8",
    name: "Sofia Mendez",
    account: "LOAN-3456",
    balance: 4200,
    status: "inactive",
    statusLabel: "No Contact",
    phone: "+52 55 7890 1234",
    lastContact: "5 days ago",
    totalCalls: 1,
    totalMessages: 1
  },
  {
    id: "9",
    name: "Miguel Angel",
    account: "AUTO-7890",
    balance: 3200,
    status: "active",
    statusLabel: "Active",
    phone: "+57 1 8901 2345",
    lastContact: "2 days ago",
    totalCalls: 7,
    totalMessages: 6
  },
  {
    id: "10",
    name: "Patricia Ruiz",
    account: "VISA-4567",
    balance: 750,
    status: "promise",
    statusLabel: "Promise",
    phone: "+52 55 9012 3456",
    lastContact: "1 day ago",
    totalCalls: 5,
    totalMessages: 3
  }
];

export default function AudiencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const { showToast } = useToast();

  const filteredContacts = contacts.filter((contact) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return contact.status === "active";
    if (activeTab === "promises") return contact.status === "promise";
    if (activeTab === "inactive") return contact.status === "inactive";
    return true;
  });

  const toggleContact = (id: string) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedContacts(prev =>
      prev.length === filteredContacts.length ? [] : filteredContacts.map(c => c.id)
    );
  };

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Audience</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "all"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Contacts
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "active"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("promises")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "promises"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Promises
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "inactive"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          No Contact
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedContacts.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">
            {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 flex items-center gap-2">
              <Send className="w-4 h-4" />
              Add to Campaign
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-red-700 bg-white border border-red-200 rounded-lg hover:bg-red-50 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
            <button 
              onClick={() => setSelectedContacts([])}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, account, or phone..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          All Campaigns
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  onChange={toggleAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Contact
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Account
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Balance
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Phone
              </th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-500">
                Interactions
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Last Contact
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleContact(contact.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4 cursor-pointer">
                  <Link href={`/audience/${contact.id}`} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 hover:text-gray-700">
                      {contact.name}
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{contact.account}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      contact.status === "promise"
                        ? "bg-green-50 text-green-700"
                        : contact.status === "active"
                        ? "bg-blue-50 text-blue-700"
                        : contact.status === "paid"
                        ? "bg-gray-50 text-gray-600"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {contact.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-medium ${
                    contact.balance === 0 ? "text-gray-400" : "text-gray-900"
                  }`}>
                    ${contact.balance.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{contact.phone}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                    <span>{contact.totalCalls} calls</span>
                    <span>•</span>
                    <span>{contact.totalMessages} msgs</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500">{contact.lastContact}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => showToast("info", "Add contact form would open here")}
        icon={<Plus className="w-6 h-6" />}
        label="Add Contact"
      />
    </div>
  );
}
