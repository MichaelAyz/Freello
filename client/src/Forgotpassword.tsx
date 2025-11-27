import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Layout, ArrowLeft, Clock, Send, Lock } from "lucide-react";
import api from "../services/projectapi";
import type { AxiosError } from "../services/projectapi";

interface ForgotPasswordResponse {
  message: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 20, 
        y: (e.clientY / window.innerHeight) * 20 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setMessage(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFC] relative overflow-hidden flex items-center justify-center font-sans text-slate-600">

      <div 
        className="absolute top-[15%] right-[10%] opacity-40 lg:opacity-100 transition-transform duration-700 ease-out hidden md:block pointer-events-none"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotate(6deg)` }}
      >
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border-4 border-teal-50 flex items-center justify-center">
            <Lock size={40} className="text-teal-400" />
        </div>
      </div>

      <div 
        className="absolute bottom-[15%] left-[10%] opacity-40 lg:opacity-100 transition-transform duration-700 ease-out hidden md:block pointer-events-none"
        style={{ transform: `translate(-${mousePos.x}px, -${mousePos.y}px) rotate(-3deg)` }}
      >
        <div className="w-32 h-16 bg-white rounded-full shadow-lg border-l-4 border-blue-400"></div>
      </div>

      <div className="w-full max-w-[400px] z-10 px-4">
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-blue-600">
            <Layout size={32} strokeWidth={2.5} />
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Freello</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.05)] border-b-2 border-slate-200">
          <div className="px-8 pt-8 pb-4 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                <Mail size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-wide">
              Can't Log In?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200 text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {message && (
                <div className={`border-l-4 p-3 text-xs font-medium rounded-r animate-fadeIn ${
                    message.toLowerCase().includes("success") || message.toLowerCase().includes("sent") 
                    ? "bg-green-50 border-green-500 text-green-700" 
                    : "bg-red-50 border-red-500 text-red-700"
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold shadow-sm shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                    <>
                        <Clock className="animate-spin" size={18} />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <span>Send Reset Link</span>
                        <Send size={16} />
                    </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
              <Link to="/login" className="text-slate-500 hover:text-blue-600 hover:underline flex items-center gap-1 group transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-2">
           <p className="text-xs text-slate-400">
             Secure password recovery provided by Freello.
           </p>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-teal-400 to-emerald-400"></div>
    </div>
  );
};

export default ForgotPassword;