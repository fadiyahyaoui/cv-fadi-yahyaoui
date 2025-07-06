# Multi-Language CV Generator

A modern, responsive CV/Resume generator built with React, TypeScript, and Vite. Generate professional CVs in multiple languages and formats with PDF export functionality.

## 🚀 Features

- **Multi-Language Support**: English, French, German, Arabic, and Italian
- **Multiple Formats**: Canadian and European CV formats
- **PDF Export**: High-quality PDF generation with html2canvas and jsPDF
- **Responsive Design**: Mobile-friendly and print-optimized
- **Real-time Preview**: Instant updates as you switch languages/formats
- **Smooth Animations**: GSAP-powered transitions and effects
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **PDF Generation**: html2canvas + jsPDF
- **Icons**: React Icons (Feather Icons)
- **Internationalization**: Multi-language JSON data structure

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/fadiyahyaoui/cv-fadi-yahyaoui.git
cd cv-fadi-yahyaoui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3001`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Customization

### Adding New Languages

1. Update the `cvData.json` file with new language keys
2. Add the language option in `ControlPanel.tsx`
3. Update the language selection logic

### Modifying CV Data

Edit the `src/data/cvData.json` file to update:
- Personal information
- Work experience
- Education
- Skills
- Projects
- Certifications

### Styling

The project uses Tailwind CSS for styling. You can:
- Modify colors in the component files
- Update the `App.css` for global styles
- Customize the format styles in `CVTemplate.tsx`

## 📱 Responsive Design

The CV is fully responsive and optimized for:
- Desktop viewing
- Mobile devices
- Print/PDF export
- Different screen sizes

## 🖨️ PDF Export

The PDF export feature:
- Maintains high quality (2x scale)
- Preserves colors and formatting
- Optimizes file size
- Includes proper filename with language and format

## 🌐 Multi-Language Support

Currently supports:
- **English** (EN)
- **French** (FR) 
- **German** (DE)
- **Arabic** (AR) - with RTL support
- **Italian** (IT)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Fadi Yahyaoui**
- Email: yahyaouifadi@gmail.com
- LinkedIn: [@fadiyahyaoui](https://linkedin.com/in/fadiyahyaoui)
- Location: Beni Khiar, Nabeul, Tunisia

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/fadiyahyaoui/cv-fadi-yahyaoui/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!