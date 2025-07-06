import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import gsap from 'gsap';
import CVTemplate from './components/CVTemplate';
import ControlPanel from './components/ControlPanel';
import cvData from './data/cvData.json';
import './styles/App.css';

function App() {
  const [language, setLanguage] = useState('en');
  const [format, setFormat] = useState<'canadian' | 'european'>('european');
  const cvRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appRef.current) {
      gsap.fromTo(appRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (cvRef.current) {
      gsap.fromTo(cvRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [language, format]);

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: cvRef.current.scrollWidth,
        height: cvRef.current.scrollHeight,
        x: 0,
        y: 0
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
        compress: true
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, '', 'FAST');
      
      const fileName = `CV_${cvData.personal.name.replace(/\s+/g, '_')}_${language}_${format}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div 
      ref={appRef} 
      className="min-h-screen py-8"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="container mx-auto px-4">
        <ControlPanel
          language={language}
          format={format}
          onLanguageChange={setLanguage}
          onFormatChange={setFormat}
          onDownloadPDF={handleDownloadPDF}
        />

        <div ref={cvRef} className="max-w-4xl mx-auto">
          <CVTemplate
            data={cvData}
            language={language}
            format={format}
          />
        </div>
      </div>
    </div>
  );
}

export default App;