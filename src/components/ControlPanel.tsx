import { useEffect, useRef } from 'react';
import { FiDownload, FiGlobe, FiLayout } from 'react-icons/fi';
import gsap from 'gsap';

interface ControlPanelProps {
  language: string;
  format: 'canadian' | 'european';
  onLanguageChange: (lang: string) => void;
  onFormatChange: (format: 'canadian' | 'european') => void;
  onDownloadPDF: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  language,
  format,
  onLanguageChange,
  onFormatChange,
  onDownloadPDF
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'de', name: 'DE' },
    { code: 'ar', name: 'AR' },
    { code: 'it', name: 'IT' }
  ];

  const formats = [
    { value: 'canadian', name: 'CA', style: { backgroundColor: '#1a1a2e' } },
    { value: 'european', name: 'EU', style: { backgroundColor: '#16213e' } }
  ];

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, 
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const handleLanguageClick = (lang: string) => {
    onLanguageChange(lang);
    gsap.to(`.lang-${lang}`, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const handleFormatClick = (fmt: string) => {
    onFormatChange(fmt as 'canadian' | 'european');
    gsap.to(`.format-${fmt}`, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const handleDownloadClick = () => {
    gsap.to('.download-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    onDownloadPDF();
  };

  return (
    <div ref={panelRef} className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ backgroundColor: '#1a1a2e' }}>
              <FiGlobe className="text-white w-3 h-3" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Language:</span>
          </div>
          <div className="flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageClick(lang.code)}
                className={`lang-${lang.code} px-3 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                  language === lang.code
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ backgroundColor: '#ffd60a' }}>
              <FiLayout className="text-white w-3 h-3" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Format:</span>
          </div>
          <div className="flex space-x-2">
            {formats.map((fmt) => (
              <button
                key={fmt.value}
                onClick={() => handleFormatClick(fmt.value)}
                className={`format-${fmt.value} px-3 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm text-white ${
                  format === fmt.value
                    ? 'border-2 border-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={fmt.style}
              >
                {fmt.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownloadClick}
          className="download-btn text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg text-sm"
          style={{ backgroundColor: '#000814' }}
        >
          <FiDownload className="w-3 h-3" />
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;