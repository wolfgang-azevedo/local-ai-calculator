# Local AI Model Calculator

A sophisticated web application for calculating and optimizing resource requirements for running AI models locally. This tool helps determine optimal hardware requirements and configurations for different AI models, making it easier to plan and optimize local AI deployments.

![Local AI Model Calculator](https://img.shields.io/badge/Local-AI%20Calculator-blue)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

- **Model Configuration**
  - Support for various model sizes (7B, 14B, 70B parameters)
  - Adjustable context length settings
  - Multiple quantization options (FP16, 8-bit, 4-bit)
  - Batch size optimization

- **GPU Database Integration**
  - Comprehensive GPU specifications database
  - Real-time compatibility checking
  - Performance predictions
  - Automatic recommendations based on hardware capabilities

- **Resource Calculations**
  - VRAM requirements estimation
  - System RAM calculations
  - Performance metrics (tokens/second)
  - Context size impact analysis

- **Use Case Optimization**
  - Pre-configured scenarios for common use cases
  - Performance benchmarks
  - Resource requirement breakdowns
  - Optimization suggestions

- **User Interface**
  - Dark/Light theme support
  - Internationalization (English/Portuguese)
  - Interactive performance graphs
  - Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wolfgang-azevedo/local-ai-calculator.git
cd local-ai-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Docker Setup

For containerized deployment:

```bash
# Development environment
docker-compose up dev

# Production environment
docker-compose up app
```

## 🛠️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
VITE_API_URL=http://localhost:3005
```

### GPU Database

The application uses a CSV database for GPU specifications. This database was based on https://www.techpowerup.com/gpu-specs/ list. Feel free to add more GPUs, to update or modify the GPU database:

1. Edit the `gpu_db_raw.txt` file
2. Run the parser:
```bash
python gpu_db_parse.py
```

## 💻 Usage

1. **Model Configuration**
   - Select model size based on your use case
   - Adjust context length according to your needs
   - Choose appropriate quantization level
   - Set batch size for processing

2. **GPU Selection**
   - Search for your GPU model
   - View detailed specifications
   - Check compatibility with your configuration
   - Review optimization recommendations

3. **Performance Analysis**
   - View estimated resource requirements
   - Check performance metrics
   - Review compatibility analysis
   - Explore use case specific recommendations

## 🧮 Resource Calculations

The application uses the following formulas for calculations:

### VRAM Requirements
```
VRAM = (model_size × precision_bits / 8) × (1 + overhead_factor)
```

### Performance Estimation
```
tokens/s = base_speed × (gpu_vram / 24) × (1 - quantization_penalty)
```

## 🌐 Internationalization

The application supports multiple languages:

- English (en)
- Portuguese (pt)

To add a new language:
1. Create a new translation file in `src/lib/i18n/translations`
2. Add the language option to the language selector component
3. Update the i18n context provider

## 🎨 Theming

The application uses a customizable theme system:

- Light and dark mode support
- CSS variables for easy customization
- Tailwind CSS utility classes
- shadcn/ui components

## 📦 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── AIResourceCalculator.jsx
│   │   └── ui/
│   ├── lib/
│   │   ├── i18n/
│   │   └── utils.js
│   ├── styles/
│   │   └── globals.css
│   └── App.jsx
├── public/
│   └── data/
├── nginx/
└── docker/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)

## 📧 Contact

For questions or support, please open an issue or contact the maintenance team.
⌨️ [Wolfgang Azevedo](https://github.com/wolfgang-azevedo)