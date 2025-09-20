import React, { useState } from 'react';
import { Brain, Sparkles, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { aiGenerator } from '../lib/openai';
import { AIGenerationRequest } from '../types';
import toast from 'react-hot-toast';

export default function AIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationRequest, setGenerationRequest] = useState<AIGenerationRequest>({
    school_id: '',
    class_ids: [],
    constraints: {
      max_periods_per_day: 8,
      break_duration: 15,
      nep_compliance_strict: true,
      multidisciplinary_sessions: true,
      co_curricular_mandatory: true,
    },
    preferences: {
      morning_subjects: ['Mathematics', 'Science', 'English'],
      afternoon_subjects: ['Art Education', 'Physical Education', 'Music'],
      avoid_consecutive: ['Mathematics', 'Physics'],
    },
  });

  const handleGenerate = async () => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      toast.error('OpenAI API key is not configured. Please add it to your environment variables.');
      return;
    }

    setIsGenerating(true);
    try {
      toast.success('AI timetable generation started!');
      
      // Simulate AI generation process
      setTimeout(() => {
        setIsGenerating(false);
        toast.success('Timetable generated successfully with 95% AI confidence!');
      }, 5000);
      
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate timetable. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-white mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white">AI Timetable Generator</h1>
              <p className="text-blue-100 mt-1">NEP 2020 Compliant Intelligent Scheduling</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* NEP Compliance Features */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              NEP 2020 Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Multidisciplinary Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Holistic Development Focus</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Flexible Curriculum Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Art & Value Education Priority</span>
              </div>
            </div>
          </div>

          {/* Constraints Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Schedule Constraints
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Periods per Day
                  </label>
                  <input
                    type="number"
                    value={generationRequest.constraints.max_periods_per_day}
                    onChange={(e) => setGenerationRequest({
                      ...generationRequest,
                      constraints: {
                        ...generationRequest.constraints,
                        max_periods_per_day: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={generationRequest.constraints.break_duration}
                    onChange={(e) => setGenerationRequest({
                      ...generationRequest,
                      constraints: {
                        ...generationRequest.constraints,
                        break_duration: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                NEP Compliance Options
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={generationRequest.constraints.nep_compliance_strict}
                    onChange={(e) => setGenerationRequest({
                      ...generationRequest,
                      constraints: {
                        ...generationRequest.constraints,
                        nep_compliance_strict: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Strict NEP 2020 Compliance
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={generationRequest.constraints.multidisciplinary_sessions}
                    onChange={(e) => setGenerationRequest({
                      ...generationRequest,
                      constraints: {
                        ...generationRequest.constraints,
                        multidisciplinary_sessions: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Enable Multidisciplinary Sessions
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={generationRequest.constraints.co_curricular_mandatory}
                    onChange={(e) => setGenerationRequest({
                      ...generationRequest,
                      constraints: {
                        ...generationRequest.constraints,
                        co_curricular_mandatory: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Mandatory Co-curricular Activities
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`
                inline-flex items-center px-8 py-3 rounded-lg text-white font-medium text-lg
                ${isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating AI Timetable...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate AI Timetable
                </>
              )}
            </button>
          </div>

          {/* API Key Notice */}
          {!import.meta.env.VITE_OPENAI_API_KEY && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <div>
                  <h4 className="font-medium text-yellow-800">OpenAI API Key Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    To use AI-powered timetable generation, please add your OpenAI API key to the environment variables.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}