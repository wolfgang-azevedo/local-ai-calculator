// src/components/AIResourceCalculator.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useResources } from './resource-manager';
import Papa from 'papaparse';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIResourceCalculator = () => {
  const { t, language } = useI18n();
  const { 
    selectedConfig, 
    selectedGpu, 
    resources, 
    updateConfig, 
    updateGpu 
  } = useResources();

  // Debug log para verificar valores
  useEffect(() => {
    console.log('Valores atuais:', {
      selectedConfig,
      selectedGpu,
      resources,
      language,
      translation: t('results.understanding.modelSelected', { 
        model: selectedConfig.modelSize?.toUpperCase() 
      })
    });
  }, [selectedConfig, selectedGpu, resources, language, t]);

  // Estados locais apenas para UI
  const [activeTab, setActiveTab] = useState("config");
  const [gpuSearch, setGpuSearch] = useState("");
  const [gpuDatabase, setGpuDatabase] = useState([]);

  // Adicione estas duas funções aqui
  const formatValue = (value, type = '') => {
    if (typeof value === 'number') {
      if (type === 'tokens') return value.toLocaleString();
      return value.toFixed(1);
    }
    return value || '0';
  };

  const hasValidConfiguration = () => {
    return (
      selectedConfig?.modelSize &&
      selectedConfig?.contextLength &&
      selectedConfig?.quantization &&
      selectedGpu
    );
  };

// Carrega o banco de dados de GPUs
React.useEffect(() => {
  const loadGpuData = async () => {
    // Dados mockados para fallback
    const mockData = [
      {
        "Product Name": "GeForce RTX 4090",
        "GPU Chip": "AD102",
        "Released": "Sep 20th, 2022",
        "Bus": "PCIe 4.0 x16",
        "Memory Size": 24,
        "Memory Type": "GDDR6X",
        "Memory Bits": 384,
        "GPU clock": 2235,
        "Memory clock": 1313,
        "Shaders": 16384,
        "TMUs": 512,
        "ROPs": 176
      },
      {
        "Product Name": "GeForce RTX 4080",
        "GPU Chip": "AD103",
        "Released": "Sep 20th, 2022",
        "Bus": "PCIe 4.0 x16",
        "Memory Size": 16,
        "Memory Type": "GDDR6X",
        "Memory Bits": 256,
        "GPU clock": 2205,
        "Memory clock": 1400,
        "Shaders": 9728,
        "TMUs": 304,
        "ROPs": 112
      },
      {
        "Product Name": "GeForce RTX 4070",
        "GPU Chip": "AD104",
        "Released": "Apr 12th, 2023",
        "Bus": "PCIe 4.0 x16",
        "Memory Size": 12,
        "Memory Type": "GDDR6X",
        "Memory Bits": 192,
        "GPU clock": 1920,
        "Memory clock": 1313,
        "Shaders": 5888,
        "TMUs": 184,
        "ROPs": 64
      }
    ];

    try {
      // Tenta carregar o arquivo do servidor
      const response = await fetch('/data/gpu_db.csv');
      if (response.ok) {
        const csvText = await response.text();
        const result = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });
        console.log('CSV loaded successfully:', result.data);
        setGpuDatabase(result.data);
      } else {
        // Se não encontrar o arquivo, usa dados mockados
        console.log('Using mock data - CSV file not found');
        setGpuDatabase(mockData);
      }
    } catch (error) {
      // Em caso de erro, usa dados mockados
      console.error('Error loading GPU database:', error);
      console.log('Using mock data due to error');
      setGpuDatabase(mockData);
    }
  };

  loadGpuData();
}, []);

  // Filtra GPUs com base na pesquisa
  const filteredGpus = useMemo(() => {
    if (!gpuSearch.trim()) return gpuDatabase;
    
    const searchTerms = gpuSearch.toLowerCase().split(' ').filter(Boolean);
    return gpuDatabase.filter(gpu => {
      const gpuName = gpu['Product Name'].toLowerCase();
      return searchTerms.every(term => gpuName.includes(term));
    });
  }, [gpuSearch, gpuDatabase]);

  // Handlers para atualização de configuração
  const handleModelSizeChange = (size) => {
    updateConfig({ modelSize: size });
  };

  const handleContextLengthChange = (value) => {
    updateConfig({ contextLength: value[0] });
  };

  const handleQuantizationChange = (value) => {
    updateConfig({ quantization: value });
  };

  const handleBatchSizeChange = (value) => {
    updateConfig({ batchSize: value[0] });
  };

  // ComboboxGPU Component
  const ComboboxGPU = ({ gpus, value, onChange, searchValue, onSearchChange }) => {
    const containerRef = React.useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setShowDropdown(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <Input
            type="text"
            placeholder={t('gpu.search.placeholder')}
            value={searchValue}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full pr-8"
          />
          
          {searchValue && (
            <button
              onClick={() => {
                onSearchChange("");
                setShowDropdown(true);
              }}
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          )}
        </div>

        {showDropdown && (
          <div className="absolute w-full mt-1 rounded-md border bg-popover shadow-lg z-50">
            <div className="max-h-[300px] overflow-y-auto py-1">
              {gpus.map((gpu, index) => (
                <div
                  key={index}
                  className={`p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground
                    ${value?.['Product Name'] === gpu['Product Name'] ? 'bg-accent text-accent-foreground' : ''}`}
                  onClick={() => {
                    onChange(gpu);
                    onSearchChange(gpu['Product Name']);
                    setShowDropdown(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{gpu['Product Name']}</span>
                    <span className="text-sm">{gpu['Memory Size']}GB</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {gpu['Memory Type']} • {gpu['GPU clock']}MHz • {gpu['Shaders']} shaders
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Dados para o gráfico de performance
  const getGraphData = () => {
    if (!selectedGpu || !resources.tokensPerSecond) return [];

    const basePerformance = resources.tokensPerSecond;
    const contextSizes = [4096, 8192, 16384];
    
    // Fatores de eficiência por tamanho do modelo
    const modelEfficiency = {
      '7b': 1.0,
      '14b': 0.6,
      '70b': 0.3
    };

    return contextSizes.map(contextSize => {
      // Calcula a penalidade do contexto baseada na raiz quadrada da proporção
      const contextPenalty = Math.sqrt(4096 / contextSize);
      
      // Calcula o desempenho base ajustado pelo tamanho do contexto
      const adjustedPerformance = basePerformance * contextPenalty;

      return {
        context: contextSize.toString(),
        // Para cada modelo, aplica a penalidade de contexto e eficiência do modelo
        '7B': adjustedPerformance * (selectedConfig.modelSize === '7b' ? 1 : modelEfficiency['7b']),
        '14B': adjustedPerformance * (selectedConfig.modelSize === '14b' ? 1 : modelEfficiency['14b']),
        '70B': adjustedPerformance * (selectedConfig.modelSize === '70b' ? 1 : modelEfficiency['70b']),
      };
    });
  };

  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="config">{t('tabs.config')}</TabsTrigger>
          <TabsTrigger value="gpu">{t('tabs.gpu')}</TabsTrigger>
          <TabsTrigger value="cases">{t('tabs.cases')}</TabsTrigger>
          <TabsTrigger value="results">{t('tabs.results')}</TabsTrigger>
        </TabsList>

        {/* Tab de Configuração */}
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>{t('config.title')}</CardTitle>
              <CardDescription>{t('config.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Model Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('config.modelSize.label')}</label>
                <Select 
                  value={selectedConfig.modelSize} 
                  onValueChange={(value) => {
                    console.log('Model size selected:', value);
                    updateConfig({ modelSize: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7b">{t('config.modelSize.7b')}</SelectItem>
                    <SelectItem value="14b">{t('config.modelSize.14b')}</SelectItem>
                    <SelectItem value="70b">{t('config.modelSize.70b')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Context Length */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('config.context.label')}</label>
                <Slider 
                  value={[selectedConfig.contextLength]}
                  onValueChange={handleContextLengthChange}
                  min={2048}
                  max={32768}
                  step={1024}
                  className="w-full"
                />
                <span className="text-sm text-muted-foreground">
                  {selectedConfig.contextLength} {t('config.context.tokens')}
                </span>
              </div>

              {/* Quantization */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('config.quantization.label')}</label>
                <Select 
                  value={selectedConfig.quantization} 
                  onValueChange={handleQuantizationChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fp16">{t('config.quantization.fp16')}</SelectItem>
                    <SelectItem value="8bit">{t('config.quantization.8bit')}</SelectItem>
                    <SelectItem value="4bit">{t('config.quantization.4bit')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Batch Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('config.batchSize.label')}</label>
                <Slider 
                  value={[selectedConfig.batchSize]}
                  onValueChange={handleBatchSizeChange}
                  min={1}
                  max={8}
                  step={1}
                  className="w-full"
                />
                <span className="text-sm text-muted-foreground">{selectedConfig.batchSize}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de GPU */}
        <TabsContent value="gpu">
          <Card>
            <CardHeader>
              <CardTitle>{t('gpu.title')}</CardTitle>
              <CardDescription>{t('gpu.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ComboboxGPU
                  gpus={filteredGpus}
                  value={selectedGpu}
                  onChange={updateGpu}
                  searchValue={gpuSearch}
                  onSearchChange={setGpuSearch}
                />

                {selectedGpu && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* GPU Specs Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('gpu.specs.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('gpu.specs.vram')}</span>
                            <span className="font-medium">{selectedGpu['Memory Size']}GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('gpu.specs.gpuClock')}</span>
                            <span className="font-medium">{selectedGpu['GPU clock']}MHz</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('gpu.specs.memoryClock')}</span>
                            <span className="font-medium">{selectedGpu['Memory clock']}MHz</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('gpu.specs.bus')}</span>
                            <span className="font-medium">{selectedGpu['Bus']}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('gpu.specs.shaders')}</span>
                            <span className="font-medium">{selectedGpu['Shaders']}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recommendations Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('gpu.recommendations.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedGpu['Memory Size'] >= 24 ? (
                            <>
                              <li className="text-green-600">{t('gpu.recommendations.highVram.support')}</li>
                              <li className="text-green-600">{t('gpu.recommendations.highVram.context')}</li>
                              <li className="text-green-600">{t('gpu.recommendations.highVram.precision')}</li>
                            </>
                          ) : selectedGpu['Memory Size'] >= 16 ? (
                            <>
                              <li className="text-yellow-600">{t('gpu.recommendations.mediumVram.support')}</li>
                              <li className="text-yellow-600">{t('gpu.recommendations.mediumVram.quantization')}</li>
                              <li className="text-yellow-600">{t('gpu.recommendations.mediumVram.context')}</li>
                            </>
                          ) : (
                            <>
                              <li className="text-red-600">{t('gpu.recommendations.lowVram.support')}</li>
                              <li className="text-red-600">{t('gpu.recommendations.lowVram.quantization')}</li>
                              <li className="text-red-600">{t('gpu.recommendations.lowVram.context')}</li>
                            </>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Casos de Uso */}
        <TabsContent value="cases">
          <div className="space-y-4">
            {['personalChat', 'coding', 'documents', 'rag'].map((useCase) => (
              <Card key={useCase} className="card-hover">
                <CardHeader>
                  <CardTitle>{t(`useCases.${useCase}.title`)}</CardTitle>
                  <CardDescription>{t(`useCases.${useCase}.description`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">{t('useCases.labels.requirements')}</h4>
                      <ul className="space-y-1">
                        <li>
                          <span className="text-muted-foreground">{t('useCases.labels.model')}</span>{' '}
                          {t(`useCases.${useCase}.requirements.model`)}
                        </li>
                        <li>
                          <span className="text-muted-foreground">{t('useCases.labels.context')}</span>{' '}
                          {t(`useCases.${useCase}.requirements.context`)}
                        </li>
                        <li>
                          <span className="text-muted-foreground">{t('useCases.labels.vram')}</span>{' '}
                          {t(`useCases.${useCase}.requirements.vram`)}
                        </li>
                        <li>
                          <span className="text-muted-foreground">{t('useCases.labels.quantization')}</span>{' '}
                          {t(`useCases.${useCase}.requirements.quantization`)}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{t('useCases.labels.performance')}</h4>
                      <p>{t(`useCases.${useCase}.performance`)}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">{t('useCases.labels.calculation')}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t(`useCases.${useCase}.calculation`)}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">{t('useCases.labels.source')}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t(`useCases.${useCase}.source`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Resultados */}
        <TabsContent value="results">
          <div className="space-y-6">
          {/* Entendendo sua Configuração */}
            <Card>
            <CardHeader>
              <CardTitle>{t('results.understanding.title')}</CardTitle>
              <CardDescription>{t('results.understanding.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Modelo */}
                <div>
                  <h4 className="font-semibold text-lg">
                    {`${t('results.understanding.modelSelected').replace(
                      '{model}',
                      selectedConfig.modelSize?.toUpperCase() || '7B'
                    )}`}
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    {t(`results.understanding.modelDescriptions.${selectedConfig.modelSize}`)}
                  </p>
                </div>

                {/* Quantização */}
                <div>
                  <h4 className="font-semibold text-lg">
                    {`${t('results.understanding.quantization.title').replace(
                      '{type}',
                      selectedConfig.quantization?.toString() || 'FP16'
                    )}`}
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    {t(`results.understanding.quantization.${selectedConfig.quantization}`)}
                  </p>
                </div>

                {/* Contexto */}
                <div>
                  <h4 className="font-semibold text-lg">
                    {`${t('results.understanding.context.title').replace(
                      '{length}',
                      selectedConfig.contextLength?.toString() || '4096'
                    )}`}
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    {t('results.understanding.context.description', {
                      length: selectedConfig.contextLength,
                      chars: ((selectedConfig.contextLength * 4) / 1000).toFixed(1)
                    }).replace('{length}', selectedConfig.contextLength?.toString())
                      .replace('{chars}', ((selectedConfig.contextLength * 4) / 1000).toFixed(1))}
                  </p>
                </div>

                {/* Debug info - remover depois 
                <pre className="text-xs bg-gray-100 p-2 rounded">
                  {JSON.stringify({
                    config: selectedConfig,
                    lang: language,
                    modelTitle: t('results.understanding.modelSelected')
                  }, null, 2)}
                </pre>*/}
              </div>
            </CardContent>
          </Card>

            {selectedGpu ? (
              <>
                {/* Requisitos de Hardware */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('results.hardware.title')}</CardTitle>
                    <CardDescription>{t('results.hardware.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{t('results.hardware.vram.title')}</h4>
                        <p className="text-2xl font-bold">
                          {`${formatValue(resources.vramNeeded)}GB`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t('results.hardware.vram.description')}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">{t('results.hardware.ram.title')}</h4>
                        <p className="text-2xl font-bold">
                          {`${formatValue(resources.ramNeeded)}GB`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t('results.hardware.ram.description')}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">{t('results.hardware.speed.title')}</h4>
                        <p className="text-2xl font-bold">
                          {resources?.tokensPerSecond 
                            ? `${resources.tokensPerSecond.toFixed(1)} tokens/s`
                            : '0 tokens/s'
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t('results.hardware.speed.description').replace(
                            '{chars}',
                            Math.round((resources?.tokensPerSecond || 0) * 60 * 4).toString()
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Análise de Compatibilidade */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('results.compatibility.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resources.isViable ? (
                      <Alert className="bg-green-50 dark:bg-green-900/20">
                        <div className="text-green-600 dark:text-green-400">
                          <h4 className="font-semibold mb-2">{t('results.compatibility.compatible.title')}</h4>
                          <p>
                            {t('results.compatibility.compatible.description')
                              .replace('{gpu}', selectedGpu?.['Product Name'] || 'Unknown')
                              .replace('{vram}', (selectedGpu?.['Memory Size'] || 0).toString())}
                          </p>
                        </div>
                      </Alert>
                    ) : (
                      <Alert variant="destructive">
                        <AlertDescription>
                          <h4 className="font-semibold mb-2">{t('results.compatibility.incompatible.title')}</h4>
                          <p className="mb-4">
                            {t('results.compatibility.incompatible.description')
                              .replace('{gpu}', selectedGpu?.['Product Name'] || 'Unknown')
                              .replace('{vram}', (selectedGpu?.['Memory Size'] || 0).toString())
                              .replace('{needed}', formatValue(resources?.vramNeeded || 0))}
                          </p>
                          <div className="space-y-2">
                            <p className="font-semibold">{t('results.compatibility.incompatible.suggestions.title')}</p>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>{t('results.compatibility.incompatible.suggestions.quantization')}</li>
                              <li>{t('results.compatibility.incompatible.suggestions.context')}</li>
                              <li>{t('results.compatibility.incompatible.suggestions.model')}</li>
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Performance Comparison Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('results.performance.title')}</CardTitle>
                    <CardDescription>{t('results.performance.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={getGraphData()} 
                          margin={{ top: 20, right: 30, left: 60, bottom: 60 }} // Ajustado as margens
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="context" 
                            label={{ 
                              value: t('results.performance.axis.x'),
                              position: 'bottom',
                              offset: 40
                            }}
                            tickFormatter={(value) => `${value} tokens`}
                          />
                          <YAxis 
                            label={{ 
                              value: t('results.performance.axis.y'),
                              angle: -90,
                              position: 'insideLeft',
                              offset: -50,
                              style: { textAnchor: 'middle' }
                            }}
                            domain={[0, 'auto']}
                            tickFormatter={(value) => `${value}`}
                          />
                          <Tooltip 
                            formatter={(value, name) => {
                              // Extrai apenas o número do nome do modelo (7, 14 ou 70)
                              const modelNumber = name.split('B')[0];
                              
                              return [
                                `${value.toFixed(1)} tokens/s`,
                                t(`config.modelSize.${modelNumber.toLowerCase()}b`)
                              ];
                            }}
                            labelFormatter={(value) => `Contexto: ${value} tokens`}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.98)',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              padding: '8px'
                            }}
                          />
                          <Legend 
                            verticalAlign="top" 
                            align="center"
                            wrapperStyle={{ paddingBottom: '20px' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="7B" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={{ strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name={t('config.modelSize.7b')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="14B" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                            dot={{ strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name={t('config.modelSize.14b')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="70B" 
                            stroke="#ffc658" 
                            strokeWidth={2}
                            dot={{ strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name={t('config.modelSize.70b')}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('results.technical.title')}</CardTitle>
                    <CardDescription>{t('results.technical.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          {t('results.technical.gpu.title')
                            .replace('{name}', selectedGpu?.['Product Name'] || 'Unknown')}
                        </h4>
                        <ul className="space-y-1">
                          <li>
                            {t('results.technical.gpu.vram')
                              .replace('{size}', (selectedGpu?.['Memory Size'] || 0).toString())
                              .replace('{type}', selectedGpu?.['Memory Type'] || '')}
                          </li>
                          <li>
                            {t('results.technical.gpu.clock')
                              .replace('{value}', (selectedGpu?.['GPU clock'] || 0).toString())}
                          </li>
                          <li>
                            {t('results.technical.gpu.shaders')
                              .replace('{value}', (selectedGpu?.['Shaders'] || 0).toString())}
                          </li>
                          <li>
                            {t('results.technical.gpu.processing')
                              .replace(
                                '{value}', 
                                ((selectedGpu?.['GPU clock'] * selectedGpu?.['Shaders']) / 1000000 || 0).toFixed(2)
                              )}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">{t('results.technical.formulas.title')}</h4>
                        <ul className="space-y-1">
                          <li>{t('results.technical.formulas.vram')}</li>
                          <li>{t('results.technical.formulas.performance')}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Alert>
                <AlertDescription>{t('gpu.selectGpu')}</AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIResourceCalculator;