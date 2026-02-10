'use client';

import { useState } from 'react';
import Image from 'next/image';

const options = [
  { id: 1, title: 'Simplificar processos', icon: '✂️', description: 'Clareza gera agilidade' },
  { id: 2, title: 'Acelerar entregas', icon: '⚡', description: 'Velocidade com qualidade' },
  { id: 3, title: 'Tomar melhores decisões', icon: '🎯', description: 'Dados guiam, intuição decide' },
  { id: 4, title: 'Conectar pessoas', icon: '🤝', description: 'Colaboração multiplica' },
];

export default function Home() {
  const [step, setStep] = useState<'upload' | 'options' | 'processing' | 'result'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep('options');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleGenerate = async () => {
    if (!selectedImage || !selectedOption) return;

    setStep('processing');
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          option: selectedOption,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar caricatura');
      }

      setResult(data);
      setStep('result');
    } catch (err: any) {
      setError(err.message);
      setStep('options');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setSelectedImage(null);
    setSelectedOption(null);
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Seu Perfil de Inovação
          </h1>
          <p className="text-slate-600 text-lg">
            Use IA para criar sua caricatura como líder de inovação
          </p>
        </div>

        {/* Card Principal */}
        <div className="card">
          {/* Step 1: Upload */}
          {step === 'upload' && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">📸</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Envie sua foto
                </h2>
                <p className="text-slate-600">
                  Qualquer foto serve — vamos transformá-la em arte!
                </p>
              </div>

              <label className="btn-primary cursor-pointer inline-block">
                Escolher foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Step 2: Options */}
          {step === 'options' && (
            <div>
              <div className="mb-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-200">
                  {selectedImage && (
                    <Image
                      src={selectedImage}
                      alt="Foto selecionada"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Escolha seu foco de inovação
                </h2>
                <p className="text-slate-600">
                  Qual destas áreas mais representa sua liderança?
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`btn-option w-full ${
                      selectedOption === option.id ? 'selected' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <div className="font-semibold text-lg">{option.title}</div>
                        <div className="text-sm text-slate-500">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Trocar foto
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedOption}
                  className="flex-1 btn-primary"
                >
                  Gerar caricatura
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Criando sua caricatura...
              </h2>
              <p className="text-slate-600">
                A IA está trabalhando nisso. Aguarde alguns segundos.
              </p>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 'result' && result && (
            <div className="text-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Sua caricatura está pronta! 🎉
                </h2>

                {/* Mostra a descrição (em produção, seria a imagem) */}
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 mb-4">
                  {result.imageUrl ? (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={result.imageUrl}
                        alt="Caricatura gerada"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-left">
                      <p className="text-slate-700 mb-2 font-semibold">
                        Descrição da caricatura:
                      </p>
                      <p className="text-slate-600 whitespace-pre-wrap">
                        {result.description}
                      </p>
                      {result.note && (
                        <p className="text-sm text-amber-600 mt-4 italic">
                          ⚠️ {result.note}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-slate-600 mb-6">
                  {result.message}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 btn-primary"
                >
                  Criar outra
                </button>
                {result.imageUrl && (
                  <a
                    href={result.imageUrl}
                    download="caricatura-inovacao.png"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Baixar imagem
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-500 text-sm">
          <p>Demonstração de IA aplicada à cultura de inovação</p>
          <p className="mt-1">Desenvolvido para Rendimento</p>
        </div>
      </div>
    </main>
  );
}
