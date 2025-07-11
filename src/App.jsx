import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Code, Lightbulb, Zap } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import VisualizationCanvas from './components/VisualizationCanvas';
import StepController from './components/StepController';
import LanguageSelector from './components/LanguageSelector';
import ExplanationPanel from './components/ExplanationPanel';
import VariableTracker from './components/VariableTracker';
import FlowDiagram from './components/FlowDiagram';
import { parseCode } from './utils/codeParser';
import { executeStep } from './utils/codeExecutor';
import './App.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [variables, setVariables] = useState({});
  const [output, setOutput] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);

  const defaultCodes = {
    python: `# Simple Python Example - Finding the largest number
numbers = [5, 2, 8, 1, 9, 3]
largest = numbers[0]

print("Starting with first number:", largest)

for i in range(1, len(numbers)):
    current = numbers[i]
    print(f"Checking number: {current}")
    
    if current > largest:
        largest = current
        print(f"New largest found: {largest}")
    else:
        print(f"{current} is not larger than {largest}")

print("The largest number is:", largest)`,
    
    javascript: `// JavaScript Example - Bubble Sort Animation
let numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);

for (let i = 0; i < numbers.length - 1; i++) {
    console.log(\`Pass \${i + 1}:\`);
    
    for (let j = 0; j < numbers.length - i - 1; j++) {
        console.log(\`Comparing \${numbers[j]} and \${numbers[j + 1]}\`);
        
        if (numbers[j] > numbers[j + 1]) {
            // Swap elements
            let temp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = temp;
            console.log(\`Swapped! Array now: [\${numbers.join(', ')}]\`);
        }
    }
}

console.log("Sorted array:", numbers);`,
    
    cpp: `// C++ Example - Factorial Calculation
#include <iostream>
using namespace std;

int factorial(int n) {
    cout << "Calculating factorial of " << n << endl;
    
    if (n <= 1) {
        cout << "Base case reached: " << n << "! = 1" << endl;
        return 1;
    }
    
    cout << "Recursive call: " << n << " * factorial(" << (n-1) << ")" << endl;
    int result = n * factorial(n - 1);
    cout << "Returning: " << n << " * " << (result/n) << " = " << result << endl;
    
    return result;
}

int main() {
    int number = 5;
    cout << "Computing " << number << "!" << endl;
    
    int result = factorial(number);
    
    cout << "Final result: " << number << "! = " << result << endl;
    return 0;
}`,
    
    java: `// Java Example - Binary Search
public class BinarySearch {
    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 45, 67, 78};
        int target = 23;
        
        System.out.println("Searching for " + target + " in array:");
        printArray(arr);
        
        int result = binarySearch(arr, target, 0, arr.length - 1);
        
        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found");
        }
    }
    
    static int binarySearch(int[] arr, int target, int left, int right) {
        if (left <= right) {
            int mid = left + (right - left) / 2;
            System.out.println("Checking middle element at index " + mid + ": " + arr[mid]);
            
            if (arr[mid] == target) {
                System.out.println("Found target!");
                return mid;
            }
            
            if (arr[mid] > target) {
                System.out.println("Target is smaller, searching left half");
                return binarySearch(arr, target, left, mid - 1);
            }
            
            System.out.println("Target is larger, searching right half");
            return binarySearch(arr, target, mid + 1, right);
        }
        
        return -1;
    }
    
    static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
}`
  };

  useEffect(() => {
    setCode(defaultCodes[selectedLanguage]);
  }, [selectedLanguage]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCurrentStep(0);
    setExecutionSteps([]);
    setVariables({});
    setOutput([]);
    setIsPlaying(false);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setCurrentStep(0);
    setExecutionSteps([]);
    setVariables({});
    setOutput([]);
    setIsPlaying(false);
  };

  const parseAndExecute = async () => {
    setIsLoading(true);
    try {
      const steps = await parseCode(code, selectedLanguage);
      setExecutionSteps(steps);
      setCurrentStep(0);
      setVariables({});
      setOutput([]);
    } catch (error) {
      console.error('Error parsing code:', error);
    }
    setIsLoading(false);
  };

  const executeCurrentStep = () => {
    if (currentStep < executionSteps.length) {
      const step = executionSteps[currentStep];
      const result = executeStep(step, variables, output);
      
      setVariables(result.variables);
      setOutput(result.output);
      setExplanation(result.explanation);
    }
  };

  useEffect(() => {
    executeCurrentStep();
  }, [currentStep, executionSteps]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < executionSteps.length) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= executionSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, executionSteps.length, playbackSpeed]);

  const togglePlayback = () => {
    if (executionSteps.length === 0) {
      parseAndExecute();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const resetExecution = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setVariables({});
    setOutput([]);
    setExplanation('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <motion.header 
        className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Universal Code Visualizer
              </h1>
              <p className="text-sm text-gray-300">Learn programming through interactive animations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <motion.button
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Code Editor */}
        <motion.div
          className="space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold">Code Editor</h2>
              </div>
              <motion.button
                onClick={parseAndExecute}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                <Lightbulb className="w-4 h-4" />
                <span>{isLoading ? 'Analyzing...' : 'Analyze Code'}</span>
              </motion.button>
            </div>
            <CodeEditor
              code={code}
              language={selectedLanguage}
              onChange={handleCodeChange}
              currentLine={executionSteps[currentStep]?.line}
            />
          </div>

          <StepController
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={executionSteps.length}
            onTogglePlayback={togglePlayback}
            onReset={resetExecution}
            onStepChange={setCurrentStep}
            playbackSpeed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
          />

          <VariableTracker variables={variables} />
        </motion.div>

        {/* Right Panel - Visualization */}
        <motion.div
          className="space-y-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <VisualizationCanvas
            step={executionSteps[currentStep]}
            variables={variables}
            output={output}
            language={selectedLanguage}
          />

          <FlowDiagram
            steps={executionSteps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />

          <ExplanationPanel
            explanation={explanation}
            step={executionSteps[currentStep]}
            language={selectedLanguage}
          />
        </motion.div>
      </div>

      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;