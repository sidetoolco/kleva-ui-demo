"use client";

import { use } from "react";
import { ArrowLeft, Phone, MessageSquare, Mail, Clock } from "lucide-react";
import Link from "next/link";

interface ContactDetails {
  id: string;
  name: string;
  account: string;
  balance: number;
  status: string;
  phone: string;
  email: string;
  address: string;
  created: string;
}

interface TimelineEvent {
  type: "call" | "message" | "payment" | "note";
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

const contactsData: Record<string, ContactDetails> = {
  "1": { id: "1", name: "Juan Martinez", account: "VISA-1234", balance: 1250, status: "Promise", phone: "+52 55 1234 5678", email: "juan.martinez@email.com", address: "Polanco, Mexico City, Mexico", created: "Jan 15, 2026" },
};

const timelineData: Record<string, TimelineEvent[]> = {
  "1": [
    { type: "call", title: "Outbound Call", description: "Payment commitment secured for $1,250. Customer agreed to pay by Friday.", timestamp: "2 hours ago", status: "Promise" },
    { type: "message", title: "WhatsApp Message Sent", description: "Hola Juan, recordatorio de su pago pendiente de $1,250 en VISA-1234...", timestamp: "1 day ago", status: "Read" },
    { type: "call", title: "Outbound Call", description: "No answer. Voicemail left.", timestamp: "2 days ago", status: "No Answer" },
    { type: "message", title: "SMS Sent", description: "Recordatorio de pago vencido. Por favor contactar.", timestamp: "3 days ago", status: "Delivered" },
    { type: "note", title: "Note Added", description: "Customer requested payment plan. Follow up scheduled.", timestamp: "4 days ago" },
    { type: "call", title: "Outbound Call", description: "Discussed account status. Customer requested more time.", timestamp: "5 days ago", status: "Answered" },
    { type: "payment", title: "Payment Missed", description: "Expected payment of $1,250 was not received.", timestamp: "1 week ago" },
    { type: "message", title: "WhatsApp Message Sent", description: "Confirmación de fecha de pago: Viernes 14 de Febrero.", timestamp: "2 weeks ago", status: "Read" },
  ],
};

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const contact = contactsData[id] || contactsData["1"];
  const timeline = timelineData[id] || timelineData["1"];

  return (
    <div className="p-8 max-w-5xl">
      <Link href="/audience" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Audience
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-2xl font-medium text-purple-600 dark:text-purple-400">{contact.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{contact.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{contact.account}</p>
            </div>
          </div>
          <span className="inline-flex px-3 py-1 text-sm font-medium rounded bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">{contact.status}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Balance</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${contact.balance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
            <p className="text-sm text-gray-900 dark:text-gray-200">{contact.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
            <p className="text-sm text-gray-900 dark:text-gray-200">{contact.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created</p>
            <p className="text-sm text-gray-900 dark:text-gray-200">{contact.created}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Address</p>
          <p className="text-sm text-gray-900 dark:text-gray-200">{contact.address}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Activity Timeline</h2>
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                event.type === "call" ? "bg-blue-100 dark:bg-blue-900/30" :
                event.type === "message" ? "bg-green-100 dark:bg-green-900/30" :
                event.type === "payment" ? "bg-red-100 dark:bg-red-900/30" :
                "bg-gray-100 dark:bg-gray-700"
              }`}>
                {event.type === "call" && <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                {event.type === "message" && <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />}
                {event.type === "payment" && <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />}
                {event.type === "note" && <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
              </div>
              <div className="flex-1 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h3>
                    {event.status && (
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded mt-1 ${
                        event.status === "Promise" || event.status === "Read" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                        event.status === "Delivered" || event.status === "Answered" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                        "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}>{event.status}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{event.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
