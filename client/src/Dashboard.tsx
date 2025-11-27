import { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, FolderKanban, ArrowRight, LayoutDashboard } from "lucide-react";
import { AuthContext } from "./context/AuthContext";
import AvatarButton from "./components/Common/AvatarButton";

export default function Dashboard() {
  const auth = useContext(AuthContext);

  return (
    <div className="min-h-screen w-full bg-[#EAEEF2] font-sans text-slate-600 selection:bg-teal-100 selection:text-teal-900">
      
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
               <Layout size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">Freello</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-2 px-3 py-1 bg-teal-100/80 border border-teal-200 text-xs font-bold text-teal-700 shadow-sm rounded-full">
            <LayoutDashboard size={14} className="text-teal-600" />
            <span>Dashboard</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-700 leading-none">{auth?.user?.name || 'User'}</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mt-0.5">Premium</p>
          </div>

          <AvatarButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20 animate-fadeIn">
        
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">{auth?.user?.name}</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Your workspace is ready. Jump back into your projects and keep the momentum going!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 items-stretch bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
          
          <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                <FolderKanban size={14} />
                <span>Project Space</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Continue to Projects
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Stay organized. Stay productive. Stay ahead. Keep making progress!
              </p>
            </div>

            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 group/btn"
            >
              <span>Go to Projects Space</span>
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-slate-50 min-h-[250px] relative p-8 flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 overflow-hidden group-hover:bg-slate-50/80 transition-colors">

             <div className="absolute inset-0 bg-slate-50 opacity-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [bg-size:16px_16px]"></div>
             
             <div className="relative w-full max-w-[260px] aspect-4/3 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200 p-4 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">

                <div className="flex gap-3 mb-4 items-center border-b border-slate-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Layout size={16} className="text-teal-600 opacity-50"/>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-2/3 bg-slate-200 rounded-full"></div>
                    <div className="h-1.5 w-1/3 bg-slate-100 rounded-full"></div>
                  </div>
                </div>
                {/* Mock Columns */}
                <div className="grid grid-cols-3 gap-2 h-20">
                   <div className="bg-slate-50 rounded border border-slate-100/50 p-1 space-y-1">
                      <div className="h-1.5 w-8 bg-slate-200 rounded-full mb-2"></div>
                      <div className="h-8 bg-white rounded shadow-sm border border-slate-100"></div>
                   </div>
                   <div className="bg-slate-50 rounded border border-slate-100/50 p-1 space-y-1">
                      <div className="h-1.5 w-10 bg-slate-200 rounded-full mb-2"></div>
                      <div className="h-8 bg-white rounded shadow-sm border border-slate-100"></div>
                      <div className="h-6 bg-white rounded shadow-sm border border-slate-100 opacity-50"></div>
                   </div>
                   <div className="bg-slate-50 rounded border border-slate-100/50 p-1 space-y-1">
                      <div className="h-1.5 w-6 bg-slate-200 rounded-full mb-2"></div>
                   </div>
                </div>
             </div>

             {/* Background Glow */}
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>

      </main>
    </div>
  );
}