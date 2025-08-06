import React, { useState } from 'react';
import { ChevronDown, Sparkles, Globe } from 'lucide-react';
import DiagnosticModal from './DiagnosticModal';

const Hero: React.FC = () => {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  const scrollToPlans = () => {
    const element = document.getElementById('plans');
    if (element) {
      const headerOffset = 80; // ヘッダーの高さ分
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 sm:pb-20">
      {/* Coffee Bean Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('./image/top-coffee_beans.jpeg')`
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-midnight-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-0">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-2 mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 text-xs sm:text-sm font-medium">世界の0.1%の希少豆をお届け</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-midnight-50 mb-4 sm:mb-6 leading-tight">
            毎月、世界の頂点を
            <br />
            <span className="text-gold-500">体験する</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-midnight-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            希少な豆と、その物語をあなたに
            <br className="hidden sm:block" />
            <span className="text-gold-500">85点以上のコーヒーのみ</span>を厳選してお届け
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16 px-4 sm:px-0">
          <button
            onClick={() => setIsDiagnosticOpen(true)}
            className="group bg-gold-500 text-midnight-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gold-400 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center space-x-2 w-full sm:w-auto text-center justify-center"
          >
            <Globe className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-base">あなたに合うプランを診断</span>
          </button>
          
          <button
            onClick={scrollToPlans}
            className="group border-2 border-gold-500 text-gold-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gold-500 hover:text-midnight-900 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto text-center"
          >
            プランを見る
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto mb-16 sm:mb-20 px-4 sm:px-0">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold-500 mb-2">85+</div>
            <div className="text-midnight-100 text-sm sm:text-base">カッピングスコア</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold-500 mb-2">24時間</div>
            <div className="text-midnight-100 text-sm sm:text-base">焙煎後発送</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold-500 mb-2">0.1%</div>
            <div className="text-midnight-100 text-sm sm:text-base">希少豆のみ</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="bg-black/30 rounded-full p-2 backdrop-blur-sm">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500" />
        </div>
      </div>

      {/* Diagnostic Modal */}
      <DiagnosticModal 
        isOpen={isDiagnosticOpen} 
        onClose={() => setIsDiagnosticOpen(false)} 
      />
    </section>
  );
};

export default Hero;