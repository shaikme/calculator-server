const operations = {
	'+' : {
		priority: 1,
		action: (a, b) => Number(a) + Number(b),
	},
	'-' : {
		priority: 1,
		action: (a, b) => a - b,
	},
	'*' : {
		priority: 2,
		action: (a, b) => a * b,
	},
	'/' : {
		priority: 2,
		action: (a, b) => a / b,
	}
};

const parseAndCalculate = (string, operandStack = [], operatorStack = []) => {
	const currentSymbol = string[0];
	let nextString;

	if (isNumeric(currentSymbol)) {
		const operand = string.match(/\d+(\.\d+)?/)[0];
		nextString = string.slice(operand.length);

		operandStack.push(operand);
	} else {
		if (/[-+/*()]/.test(currentSymbol)) {
			nextString = string.slice(1);

			if (currentSymbol === ')') {
				calculateBrackets(operandStack, operatorStack)
			} else {
				checkPriorityAndCalculate(currentSymbol, operandStack, operatorStack);
			}

		} else {
			throw new Error(`unsupported operator ${currentSymbol}`);
		}
	}

	return nextString.length > 0
		? parseAndCalculate(nextString, operandStack, operatorStack)
		: clearStack(operandStack, operatorStack);
};

const checkPriorityAndCalculate = (currentOperator, operandStack, operatorStack) => {
	const lastOperator = operatorStack[operatorStack.length - 1];

	if (!lastOperator || lastOperator === '(' || currentOperator === '('
        || operations[currentOperator].priority > operations[lastOperator].priority) return operatorStack.push(currentOperator);

	calculateOperation(operandStack, operatorStack);

	checkPriorityAndCalculate(currentOperator, operandStack, operatorStack)
}

const calculateBrackets = (operandStack, operatorStack) => {
	let lastOperator = operatorStack[operatorStack.length - 1];

	while (lastOperator !== '(') {
		if (!operatorStack.length) throw new Error('incorrect sequence of brackets');

		calculateOperation(operandStack, operatorStack)
		lastOperator = operatorStack.pop();
	}
};

const calculateOperation = (operandStack, operatorStack) => {
	const secondOperand = operandStack.pop();
	const firstOperand = operandStack.pop();
	const operator = operatorStack.pop();

	if (operator === '(') throw new Error('incorrect sequence of brackets');
    if (typeof firstOperand === 'undefined'
        || typeof secondOperand === 'undefined') throw new Error('invalid expression');

	const result = operations[operator].action(firstOperand, secondOperand);
	operandStack.push(result);
};

const clearStack = (operandStack, operatorStack) => {
	while (operatorStack.length > 0) {
		calculateOperation(operandStack, operatorStack)
	}
	return operandStack.pop();
};

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const isInt = (n) => Number(n) === n && n % 1 === 0;

module.exports = (str) => {
	const trimmedString = str.replace(/\s/g, '');

	const result = parseAndCalculate(trimmedString);

	if (isInt(result)) return result;

	return Number(parseFloat(result).toFixed(3));
}