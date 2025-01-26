// src/components/resource-manager.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Alert } from "@/components/ui/alert";

const ResourceContext = createContext(null);

export function ResourceProvider({ children }) {
  const [selectedConfig, setSelectedConfig] = useState({
    modelSize: '7b',
    contextLength: 4096,
    quantization: 'fp16',
    batchSize: 1
  });

  const [selectedGpu, setSelectedGpu] = useState(null);
  const [resources, setResources] = useState({
    vramNeeded: 0,
    ramNeeded: 0,
    tokensPerSecond: 0,
    isViable: true
  });

  // Função para calcular recursos
  const calculateResources = useCallback(() => {
    if (!selectedGpu || !selectedConfig.modelSize) {
      return;
    }

    // Fatores de modelo e quantização
    const modelSizes = {
      "7b": 7,
      "14b": 14,
      "70b": 70
    };

    const quantFactors = {
      "fp16": 2,
      "8bit": 1,
      "4bit": 0.5
    };

    try {
      // Cálculo de VRAM
      const baseVram = modelSizes[selectedConfig.modelSize] * 
                      quantFactors[selectedConfig.quantization];
      const contextOverhead = (selectedConfig.contextLength / 2048) * 0.5;
      const totalVram = baseVram * (1 + contextOverhead) * selectedConfig.batchSize;

      // Cálculo de RAM
      const ramNeeded = totalVram * 1.5;

      // Cálculo de performance
      const gpuTflops = (selectedGpu['GPU clock'] * selectedGpu.Shaders) / 1000000;
      const baseTokens = {
        "7b": 100,
        "14b": 60,
        "70b": 20
      }[selectedConfig.modelSize];

      const quantPenalty = {
        "fp16": 1,
        "8bit": 0.9,
        "4bit": 0.8
      }[selectedConfig.quantization];

      const contextPenalty = Math.sqrt(4096 / selectedConfig.contextLength);
      const tokensPerSecond = gpuTflops * baseTokens * quantPenalty * 
                             contextPenalty / selectedConfig.batchSize;

      const newResources = {
        vramNeeded: totalVram,
        ramNeeded,
        tokensPerSecond,
        isViable: totalVram <= selectedGpu['Memory Size']
      };

      setResources(newResources);
    } catch (error) {
      console.error('Error calculating resources:', error);
    }
  }, [selectedGpu, selectedConfig]);

  const updateConfig = useCallback((newConfig) => {
    setSelectedConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  }, []);

  const updateGpu = useCallback((gpu) => {
    setSelectedGpu(gpu);
  }, []);

  useEffect(() => {
    calculateResources();
  }, [selectedGpu, selectedConfig, calculateResources]);

  const value = useMemo(() => ({
    selectedConfig,
    selectedGpu,
    resources,
    updateConfig,
    updateGpu
  }), [selectedConfig, selectedGpu, resources, updateConfig, updateGpu]);

  if (!value) {
    return null;
  }

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
}

export function ResourceStatus() {
  const { resources, selectedGpu } = useResources();

  if (!selectedGpu) {
    return (
      <Alert className="text-sm">
        Please select a GPU to see resource calculations
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg shadow-sm">
      <div>
        <h3 className="font-semibold text-lg">VRAM</h3>
        <p className="text-2xl">{resources.vramNeeded.toFixed(1)}GB</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg">RAM</h3>
        <p className="text-2xl">{resources.ramNeeded.toFixed(1)}GB</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Speed</h3>
        <p className="text-2xl">{resources.tokensPerSecond.toFixed(1)} t/s</p>
      </div>
    </div>
  );
}