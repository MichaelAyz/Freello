import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Layout, ArrowRight, CheckSquare, Clock } from "lucide-react";
import { AuthContext } from "./context/AuthContext";
import { signup } from "../services/projectapi"; 
import type { AxiosError } from "../services/projectapi";

export default function Signup() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
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
    setError("");
    setLoading(true);

    console.log("🚀 Attempting signup:", { name, email, password: "***hidden***" });

    try {
      const res = await signup({ name, email, password });  
      console.log("✅ Signup successful:", res.data);
      
      auth.login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("❌ Signup error:", error.response?.data);
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFC] relative overflow-hidden flex items-center justify-center font-sans text-slate-600">
      
  
      <div 
        className="absolute top-[10%] left-[5%] lg:left-[15%] opacity-40 lg:opacity-100 transition-transform duration-700 ease-out hidden md:block"
        style={{ transform: `translate(-${mousePos.x}px, -${mousePos.y}px) rotate(-6deg)` }}
      >
        <div className="w-48 h-32 bg-white rounded-lg shadow-xl border-l-4 border-teal-500 p-4 space-y-2 pointer-events-none select-none">
          <div className="h-2 w-16 bg-teal-100 rounded"></div>
          <div className="h-2 w-32 bg-slate-200 rounded"></div>
          <div className="h-2 w-24 bg-slate-200 rounded"></div>
          <div className="flex justify-end mt-4">
             <div className="h-6 w-6 rounded-full bg-blue-100"></div>
          </div>
        </div>
      </div>

      {/* Bottom Right Floating Task List */}
      <div 
        className="absolute bottom-[10%] right-[5%] lg:right-[15%] opacity-40 lg:opacity-100 transition-transform duration-700 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotate(3deg)` }}
      >
        <div className="w-40 bg-white rounded-lg shadow-xl p-3 space-y-3 border border-slate-100 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-blue-500" />
            <div className="h-2 w-20 bg-slate-200 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-blue-500" />
            <div className="h-2 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="w-full max-w-[400px] z-10 px-4">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-blue-600">
            <Layout size={32} strokeWidth={2.5} />
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Freello</h1>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] border-b-2 border-slate-200">
          <div className="px-8 pt-8 pb-4 text-center">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
              Create a Freello Account
            </h2>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200 text-sm font-medium"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200 text-sm font-medium"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200 text-sm font-medium"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-xs font-medium animate-pulse">
                  {error}
                </div>
              )}

              {/* Submit Button (Used Teal to distinguish Signup) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded font-bold shadow-sm shadow-teal-600/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                   <Clock className="animate-spin" size={18} />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
              <span className="mr-1">Already have an account?</span>
              <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
           <p className="text-xs text-slate-400">
             By signing up, you agree to Freello's Terms of Service.
           </p>
        </div>
      </div>
      
      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-teal-400 to-emerald-400"></div>
    </div>
  );
}