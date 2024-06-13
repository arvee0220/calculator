import { useState, useContext, createContext } from "react";

const CalculatorContext = createContext();

export const useCalculator = () => {
	const context = useContext(CalculatorContext);
	if (!context) {
		throw new Error("useCalculator must be used within a CalculatorProvider");
	}
	return context;
};

export const CalculatorProvider = ({ children }) => {
	const [value, setValue] = useState("0");

	const valueHandler = (input) => {
		setValue((prev) => prev + input);
	};

	const resetHandler = () => {
		setValue(value);
	};

	const deleteValue = () => {
		setValue((prev) => prev.slice(0, -1));
	};

	const computeValue = () => {
		try {
			if (value) {
				const expression = eval(value.replace(/\^/g, "**"));

				setValue(expression.toString());
			}
		} catch (error) {
			setValue(error);
			console.log(error);
		}
	};

	const contextValue = { value, valueHandler, resetHandler, deleteValue, computeValue };

	return <CalculatorContext.Provider value={contextValue}>{children}</CalculatorContext.Provider>;
};
