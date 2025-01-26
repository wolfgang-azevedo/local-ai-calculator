import { Tooltip } from "recharts";

// src/lib/i18n/translations.js
export const translations = {
  en: {
    app: {
      title: 'Local AI Model Calculator',
      subtitle: 'Calculate resources and optimize settings for AI models',
    },
    theme: {
      light: '🌙 Dark Mode',
      dark: '☀️ Light Mode',
    },
    tabs: {
      config: 'Configuration',
      gpu: 'GPU',
      cases: 'Use Cases',
      results: 'Results',
    },
    config: {
      title: 'Model Configuration',
      description: 'Configure your AI model parameters',
      modelSize: {
        label: 'Model Size',
        '7b': '7B parameters',
        '14b': '14B parameters',
        '70b': '70B parameters',
      },
      context: {
        label: 'Context (tokens)',
        value: '{value} tokens',
        tokens: 'tokens'
      },
      quantization: {
        label: 'Quantization',
        fp16: 'FP16 (16-bit)',
        '8bit': 'INT8 (8-bit)',
        '4bit': '4-bit',
      },
      batchSize: {
        label: 'Batch Size',
      },
    },
    gpu: {
      title: 'GPU Selection',
      description: 'Type your GPU name or select from the list for compatibility analysis',
      search: {
        placeholder: 'Type GPU name or click to see all...',
        clear: 'Clear search',
      },
      selectGpu: 'Select a GPU in the "GPU" tab to see detailed analysis and recommendations.',
      specs: {
        title: 'Specifications',
        vram: 'VRAM:',
        gpuClock: 'GPU Clock:',
        memoryClock: 'Memory Clock:',
        bus: 'Bus:',
        shaders: 'Shaders:',
      },
      recommendations: {
        title: 'Recommendations',
        highVram: {
          support: '✓ Supports all models (7B, 14B, 70B)',
          context: '✓ Ideal for long context loads',
          precision: '✓ Can use FP16 for maximum precision',
        },
        mediumVram: {
          support: '⚠️ Ideal for 7B and 14B models',
          quantization: '⚠️ Use 8-bit quantization for 70B model',
          context: '⚠️ Recommended context: up to 8K tokens',
        },
        lowVram: {
          support: '⚠️ Recommended only for 7B model',
          quantization: '⚠️ Use 4-bit quantization',
          context: '⚠️ Recommended context: up to 4K tokens',
        },
      },
    },
    results: {
      understanding: {
        title: 'Understanding Your Configuration',
        description: 'Let\'s understand what each choice means and how it affects your AI model\'s performance',
        modelSelected: 'Selected Model: {model}',
        modelDescriptions: {
          '7b': 'This is a lighter and faster model, ideal for personal use and general tasks. It\'s a great choice to start with.',
          '14b': 'An intermediate model that offers a good balance between performance and quality. Recommended for more complex tasks.',
          '70b': 'A larger and more capable model, ideal for tasks that require greater understanding and response quality.',
        },
        quantization: {
          title: 'Quantization: {type}',
          fp16: 'Maximum precision (16-bit) - Uses more memory but maintains original model quality.',
          '8bit': 'Good quality/memory ratio (8-bit) - Reduces memory usage by half with minimal quality loss.',
          '4bit': 'Maximum memory savings (4-bit) - Uses 1/4 of original memory, ideal for GPUs with less VRAM.',
        },
        context: {
          title: 'Context: {length} tokens',
          description: 'Context determines how much text the model can "remember" during a conversation. Each token represents approximately 4 characters. For example, {length} tokens equals about {chars}K characters of text.',
        },
      },
      hardware: {
        title: 'Hardware Requirements',
        description: 'Based on your choices, here\'s what you need to run the model',
        vram: {
          title: 'Required VRAM',
          description: 'Graphics card memory needed to load the model',
          value: '{value}GB',
        },
        ram: {
          title: 'System RAM',
          description: 'RAM memory needed to support execution',
          value: '{value}GB',
        },
        speed: {
          title: 'Speed',
          description: 'Approximately {chars} characters per minute',
          value: '{value} tokens/s',
        },
      },
      compatibility: {
        title: 'Compatibility Analysis',
        compatible: {
          title: '✓ Compatible Configuration',
          description: 'Your {gpu} GPU with {vram}GB VRAM is suitable for this configuration. You can expect a good user experience.',
        },
        incompatible: {
          title: 'Configuration Exceeds Limits',
          description: 'Your {gpu} GPU has {vram}GB VRAM, but the current configuration needs {needed}GB.',
          suggestions: {
            title: 'Adjustment suggestions:',
            quantization: 'Use 4-bit quantization to reduce memory usage by 75%',
            context: 'Reduce context to 4096 tokens for basic use',
            model: 'Consider a smaller model (7B) that requires fewer resources',
          },
        },
      },
      practical: {
        title: 'What does this mean in practice?',
        usage: {
          title: 'Typical usage of this configuration:',
          slow: 'Suitable for occasional use and more elaborate responses',
          medium: 'Good for regular use and fluid conversations',
          fast: 'Excellent for intensive use and quick responses',
        },
        context: 'Conversations up to {words} words of context',
        quality: {
          fp16: 'Maximum response quality',
          '8bit': 'Good quality with memory savings',
          '4bit': 'Acceptable quality with maximum savings',
        },
      },
      performance: {
        title: 'Comparative Performance',
        description: 'How different context sizes affect response speed',
        axis: {
          x: 'Context Size (tokens)',
          y: 'Tokens per second',
        },
        note: 'The graph shows how speed (tokens per second) decreases with increasing context. A higher tokens/s value means faster responses.',
        tooltip: {
          context: 'Context',
          tokens: 'tokens/s'
        },
      },
      technical: {
        title: 'Technical Details',
        description: 'For advanced users interested in calculations',
        gpu: {
          title: 'GPU: {name}',
          vram: 'VRAM: {size}GB {type}',
          clock: 'Clock: {value}MHz',
          shaders: 'Shaders: {value}',
          processing: 'Processing Power: {value} TFLOPS',
        },
        formulas: {
          title: 'Formulas Used',
          vram: 'VRAM = base_size × quantization_factor × (1 + context_overhead) × batch_size',
          performance: 'Performance = (GPU_TFLOPS × base_tokens × quantization_efficiency) / √(context/4096)',
        },
      },
    },
    useCases: {
      labels: {
        requirements: 'Requirements',
        performance: 'Performance',
        calculation: 'Calculation',
        source: 'Source',
        model: 'Model:',
        context: 'Context:',
        vram: 'VRAM:',
        quantization: 'Quantization:'
      },
      personalChat: {
        title: 'Personal Chatbot',
        description: 'Assistant for general conversations',
        requirements: {
          model: '7B',
          context: '4096 tokens',
          vram: '8GB+',
          quantization: '4-bit',
        },
        performance: '40-60 tokens/s',
        calculation: 'Base tokens/s = GPU TFLOPS × 0.8 (4-bit penalty) × (4096/4096)',
        source: 'llama.cpp benchmarks on RTX 3070/3080',
      },
      coding: {
        title: 'Coding',
        description: 'Programming assistant',
        requirements: {
          model: '14B',
          context: '8192 tokens',
          vram: '16GB+',
          quantization: '8-bit',
        },
        performance: '20-40 tokens/s',
        calculation: 'Base tokens/s = GPU TFLOPS × 0.9 (8-bit penalty) × (4096/8192)',
        source: 'StarCoder tests on RTX 4080/4090',
      },
      documents: {
        title: 'Document Analysis',
        description: 'Long document processing',
        requirements: {
          model: '70B',
          context: '16384 tokens',
          vram: '32GB+',
          quantization: '8-bit',
        },
        performance: '10-20 tokens/s',
        calculation: 'Base tokens/s = GPU TFLOPS × 0.9 (8-bit penalty) × (4096/16384)',
        source: 'LLaMA2-70B benchmarks on A100/A6000',
      },
      rag: {
        title: 'RAG',
        description: 'Retrieval-augmented generation',
        requirements: {
          model: '14B',
          context: '12288 tokens',
          vram: '24GB+',
          quantization: '8-bit',
        },
        performance: '15-30 tokens/s',
        calculation: 'Base tokens/s = GPU TFLOPS × 0.9 (8-bit penalty) × (4096/12288)',
        source: 'Tests with privateGPT and ChromaDB',
      },
    },
  },
  pt: {
    app: {
      title: 'Local AI Model Calculator',
      subtitle: 'Calcule recursos e otimize configurações para modelos de IA',
    },
    theme: {
      light: '🌙 Modo Escuro',
      dark: '☀️ Modo Claro',
    },
    tabs: {
      config: 'Configuração',
      gpu: 'GPU',
      cases: 'Casos de Uso',
      results: 'Resultados',
    },
    config: {
      title: 'Configuração do Modelo',
      description: 'Configure os parâmetros do seu modelo de IA',
      modelSize: {
        label: 'Tamanho do Modelo',
        '7b': '7B parâmetros',
        '14b': '14B parâmetros',
        '70b': '70B parâmetros',
      },
      context: {
        label: 'Contexto (tokens)',
        value: '{value} tokens',
        tokens: 'tokens'
      },
      quantization: {
        label: 'Quantização',
        fp16: 'FP16 (16-bit)',
        '8bit': 'INT8 (8-bit)',
        '4bit': '4-bit',
      },
      batchSize: {
        label: 'Batch Size',
      },
    },
    gpu: {
      title: 'Seleção de GPU',
      description: 'Digite o nome da sua GPU ou selecione da lista para análise de compatibilidade',
      search: {
        placeholder: 'Digite o nome da GPU ou clique para ver todas...',
        clear: 'Limpar busca',
      },
      selectGpu: 'Selecione uma GPU na aba "GPU" para ver análises detalhadas e recomendações.',
      specs: {
        title: 'Especificações',
        vram: 'VRAM:',
        gpuClock: 'Clock da GPU:',
        memoryClock: 'Clock de Memória:',
        bus: 'Barramento:',
        shaders: 'Shaders:',
      },
      recommendations: {
        title: 'Recomendações',
        highVram: {
          support: '✓ Suporta todos os modelos (7B, 14B, 70B)',
          context: '✓ Ideal para cargas com contexto longo',
          precision: '✓ Pode usar FP16 para máxima precisão',
        },
        mediumVram: {
          support: '⚠️ Ideal para modelos 7B e 14B',
          quantization: '⚠️ Use quantização 8-bit para modelo 70B',
          context: '⚠️ Contexto recomendado: até 8K tokens',
        },
        lowVram: {
          support: '⚠️ Recomendado apenas modelo 7B',
          quantization: '⚠️ Use quantização 4-bit',
          context: '⚠️ Contexto recomendado: até 4K tokens',
        },
      },
    },
    results: {
      understanding: {
        title: 'Entendendo sua Configuração',
        description: 'Vamos entender o que cada escolha significa e como ela afeta o desempenho do seu modelo de IA',
        modelSelected: 'Modelo Selecionado: {model}',
        modelDescriptions: {
          '7b': 'Este é um modelo mais leve e rápido, ideal para uso pessoal e tarefas gerais. É uma ótima escolha para começar.',
          '14b': 'Um modelo intermediário que oferece bom equilíbrio entre performance e qualidade. Recomendado para tarefas mais complexas.',
          '70b': 'Um modelo maior e mais capaz, ideal para tarefas que exigem maior compreensão e qualidade de resposta.',
        },
        quantization: {
          title: 'Quantização: {type}',
          fp16: 'Precisão máxima (16-bit) - Usa mais memória mas mantém a qualidade original do modelo.',
          '8bit': 'Boa relação qualidade/memória (8-bit) - Reduz o uso de memória pela metade com mínima perda de qualidade.',
          '4bit': 'Economia máxima de memória (4-bit) - Usa 1/4 da memória original, ideal para GPUs com menos VRAM.',
        },
        context: {
          title: 'Contexto: {length} tokens',
          description: 'O contexto determina quanto texto o modelo pode "lembrar" durante uma conversa. Cada token representa aproximadamente 4 caracteres. Por exemplo, {length} tokens equivalem a cerca de {chars}K caracteres de texto.',
        },
      },
      hardware: {
        title: 'Requisitos de Hardware',
        description: 'Com base nas suas escolhas, aqui está o que você precisa para rodar o modelo',
        vram: {
          title: 'VRAM Necessária',
          description: 'Memória da placa de vídeo necessária para carregar o modelo',
          value: '{value}GB',
        },
        ram: {
          title: 'RAM do Sistema',
          description: 'Memória RAM necessária para suportar a execução',
          value: '{value}GB',
        },
        speed: {
          title: 'Velocidade',
          description: 'Aproximadamente {chars} caracteres por minuto',
          value: '{value} tokens/s',
        },
      },
      compatibility: {
        title: 'Análise de Compatibilidade',
        compatible: {
          title: '✓ Configuração Compatível',
          description: 'Sua GPU {gpu} com {vram}GB de VRAM é adequada para esta configuração. Você pode esperar uma boa experiência de uso.',
        },
        incompatible: {
          title: 'Configuração Excede Limites',
          description: 'Sua GPU {gpu} tem {vram}GB de VRAM, mas a configuração atual precisa de {needed}GB.',
          suggestions: {
            title: 'Sugestões de ajuste:',
            quantization: 'Usar quantização 4-bit para reduzir o uso de memória em 75%',
            context: 'Reduzir o contexto para 4096 tokens para uso básico',
            model: 'Considerar um modelo menor (7B) que exige menos recursos',
          },
        },
      },
      practical: {
        title: 'O que isso significa na prática?',
        usage: {
          title: 'Uso típico desta configuração:',
          slow: 'Adequado para uso ocasional e respostas mais elaboradas',
          medium: 'Bom para uso regular e conversas fluidas',
          fast: 'Excelente para uso intensivo e respostas rápidas',
        },
        context: 'Conversas de até {words} palavras de contexto',
        quality: {
          fp16: 'Máxima qualidade de respostas',
          '8bit': 'Boa qualidade com economia de memória',
          '4bit': 'Qualidade aceitável com máxima economia',
        },
      },
      performance: {
        title: 'Performance Comparativa',
        description: 'Como diferentes tamanhos de contexto afetam a velocidade de resposta',
        axis: {
          x: 'Tamanho do Contexto (tokens)',
          y: 'Tokens por segundo',
        },
        note: 'O gráfico mostra como a velocidade (tokens por segundo) diminui com o aumento do contexto. Um valor maior de tokens/s significa respostas mais rápidas.',
        tooltip: {
          context: 'Contexto',
          tokens: 'tokens/s'
        },
      },
      technical: {
        title: 'Detalhes Técnicos',
        description: 'Para usuários avançados interessados nos cálculos',
        gpu: {
          title: 'GPU: {name}',
          vram: 'VRAM: {size}GB {type}',
          clock: 'Clock: {value}MHz',
          shaders: 'Shaders: {value}',
          processing: 'Potência de Processamento: {value} TFLOPS',
        },
        formulas: {
          title: 'Fórmulas Utilizadas',
          vram: 'VRAM = tamanho_base × fator_quantização × (1 + overhead_contexto) × batch_size',
          performance: 'Performance = (GPU_TFLOPS × tokens_base × eficiência_quantização) / √(contexto/4096)',
        },
      },
    },
    useCases: {
      labels: {
        requirements: 'Requisitos',
        performance: 'Performance',
        calculation: 'Cálculo',
        source: 'Fonte',
        model: 'Modelo:',
        context: 'Contexto:',
        vram: 'VRAM:',
        quantization: 'Quantização:'
      },
      personalChat: {
        title: 'Chatbot Pessoal',
        description: 'Assistente para conversas gerais',
        requirements: {
          model: '7B',
          context: '4096 tokens',
          vram: '8GB+',
          quantization: '4-bit',
        },
        performance: '40-60 tokens/s',
        calculation: 'Tokens/s base = GPU TFLOPS × 0,8 (penalidade 4-bit) × (4096/4096)',
        source: 'Benchmarks do llama.cpp em RTX 3070/3080',
      },
      coding: {
        title: 'Codificação',
        description: 'Assistente de programação',
        requirements: {
          model: '14B',
          context: '8192 tokens',
          vram: '16GB+',
          quantization: '8-bit',
        },
        performance: '20-40 tokens/s',
        calculation: 'Tokens/s base = GPU TFLOPS × 0,9 (penalidade 8-bit) × (4096/8192)',
        source: 'Testes com StarCoder em RTX 4080/4090',
      },
      documents: {
        title: 'Análise de Documentos',
        description: 'Processamento de documentos longos',
        requirements: {
          model: '70B',
          context: '16384 tokens',
          vram: '32GB+',
          quantization: '8-bit',
        },
        performance: '10-20 tokens/s',
        calculation: 'Tokens/s base = GPU TFLOPS × 0,9 (penalidade 8-bit) × (4096/16384)',
        source: 'Benchmarks com LLaMA2-70B em A100/A6000',
      },
      rag: {
        title: 'RAG',
        description: 'Geração aumentada com recuperação de dados',
        requirements: {
          model: '14B',
          context: '12288 tokens',
          vram: '24GB+',
          quantization: '8-bit',
        },
        performance: '15-30 tokens/s',
        calculation: 'Tokens/s base = GPU TFLOPS × 0,9 (penalidade 8-bit) × (4096/12288)',
        source: 'Testes com privateGPT e ChromaDB',
      },
    },
  },
};