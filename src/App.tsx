import Header from './components/Header';
import Hero from './components/Hero';
import Commitment from './components/Commitment';
import MonthlyCoffee from './components/MonthlyCoffee';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-midnight-900 text-midnight-50">
      <Header />
      <Hero />
      <Commitment />
      <MonthlyCoffee />
      <Plans />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;