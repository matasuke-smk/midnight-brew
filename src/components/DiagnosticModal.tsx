import React, { useState } from 'react';
import { X, Coffee, CheckCircle } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DiagnosticAnswers {
  taste: string;
  scene: string;
  frequency: string;
}

interface Recommendation {
  plan: string;
  planName: string;
  price: string;
  originalPrice: string;
  bean: string;
  description: string;
}

const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({
    taste: '',
    scene: '',
    frequency: ''
  });
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const questions = [
    {
      id: 'taste',
      question: 'あなたにとって理想的なコーヒーの味わいは？',
      options: [
        { value: 'fruity', label: 'フルーティーで華やか', icon: '🍇' },
        { value: 'chocolate', label: 'チョコレートやナッツのような甘み', icon: '🍫' },
        { value: 'deep', label: '深いコクと苦味', icon: '☕' }
      ]
    },
    {
      id: 'scene',
      question: 'コーヒーを最も楽しむシーンは？',
      options: [
        { value: 'morning', label: '朝の目覚めの一杯', icon: '🌅' },
        { value: 'afternoon', label: '午後のリラックスタイム', icon: '🛋️' },
        { value: 'dessert', label: '食後やデザートと一緒に', icon: '🍰' }
      ]
    },
    {
      id: 'frequency',
      question: '月にどのくらいコーヒーを飲みますか？',
      options: [
        { value: 'daily2plus', label: '毎日2杯以上', icon: '☕☕' },
        { value: 'daily1', label: '毎日1杯程度', icon: '☕' },
        { value: 'weekly3-4', label: '週に3-4回', icon: '📅' }
      ]
    }
  ];

  const getRecommendation = (answers: DiagnosticAnswers): Recommendation => {
    let plan = 'discovery';
    let planName = 'Discovery';
    let price = '¥2,400';
    let originalPrice = '¥4,800';
    
    if (answers.frequency === 'daily2plus') {
      plan = 'connoisseur';
      planName = 'Connoisseur';
      price = '¥6,400';
      originalPrice = '¥12,800';
    } else if (answers.frequency === 'daily1') {
      plan = 'enthusiast';
      planName = 'Enthusiast';
      price = '¥4,400';
      originalPrice = '¥8,800';
    }
    
    let bean = 'エチオピア イルガチェフェ';
    let description = '花のような香りとベリー系の酸味が特徴的な、華やかで上品な味わい';
    
    if (answers.taste === 'chocolate') {
      bean = 'コロンビア ウィラ';
      description = 'チョコレートとナッツの甘みが調和した、バランスの良い味わい';
    } else if (answers.taste === 'deep') {
      bean = 'インドネシア マンデリン';
      description = '深いコクと豊かな苦味、アーシーな風味が楽しめる力強い味わい';
    }
    
    return { plan, planName, price, originalPrice, bean, description };
  };

  const handleAnswer = (questionId: keyof DiagnosticAnswers, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const result = getRecommendation(newAnswers);
      setRecommendation(result);
      setCurrentStep(currentStep + 1);
    }
  };

  const resetDiagnostic = () => {
    setCurrentStep(0);
    setAnswers({ taste: '', scene: '', frequency: '' });
    setRecommendation(null);
  };

  const handleClose = () => {
    resetDiagnostic();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-midnight-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Coffee className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-serif font-bold text-midnight-50">
              あなたにぴったりのプランを診断
            </h2>
          </div>
          <button onClick={handleClose} className="text-midnight-100 hover:text-gold-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          {currentStep < questions.length && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-midnight-100 mb-2">
                <span>進行状況</span>
                <span>{currentStep + 1} / {questions.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Questions */}
          {currentStep < questions.length && (
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-midnight-50 mb-6 text-center">
                {questions[currentStep].question}
              </h3>
              
              <div className="space-y-4">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[currentStep].id as keyof DiagnosticAnswers, option.value)}
                    className="w-full text-left p-4 rounded-lg border border-gray-600 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-lg text-midnight-50 group-hover:text-gold-500">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {recommendation && currentStep >= questions.length && (
            <div className="text-center space-y-6">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-3xl font-serif font-bold text-midnight-50 mb-2">
                  診断完了！
                </h3>
                <p className="text-midnight-100">
                  あなたにおすすめのプランをご提案します
                </p>
              </div>

              <div className="bg-midnight-900 rounded-xl p-6 border border-gold-500/20">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-serif font-bold text-gold-500 mb-2">
                    {recommendation.planName} プラン
                  </h4>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-midnight-50">
                      {recommendation.price}
                    </span>
                    <span className="text-lg text-midnight-100 line-through">
                      {recommendation.originalPrice}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      初回50%OFF
                    </span>
                  </div>
                </div>

                <div className="text-left space-y-4">
                  <div>
                    <h5 className="text-lg font-semibold text-midnight-50 mb-2">
                      今月のおすすめコーヒー
                    </h5>
                    <div className="bg-midnight-800 rounded-lg p-4">
                      <h6 className="font-semibold text-gold-500 mb-2">
                        {recommendation.bean}
                      </h6>
                      <p className="text-midnight-100 text-sm">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    handleClose();
                    setTimeout(() => {
                      const element = document.getElementById('plans');
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }, 100);
                  }}
                  className="flex-1 bg-gold-500 text-midnight-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors duration-200"
                >
                  このプランで申し込む
                </button>
                <button
                  onClick={resetDiagnostic}
                  className="flex-1 border border-gray-600 text-midnight-50 px-6 py-3 rounded-lg font-semibold hover:border-gold-500 hover:text-gold-500 transition-colors duration-200"
                >
                  もう一度診断する
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticModal;