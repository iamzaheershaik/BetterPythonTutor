// Code execution simulator that tracks variables and generates explanations
export const executeStep = (step, currentVariables, currentOutput) => {
  if (!step) {
    return {
      variables: currentVariables,
      output: currentOutput,
      explanation: "Ready to start execution!"
    };
  }

  const newVariables = { ...currentVariables };
  const newOutput = [...currentOutput];
  let explanation = "";

  try {
    switch (step.operation) {
      case 'assignment':
        explanation = executeAssignment(step, newVariables);
        break;
      case 'loop':
        explanation = executeLoop(step, newVariables);
        break;
      case 'condition':
        explanation = executeCondition(step, newVariables);
        break;
      case 'function_call':
        explanation = executeFunctionCall(step, newVariables, newOutput);
        break;
      case 'print':
        explanation = executePrint(step, newVariables, newOutput);
        break;
      case 'comparison':
        explanation = executeComparison(step, newVariables);
        break;
      default:
        explanation = executeGeneric(step, newVariables);
    }
  } catch (error) {
    explanation = `Error executing step: ${error.message}`;
  }

  return {
    variables: newVariables,
    output: newOutput,
    explanation: explanation
  };
};

const executeAssignment = (step, variables) => {
  if (step.variable && step.value) {
    const value = evaluateExpression(step.value, variables);
    variables[step.variable] = value;
    
    return `📝 Created variable '${step.variable}' and stored the value ${JSON.stringify(value)} in it. Think of it like putting a label on a box and putting something inside!`;
  }
  
  return "📝 A variable is being assigned a value.";
};

const executeLoop = (step, variables) => {
  if (step.loopVariable && step.loopIterable) {
    const iterable = evaluateExpression(step.loopIterable, variables);
    
    if (Array.isArray(iterable)) {
      return `🔄 Starting a loop! We'll go through each item in ${step.loopIterable} one by one. The current item will be stored in '${step.loopVariable}'. This is like going through a list and doing something with each item!`;
    } else if (typeof iterable === 'number') {
      return `🔄 Starting a counting loop! We'll count from 0 to ${iterable - 1}, and each number will be stored in '${step.loopVariable}'. It's like counting on your fingers!`;
    }
  }
  
  return "🔄 Starting a loop - we'll repeat some instructions multiple times!";
};

const executeCondition = (step, variables) => {
  return "🤔 The computer is making a decision! It's checking if something is true or false, then deciding which path to take. It's like asking 'Should I turn left or right?'";
};

const executeFunctionCall = (step, variables, output) => {
  if (step.function) {
    // Simulate some common functions
    if (step.function === 'print' || step.function === 'console' || step.function === 'cout') {
      return executePrint(step, variables, output);
    }
    
    return `📞 Calling function '${step.function}'! Functions are like mini-programs that do specific jobs. We're asking this function to do its work for us!`;
  }
  
  return "📞 Calling a function - asking another piece of code to do some work!";
};

const executePrint = (step, variables, output) => {
  // Extract what's being printed
  const printMatch = step.code.match(/print\s*\(\s*(.+)\s*\)|console\.log\s*\(\s*(.+)\s*\)|cout\s*<<\s*(.+)/);
  
  if (printMatch) {
    const content = printMatch[1] || printMatch[2] || printMatch[3];
    const value = evaluateExpression(content, variables);
    output.push(String(value));
    
    return `📺 Displaying '${value}' on the screen! This is how the computer shows us information. It's like the computer talking to us!`;
  }
  
  output.push("Output");
  return "📺 Showing something on the screen!";
};

const executeComparison = (step, variables) => {
  return "⚖️ Comparing two values! The computer is checking if one thing is bigger, smaller, or equal to another. It's like weighing things on a scale!";
};

const executeGeneric = (step, variables) => {
  return `💻 Executing: ${step.code}. The computer is following the instructions we wrote, step by step!`;
};

const evaluateExpression = (expression, variables) => {
  if (!expression) return undefined;
  
  // Remove quotes and clean up
  expression = expression.trim();
  
  // Handle string literals
  if (expression.startsWith('"') && expression.endsWith('"')) {
    return expression.slice(1, -1);
  }
  if (expression.startsWith("'") && expression.endsWith("'")) {
    return expression.slice(1, -1);
  }
  
  // Handle numbers
  if (/^\d+(\.\d+)?$/.test(expression)) {
    return parseFloat(expression);
  }
  
  // Handle booleans
  if (expression === 'true' || expression === 'True') return true;
  if (expression === 'false' || expression === 'False') return false;
  
  // Handle arrays/lists
  if (expression.startsWith('[') && expression.endsWith(']')) {
    try {
      const content = expression.slice(1, -1);
      if (content.trim() === '') return [];
      
      const items = content.split(',').map(item => {
        const trimmed = item.trim();
        return evaluateExpression(trimmed, variables);
      });
      return items;
    } catch (e) {
      return [];
    }
  }
  
  // Handle range() function
  if (expression.includes('range(')) {
    const rangeMatch = expression.match(/range\s*\(\s*(\d+)\s*\)/);
    if (rangeMatch) {
      const num = parseInt(rangeMatch[1]);
      return Array.from({ length: num }, (_, i) => i);
    }
    
    const rangeMatch2 = expression.match(/range\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (rangeMatch2) {
      const start = parseInt(rangeMatch2[1]);
      const end = parseInt(rangeMatch2[2]);
      return Array.from({ length: end - start }, (_, i) => start + i);
    }
  }
  
  // Handle len() function
  if (expression.includes('len(')) {
    const lenMatch = expression.match(/len\s*\(\s*(\w+)\s*\)/);
    if (lenMatch && variables[lenMatch[1]]) {
      const variable = variables[lenMatch[1]];
      if (Array.isArray(variable) || typeof variable === 'string') {
        return variable.length;
      }
    }
  }
  
  // Handle variable references
  if (/^\w+$/.test(expression) && variables[expression] !== undefined) {
    return variables[expression];
  }
  
  // Handle array indexing
  const indexMatch = expression.match(/(\w+)\[(\d+)\]/);
  if (indexMatch && variables[indexMatch[1]]) {
    const array = variables[indexMatch[1]];
    const index = parseInt(indexMatch[2]);
    if (Array.isArray(array) && index >= 0 && index < array.length) {
      return array[index];
    }
  }
  
  // Handle simple arithmetic
  if (expression.includes('+') || expression.includes('-') || expression.includes('*') || expression.includes('/')) {
    try {
      // Simple evaluation for basic arithmetic
      const result = evaluateArithmetic(expression, variables);
      if (result !== undefined) return result;
    } catch (e) {
      // Fall through to default
    }
  }
  
  // Default: return the expression as a string
  return expression;
};

const evaluateArithmetic = (expression, variables) => {
  // Replace variables with their values
  let processedExpression = expression;
  
  for (const [varName, value] of Object.entries(variables)) {
    if (typeof value === 'number') {
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      processedExpression = processedExpression.replace(regex, value.toString());
    }
  }
  
  // Simple arithmetic evaluation (be careful with eval in real applications)
  try {
    // Only allow basic arithmetic operations
    if (/^[\d\s+\-*/().]+$/.test(processedExpression)) {
      return Function(`"use strict"; return (${processedExpression})`)();
    }
  } catch (e) {
    return undefined;
  }
  
  return undefined;
};