import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-50 flex flex-col min-h-[calc(100vh-140px)]">
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0zaDR2NGgtNHYtNHptLTYtbDJ2NGgtNHYtNGg0bDIgMnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
           <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-title font-black mb-6 tracking-tight leading-tight">
              Lost It? <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">FindIt.</span>
            </h1>
            <p className="text-lg lg:text-xl text-primary-50 mb-10 leading-relaxed font-sans max-w-2xl mx-auto">
              The smart, fast, and secure way to reunite with your lost belongings on campus. Report it, track it, claim it.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/lost" className="group relative px-8 py-4 bg-white text-primary-700 font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  I Lost Something
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gray-100 transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-100/50"></div>
              </Link>
              <Link to="/found" className="group relative px-8 py-4 bg-primary-800/80 border border-primary-400/30 text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl hover:bg-primary-800 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  I Found Something
                </span>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-primary-100 text-sm font-medium">
              <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-green-400">check_circle</span>
                 100% Free for Students
              </div>
              <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-green-400">check_circle</span>
                 Secure & Private
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">local_police</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-title">Campus Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                Only verified students and faculty can claim items, ensuring your belongings get back to the right hands safely.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-title">Real-Time Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant notifications when a potential match for your lost item is reported anywhere on campus.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">handshake</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-title">Easy Handoff</h3>
              <p className="text-gray-600 leading-relaxed">
                Coordinate securely with the finder to retrieve your item at a safe, designated campus location.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Join thousands of students who have already used FindIt@Campus to help keep our community honest and helpful.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Create an Account
            </Link>
            <Link to="/about" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
