import { useState, useContext, createContext } from "react";

const CalculatorContext = createContext();

const INITIAL_VALUE = "0";

const isNumericInput = (input) => {
	return !isNaN(parseFloat(input)) && isFinite(input);
};

const isMathematicalSymbol = (char) => {
	// eslint-disable-next-line no-useless-escape
	const regEx = /[+\-*\/]/;
	return regEx.test(char);
};

export const useCalculator = () => {
	const context = useContext(CalculatorContext);
	if (!context) {
		throw new Error("useCalculator must be used within a CalculatorProvider");
	}
	return context;
};

export const CalculatorProvider = ({ children }) => {
	const [value, setValue] = useState(INITIAL_VALUE);
	const [computed, setComputed] = useState(false);

	/* const valueHandler = (input) => {
		if (computed) {
			if (isNumericInput(input)) {
				setValue(input);
				setComputed(false);
			} else {
				setValue((prev) => prev + input);
				setComputed(false);
			}
		} else {
			if (value === INITIAL_VALUE) {
				setValue(input);
			} else {
				setValue((prev) => prev + input);
			}
		}
	}; */

	const valueHandler = (input) => {
		const lastChar = value[value.length - 1];

		switch (true) {
			case computed && isNumericInput(input):
				setComputed(false);

				setValue(input);

				break;

			case computed && !isNumericInput(input):
				setComputed(false);

				setValue((prev) => {
					if (isMathematicalSymbol(lastChar)) {
						return prev.slice(0, -1) + input;
					} else {
						return prev + input;
					}
				});

				break;

			case value === INITIAL_VALUE && !isNumericInput(input):
				break;

			case value === INITIAL_VALUE && computed === true && !isNumericInput(input):
				break;

			case value === INITIAL_VALUE && isNumericInput(input):
				setValue(input);

				break;
			default:
				setValue((prev) => prev + input);

				break;
		}
	};

	const resetHandler = () => {
		setValue(INITIAL_VALUE);
		setComputed(false);
	};

	const deleteValue = () => {
		if (value.length === 1 || computed) {
			setValue(INITIAL_VALUE);
			setComputed(false);
		} else {
			setValue((prev) => prev.slice(0, -1));
		}
	};

	const computeValue = () => {
		try {
			if (value) {
				const expression = eval(value.replace(/\^/g, "**"));

				setValue(expression.toString());
				setComputed(true);
			}
		} catch (error) {
			setValue(error);
			console.log(error);
		}
	};

	const contextValue = { value, valueHandler, resetHandler, deleteValue, computeValue };

	return <CalculatorContext.Provider value={contextValue}>{children}</CalculatorContext.Provider>;
};
