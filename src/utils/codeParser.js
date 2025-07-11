// Universal code parser that converts code into execution steps
export const parseCode = async (code, language) => {
  const steps = [];
  const lines = code.split('\n').filter(line => line.trim() !== '');
  
  let lineNumber = 1;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip comments and empty lines
    if (isComment(trimmedLine, language) || trimmedLine === '') {
      lineNumber++;
      continue;
    }
    
    const step = {
      line: lineNumber,
      code: trimmedLine,
      operation: detectOperation(trimmedLine, language),
      language: language
    };
    
    // Add language-specific parsing
    switch (language) {
      case 'python':
        parsePythonLine(step, trimmedLine);
        break;
      case 'javascript':
        parseJavaScriptLine(step, trimmedLine);
        break;
      case 'cpp':
        parseCppLine(step, trimmedLine);
        break;
      case 'java':
        parseJavaLine(step, trimmedLine);
        break;
    }
    
    steps.push(step);
    lineNumber++;
  }
  
  return steps;
};

const isComment = (line, language) => {
  const commentPatterns = {
    python: /^\s*#/,
    javascript: /^\s*(\/\/|\/\*)/,
    cpp: /^\s*(\/\/|\/\*)/,
    java: /^\s*(\/\/|\/\*)/
  };
  
  return commentPatterns[language]?.test(line) || false;
};

const detectOperation = (line, language) => {
  // Assignment patterns
  if (line.includes('=') && !line.includes('==') && !line.includes('!=') && !line.includes('<=') && !line.includes('>=')) {
    return 'assignment';
  }
  
  // Loop patterns
  if (line.includes('for') || line.includes('while')) {
    return 'loop';
  }
  
  // Condition patterns
  if (line.includes('if') || line.includes('else')) {
    return 'condition';
  }
  
  // Function call patterns
  if (line.includes('(') && line.includes(')')) {
    return 'function_call';
  }
  
  // Print/output patterns
  const printPatterns = {
    python: /print\s*\(/,
    javascript: /console\.(log|info|warn|error)/,
    cpp: /cout\s*<</,
    java: /System\.out\.(print|println)/
  };
  
  if (printPatterns[language]?.test(line)) {
    return 'print';
  }
  
  // Comparison patterns
  if (line.includes('==') || line.includes('!=') || line.includes('<') || line.includes('>')) {
    return 'comparison';
  }
  
  return 'execution';
};

const parsePythonLine = (step, line) => {
  // Extract variable assignments
  const assignmentMatch = line.match(/(\w+)\s*=\s*(.+)/);
  if (assignmentMatch) {
    step.variable = assignmentMatch[1];
    step.value = assignmentMatch[2];
  }
  
  // Extract function calls
  const functionMatch = line.match(/(\w+)\s*\(/);
  if (functionMatch) {
    step.function = functionMatch[1];
  }
  
  // Extract loop information
  if (line.includes('for')) {
    const forMatch = line.match(/for\s+(\w+)\s+in\s+(.+):/);
    if (forMatch) {
      step.loopVariable = forMatch[1];
      step.loopIterable = forMatch[2];
    }
  }
};

const parseJavaScriptLine = (step, line) => {
  // Extract variable declarations
  const varMatch = line.match(/(let|const|var)\s+(\w+)\s*=\s*(.+)/);
  if (varMatch) {
    step.declarationType = varMatch[1];
    step.variable = varMatch[2];
    step.value = varMatch[3];
  }
  
  // Extract function calls
  const functionMatch = line.match(/(\w+)\s*\(/);
  if (functionMatch) {
    step.function = functionMatch[1];
  }
};

const parseCppLine = (step, line) => {
  // Extract variable declarations
  const varMatch = line.match(/(int|float|double|char|string|bool)\s+(\w+)\s*=\s*(.+)/);
  if (varMatch) {
    step.dataType = varMatch[1];
    step.variable = varMatch[2];
    step.value = varMatch[3];
  }
  
  // Extract function calls
  const functionMatch = line.match(/(\w+)\s*\(/);
  if (functionMatch) {
    step.function = functionMatch[1];
  }
};

const parseJavaLine = (step, line) => {
  // Extract variable declarations
  const varMatch = line.match(/(int|float|double|char|String|boolean)\s+(\w+)\s*=\s*(.+)/);
  if (varMatch) {
    step.dataType = varMatch[1];
    step.variable = varMatch[2];
    step.value = varMatch[3];
  }
  
  // Extract function calls
  const functionMatch = line.match(/(\w+)\s*\(/);
  if (functionMatch) {
    step.function = functionMatch[1];
  }
};