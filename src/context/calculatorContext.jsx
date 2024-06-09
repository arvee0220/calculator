import { useState, useContext, createContext } from "react";

export const CalculatorContext = createContext();

export const useCalculator = () => {
	const context = useContext(CalculatorContext);
	if (!context) {
		throw new Error("useCalculator must be used within a CalculatorProvider");
	}
	return context;
};

export const CalculatorProvider = ({ children }) => {
	const [value, setValue] = useState("");

	const valueHandler = (input) => {
		setValue((prev) => prev + input);
	};

	const resetHandler = () => {
		setValue("");
	};

	const deleteValue = () => {
		setValue((prev) => prev.slice(0, -1));
	};

	const computeValue = () => {
		try {
			const expression = value.replace(/\^/g, "**");

			setValue(eval(expression));
		} catch (error) {
			console.log(error);
		}
	};

	const contextValue = { value, valueHandler, resetHandler, deleteValue, computeValue };

	return <CalculatorContext.Provider value={contextValue}>{children}</CalculatorContext.Provider>;
};
