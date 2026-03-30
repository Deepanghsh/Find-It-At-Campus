import React from 'react';
import { ShieldCheck, MapPin, Users, Activity, Globe, MessageSquare, Mail } from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: 'Austen Gomes',
      role: '',
      initials: 'AG',
      color: 'from-blue-500 to-blue-700',
    },
    {
      name: 'Chirag Simepurushkar',
      role: '',
      initials: 'CS',
      color: 'from-purple-500 to-purple-700',
    },
    {
      name: 'Deepanghsh Naik',
      role: '',
      initials: 'DN',
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      name: 'Manjunath Gavada',
      role: '',
      initials: 'MG',
      color: 'from-amber-500 to-amber-700',
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary-950 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-6 lg:px-10 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-title font-bold mb-6 tracking-tight">Our Mission at <span className="text-primary-500">FindIt@Campus</span></h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            We built FindIt to modernize how campus communities recover misplaced items. Our intelligent platform bridges the gap between losing something valuable and finding it instantly.
          </p>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-10 max-w-6xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 font-title">Why we built this</h2>
             <p className="text-gray-500 mt-2">Solving a critical everyday campus problem through technology.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-md transition-shadow">
                 <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                   <ShieldCheck size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Identity</h3>
                 <p className="text-gray-600 leading-relaxed">We verify all claims through rigid university credentials, preventing fraud and ensuring items reach true owners.</p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-md transition-shadow">
                 <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                   <MapPin size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Centralized Database</h3>
                 <p className="text-gray-600 leading-relaxed">No more scattered bulletin boards. Every building, cafeteria, and library is connected into one single intelligence feed.</p>
              </div>

              <div className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-md transition-shadow">
                 <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                   <Activity size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
                 <p className="text-gray-600 leading-relaxed">Campuses can visualize trends, understand high-loss areas, and optimize security patrols through rich data.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-10 max-w-6xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 font-title mb-2 flex items-center justify-center gap-3">
               <Users className="text-primary-600" /> Meet The Team
             </h2>
             <p className="text-gray-500">The developers behind FindIt@Campus.</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {team.map((member, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group relative overflow-hidden">
                 <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.color}`}></div>
                 
                 <div className="w-24 h-24 mx-auto rounded-full bg-white p-1 mb-6 shadow-md relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-inner`}>
                      {member.initials}
                    </div>
                 </div>
                 
                 <h3 className={`text-xl font-bold text-gray-900 ${member.role ? 'mb-1' : 'mb-6'}`}>{member.name}</h3>
                 {member.role && (
                   <p className="text-sm font-semibold text-primary-600 mb-6 uppercase tracking-wider">{member.role}</p>
                 )}
                 
                 <div className="flex items-center justify-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-colors border border-gray-100">
                      <Globe size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-100">
                      <MessageSquare size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-100">
                      <Mail size={18} />
                    </button>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
