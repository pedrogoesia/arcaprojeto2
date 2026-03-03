import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, X, Check } from "lucide-react";
export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        // Optional: Close modal after success or keep it open to show success message
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Background Waves Animation */}
      <div className="absolute inset-0 z-0 opacity-30">
        <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            fill="#1e3a8a"
            fillOpacity="0.5"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320L0,320Z",
                "M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320L0,320Z",
                "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320L0,320Z",
              ],
            }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
          <motion.path
            fill="#172554"
            fillOpacity="0.8"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320L0,320Z"
            animate={{
              d: [
                "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320L0,320Z",
                "M0,256L48,245.3C96,235,192,213,288,202.7C384,192,480,192,576,202.7C672,213,768,235,864,240C960,245,1056,235,1152,218.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320L0,320Z",
                "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320L0,320Z",
              ],
            }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32 text-center">

        <motion.div
          className="mb-12 mx-auto w-full max-w-4xl relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg font-serif italic mb-6">
            Para quem quer empreender com IA <br/>
            <span className="text-blue-200 not-italic">mas não sabe por onde começar.</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto mb-12">
            A <span className="font-bold text-white">Arca</span> é o único programa no Brasil que combina capacitação real, comunidade fechada e investimento direto no seu projeto.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg shadow-blue-900/50 hover:shadow-blue-500/30 hover:-translate-y-1 cursor-pointer"
            >
              <span>→ Entrar na lista de espera</span>
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
            </button>
            <span className="text-sm text-blue-300 font-mono tracking-wide uppercase">
              (Turmas fechadas — máximo 20 vagas por nicho)
            </span>
          </div>
        </motion.div>
      </div>
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Você está na lista!</h3>
                  <p className="text-slate-600">
                    Fique atento ao seu e-mail. Avisaremos assim que as inscrições abrirem.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Garanta sua vaga</h3>
                    <p className="text-slate-600">
                      Preencha seus dados para entrar na lista de espera exclusiva da Arca.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">WhatsApp <span className="text-slate-400 font-normal">(opcional)</span></label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Entrar na Lista de Espera"
                      )}
                    </button>

                    {status === "error" && (
                      <p className="text-red-500 text-sm text-center mt-2">
                        Ocorreu um erro. Tente novamente.
                      </p>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
