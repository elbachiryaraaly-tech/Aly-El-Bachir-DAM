"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Users, Utensils } from "lucide-react";

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, attending: 0, meat: 0, fish: 0, vegan: 0 });

  useEffect(() => {
    // In a real app, this would be a server action or API call
    // simulating fetch from "database" (localStorage)
    const data = JSON.parse(localStorage.getItem("rsvp_registrations") || "[]");
    setRegistrations(data);

    const newStats = data.reduce((acc: any, curr: any) => {
      acc.total++;
      if (curr.attending === "yes") {
        acc.attending++;
        if (curr.plusOneName) acc.attending++; // Count plus one
        
        if (curr.mealPreference === "meat") acc.meat++;
        if (curr.mealPreference === "fish") acc.fish++;
        if (curr.mealPreference === "vegan") acc.vegan++;
      }
      return acc;
    }, { total: 0, attending: 0, meat: 0, fish: 0, vegan: 0 });
    
    setStats(newStats);
  }, []);

  return (
    <div className="min-h-screen bg-off-white text-eucalyptus-900 font-sans">
      <header className="bg-eucalyptus-900 text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-eucalyptus-800 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl md:text-2xl font-serif">Panel de Administración</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-eucalyptus-700 hover:bg-eucalyptus-600 rounded-lg text-sm transition-colors">
            <Download size={16} />
            <span className="hidden md:inline">Exportar CSV</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Registros" value={registrations.length} icon={<Users size={20} />} />
          <StatCard label="Asistentes Confirmados" value={stats.attending} icon={<Users size={20} />} highlight />
          <StatCard label="Menú Carne" value={stats.meat} icon={<Utensils size={20} />} />
          <StatCard label="Menú Pescado" value={stats.fish} icon={<Utensils size={20} />} />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-eucalyptus-100 overflow-hidden">
          <div className="p-6 border-b border-eucalyptus-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-eucalyptus-800">Listado de Invitados</h2>
            <span className="text-xs text-eucalyptus-500 bg-eucalyptus-50 px-3 py-1 rounded-full">
              {registrations.length} registros
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-eucalyptus-50 text-eucalyptus-700 font-medium">
                <tr>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Asistencia</th>
                  <th className="p-4">Acompañante</th>
                  <th className="p-4">Menú</th>
                  <th className="p-4">Niños</th>
                  <th className="p-4 max-w-xs">Notas/Alergias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eucalyptus-50">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-eucalyptus-400 italic">
                      No hay registros todavía.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg, idx) => (
                    <tr key={idx} className="hover:bg-eucalyptus-50/50 transition-colors">
                      <td className="p-4 font-medium text-eucalyptus-900">
                        {reg.firstName} {reg.lastName}
                      </td>
                      <td className="p-4 text-eucalyptus-600">{reg.email}</td>
                      <td className="p-4">
                        <StatusBadge status={reg.attending} />
                      </td>
                      <td className="p-4 text-eucalyptus-600">{reg.plusOneName || "-"}</td>
                      <td className="p-4 capitalize text-eucalyptus-700">{reg.mealPreference || "-"}</td>
                      <td className="p-4">
                        {reg.hasKids === "yes" ? (
                          <span className="text-eucalyptus-700" title={reg.kidsDetails}>Sí</span>
                        ) : (
                          <span className="text-gray-300">No</span>
                        )}
                      </td>
                      <td className="p-4 text-eucalyptus-600 truncate max-w-xs" title={reg.allergies}>
                        {reg.allergies || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, highlight }: any) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? 'bg-eucalyptus-800 text-white border-eucalyptus-800' : 'bg-white text-eucalyptus-900 border-eucalyptus-100'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-sm font-medium uppercase tracking-wider ${highlight ? 'text-eucalyptus-200' : 'text-eucalyptus-500'}`}>{label}</span>
        <div className={`p-2 rounded-lg ${highlight ? 'bg-eucalyptus-700' : 'bg-eucalyptus-50 text-eucalyptus-600'}`}>
            {icon}
        </div>
      </div>
      <div className="text-4xl font-serif">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "yes") {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Sí, asiste</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">No asiste</span>;
}
