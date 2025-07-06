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
    <div ref={panelRef} className="bg-white shadow-lg rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-gray-100">
      <div className="space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
        {/* Language Section */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-full" style={{ backgroundColor: '#1a1a2e' }}>
              <FiGlobe className="text-white w-3 h-3" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Language:</span>
          </div>
          <div className="flex space-x-1">
            {languages.slice(0, 2).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageClick(lang.code)}
                className={`lang-${lang.code} px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  language === lang.code
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
            <div className="relative md:contents">
              <button className="md:hidden px-2.5 py-1.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200" onClick={() => document.getElementById('lang-dropdown')?.classList.toggle('hidden')}>
                +
              </button>
              <div id="lang-dropdown" className="hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[80px] md:relative md:flex md:space-x-1 md:bg-transparent md:border-0 md:shadow-none">
                {languages.slice(2).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {handleLanguageClick(lang.code); document.getElementById('lang-dropdown')?.classList.add('hidden');}}
                    className={`lang-${lang.code} block w-full text-center px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all md:inline-block md:w-auto ${
                      language === lang.code
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Format Section */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-full" style={{ backgroundColor: '#ffd60a' }}>
              <FiLayout className="text-white w-3 h-3" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Format:</span>
          </div>
          <div className="flex space-x-1">
            {formats.map((fmt) => (
              <button
                key={fmt.value}
                onClick={() => handleFormatClick(fmt.value)}
                className={`format-${fmt.value} px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all text-white ${
                  format === fmt.value
                    ? 'ring-2 ring-white ring-offset-1'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={fmt.style}
              >
                {fmt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadClick}
          className="download-btn text-white px-3 py-1.5 rounded-md font-medium transition-all flex items-center justify-center space-x-1.5 text-sm w-full sm:w-auto"
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