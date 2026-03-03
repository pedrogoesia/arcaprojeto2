import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Download, Loader2, Lock, RefreshCw } from "lucide-react";
interface Lead {
  id: number;
  email: string;
  phone: string | null;
  created_at: string;
}
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "arca2024") {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setError("Senha incorreta");
    }
  };
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/leads");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar leads");
    } finally {
      setLoading(false);
    }
  };
  const downloadCSV = () => {
    const headers = ["ID", "Email", "Telefone", "Data"];
    const csvContent = [
      headers.join(","),
      ...leads.map(lead =>
        [
          lead.id,
          lead.email,
          lead.phone || "",
          lead.created_at
        ].join(",")
      )
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_arca_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Lock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Área Administrativa</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">Arca Admin</h1>
          <div className="flex gap-3">
            <button
              onClick={fetchLeads}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Atualizar"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">WhatsApp</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">#{lead.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{lead.email}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {lead.phone ? (
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {format(new Date(lead.created_at), "dd/MM/yyyy HH:mm")}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      Nenhum lead encontrado ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
