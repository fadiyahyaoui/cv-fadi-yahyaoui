import { useEffect, useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiFacebook, FiAward, FiUsers } from 'react-icons/fi';
import gsap from 'gsap';

interface CVTemplateProps {
  data: any;
  language: string;
  format: 'canadian' | 'european';
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data, language, format }) => {
  const isRTL = language === 'ar';
  const templateRef = useRef<HTMLDivElement>(null);
  
  const getLocalizedText = (textObj: any) => {
    return textObj[language] || textObj.en || textObj;
  };

  const formatStyles = {
    canadian: {
      headerStyle: { backgroundColor: '#1a1a2e' },
      accentColor: '#1a1a2e',
      borderColor: '#1a1a2e',
      cardStyle: { backgroundColor: 'rgba(26, 26, 46, 0.05)' },
      skillStyle: { backgroundColor: '#16213e' }
    },
    european: {
      headerStyle: { backgroundColor: '#16213e' },
      accentColor: '#16213e',
      borderColor: '#1a1a2e',
      cardStyle: { backgroundColor: 'rgba(26, 26, 46, 0.05)' },
      skillStyle: { backgroundColor: '#1a1a2e' }
    }
  };

  const styles = formatStyles[format];

  useEffect(() => {
    if (templateRef.current) {
      const sections = templateRef.current.querySelectorAll('section');
      gsap.fromTo(sections, 
        { opacity: 0, x: isRTL ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [language, format, isRTL]);

  if (format === 'canadian') {
    return (
      <div ref={templateRef} className={`w-full bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="p-6">
          <div className="text-center mb-6 pb-4 border-b-2" style={{borderColor: styles.borderColor}}>
            <h1 className="text-3xl font-bold mb-2" style={{color: styles.accentColor}}>{data.personal.name}</h1>
            <h2 className="text-lg text-gray-600 mb-3">{getLocalizedText(data.personal.title)}</h2>
            <div className="flex justify-center space-x-4 text-sm">
              <span>{data.personal.email}</span>
              <span>{data.personal.phone}</span>
              <a href="https://maps.google.com/?q=Beni+Khiar+Nabeul+Tunisia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {getLocalizedText(data.personal.location)}
              </a>
            </div>
          </div>

          <section className="mb-5">
            <h3 className="text-lg font-bold mb-2" style={{color: styles.accentColor}}>OBJECTIVE</h3>
            <p className="text-gray-700 text-sm">{getLocalizedText(data.objective)}</p>
          </section>

          <section className="mb-5">
            <h3 className="text-lg font-bold mb-2" style={{color: styles.accentColor}}>WORK EXPERIENCE</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{getLocalizedText(exp.title)}</h4>
                    <p className="text-gray-600 text-sm">{exp.company}, {getLocalizedText(exp.location)}</p>
                  </div>
                  <span className="text-gray-600 text-xs">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 ml-3 text-sm">
                  {getLocalizedText(exp.achievements).slice(0, 4).map((achievement: string, i: number) => (
                    <li key={i} className="mb-1">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-5">
            <h3 className="text-lg font-bold mb-2" style={{color: styles.accentColor}}>CERTIFICATIONS</h3>
            {data.certifications.map((cert: any, index: number) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{cert.name}</h4>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-gray-600 text-sm">{cert.year}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-5">
            <h3 className="text-lg font-bold mb-2" style={{color: styles.accentColor}}>EDUCATION</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{getLocalizedText(edu.degree)}</h4>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-gray-600 text-sm">{edu.year}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-5">
            <h3 className="text-lg font-bold mb-2" style={{color: styles.accentColor}}>TECHNICAL SKILLS</h3>
            <div className="text-sm text-gray-700">
              {getLocalizedText(data.skills.technical).join(' • ')}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2" style={{color: styles.accentColor}}>REFERENCES</h3>
            <p className="text-gray-600 italic text-sm">Available upon request</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div ref={templateRef} className={`w-full bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="text-white p-4 md:p-6 relative overflow-hidden" style={styles.headerStyle}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col space-y-3 md:flex-row md:items-start md:justify-between md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{data.personal.name}</h1>
              <h2 className="text-base md:text-lg opacity-90 font-medium mb-3">{getLocalizedText(data.personal.title)}</h2>
              <div className="text-sm md:text-sm opacity-80 space-y-1">
                <p>Born: 11/4/1994</p>
                <p>ID: 29099098</p>
                <p>Driver License: B</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:text-right">
              <a href={`mailto:${data.personal.email}`} className="flex items-center justify-center md:justify-end space-x-1.5 bg-white bg-opacity-20 rounded-full px-2.5 py-1 backdrop-blur-sm hover:bg-opacity-30 transition-all text-xs">
                <FiMail className="w-3 h-3 flex-shrink-0" />
                <span className="font-medium truncate max-w-[120px] md:max-w-none">{data.personal.email}</span>
              </a>
              <a href={`tel:${data.personal.phone}`} className="flex items-center justify-center md:justify-end space-x-1.5 bg-white bg-opacity-20 rounded-full px-2.5 py-1 backdrop-blur-sm hover:bg-opacity-30 transition-all text-xs">
                <FiPhone className="w-3 h-3 flex-shrink-0" />
                <span className="font-medium">{data.personal.phone}</span>
              </a>
              <a href="https://maps.google.com/?q=Beni+Khiar+Nabeul+Tunisia" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-end space-x-1.5 bg-white bg-opacity-20 rounded-full px-2.5 py-1 backdrop-blur-sm hover:bg-opacity-30 transition-all text-xs">
                <FiMapPin className="w-3 h-3 flex-shrink-0" />
                <span className="font-medium truncate max-w-[100px] md:max-w-none">{getLocalizedText(data.personal.location)}</span>
              </a>
              <a href="https://facebook.com/yahyaoui.fadi2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-end space-x-1.5 bg-white bg-opacity-20 rounded-full px-2.5 py-1 backdrop-blur-sm hover:bg-opacity-30 transition-all text-xs">
                <FiFacebook className="w-3 h-3 flex-shrink-0" />
                <span className="font-medium truncate max-w-[100px] md:max-w-none">@yahyaoui.fadi2</span>
              </a>
              <a href="https://linkedin.com/in/fadiyahyaoui" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-end space-x-1.5 bg-white bg-opacity-20 rounded-full px-2.5 py-1 backdrop-blur-sm hover:bg-opacity-30 transition-all text-xs">
                <FiLinkedin className="w-3 h-3 flex-shrink-0" />
                <span className="font-medium truncate max-w-[100px] md:max-w-none">@fadiyahyaoui</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="p-3 md:p-6 bg-gray-50">
        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-3 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Career Objective
          </h3>
          <p className="text-gray-700 leading-relaxed">{getLocalizedText(data.objective)}</p>
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Professional Experience
          </h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{getLocalizedText(exp.title)}</h4>
                  <p className="font-semibold" style={{color: styles.accentColor}}>{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full text-sm">{exp.period}</p>
                  <p className="text-gray-600 text-sm">{getLocalizedText(exp.location)}</p>
                </div>
              </div>
              <ul className="list-none space-y-1 text-gray-700">
                {getLocalizedText(exp.achievements).map((achievement: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={styles.skillStyle}></div>
                    <span className="leading-relaxed text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Key Projects
          </h3>
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{getLocalizedText(project.title)}</h4>
              <p className="text-gray-700 text-sm mb-2">{getLocalizedText(project.description)}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies.map((tech: string, i: number) => (
                  <span key={i} className="px-2 py-1 text-white rounded text-xs" style={styles.skillStyle}>{tech}</span>
                ))}
              </div>
              <p className="text-gray-600 text-xs">{project.period} • Impact: {project.impact}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.certifications.map((cert: any, index: number) => (
              <div key={index} className="p-3 bg-white rounded-lg shadow-md">
                <h4 className="font-bold text-gray-800 text-sm">{cert.name}</h4>
                <p className="text-gray-600 text-xs">{cert.issuer} • {cert.year}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${cert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {getLocalizedText(data.skills.technical).map((skill: string, index: number) => (
              <span key={index} className="px-3 py-2 text-white rounded-full text-sm font-semibold shadow-lg" style={styles.skillStyle}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Education
          </h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3 p-3 bg-white rounded-lg shadow-md">
              <h4 className="text-lg font-bold text-gray-800">{getLocalizedText(edu.degree)}</h4>
              <p className="font-semibold" style={{color: styles.accentColor}}>{edu.institution}</p>
              <p className="text-gray-600 font-medium text-sm">{edu.year} • {getLocalizedText(edu.location)}</p>
              {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
              {edu.coursework && <p className="text-gray-600 text-xs mt-1">Key Coursework: {getLocalizedText(edu.coursework)}</p>}
            </div>
          ))}
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <FiAward className="w-5 h-5 mr-3" style={{color: styles.accentColor}} />
            Awards & Recognition
          </h3>
          {data.awards.map((award: any, index: number) => (
            <div key={index} className="mb-3 p-3 bg-white rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800">{getLocalizedText(award.title)}</h4>
              <p className="text-gray-600 text-sm">{award.issuer} • {award.year}</p>
              <p className="text-gray-700 text-sm mt-1">{getLocalizedText(award.description)}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <FiUsers className="w-5 h-5 mr-3" style={{color: styles.accentColor}} />
            Professional References
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.references.map((ref: any, index: number) => (
              <div key={index} className="p-3 bg-white rounded-lg shadow-md">
                <h4 className="font-bold text-gray-800 text-sm">{ref.name}</h4>
                <p className="text-gray-600 text-xs">{ref.position}</p>
                <p className="text-gray-600 text-xs">{ref.company}</p>
                <p className="text-gray-500 text-xs">{ref.relationship}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600 text-xs">{ref.phone}</p>
                  <p className="text-gray-600 text-xs">{ref.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-xl shadow-lg" style={{...styles.cardStyle, borderLeft: `4px solid ${styles.borderColor}`}}>
          <h3 className="text-2xl font-bold mb-4 pb-2 flex items-center" style={{color: styles.accentColor}}>
            <div className="w-2 h-6 rounded-full mr-3" style={styles.skillStyle}></div>
            Languages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getLocalizedText(data.skills.languages).map((lang: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-md">
                <span className="font-semibold text-gray-800 text-sm">{lang.language}</span>
                <span className="text-white px-2 py-1 rounded-full text-xs font-medium" style={styles.skillStyle}>{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVTemplate;