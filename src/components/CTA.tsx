import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
export default function CTA() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });
      if (response.ok) {
        setStatus("success");
        console.log("Lead captured:", email, phone);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };
  return (
    <section id="waitlist" className="py-24 bg-white text-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif tracking-tight">
              A IA não vai esperar <br/>
              <span className="text-blue-600">você estar pronto.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-12">
              As vagas são limitadas. As primeiras turmas estão sendo formadas agora.
              <br/>
              Entre na lista de espera e seja o primeiro a saber.
            </p>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Você está na lista!</h3>
                  <p>Fique atento ao seu e-mail. Avisaremos assim que as inscrições abrirem.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 text-lg bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp (opcional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-6 py-4 text-lg bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      → Quero minha vaga
                    </>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-sm mt-2">Ocorreu um erro ao enviar. Tente novamente.</p>
                )}
                <p className="text-sm text-slate-500 mt-4">
                  Turmas fechadas — máximo 20 pessoas por nicho.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
