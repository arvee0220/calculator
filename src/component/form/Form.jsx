import Display from "../display/Display";
import Keys from "../keys/Keys";
import { useCalculator } from "../../context/calculatorContext";
import { useEffect, useCallback } from "react";

const Form = () => {
	const { resetHandler, deleteValue, valueHandler, computeValue } = useCalculator();

	const clickHandler = useCallback(
		(label) => {
			switch (label) {
				case "AC":
					resetHandler();
					break;
				case "DE":
					deleteValue();
					break;
				case "=":
					computeValue();
					break;
				default:
					valueHandler(label);
			}
		},
		[resetHandler, deleteValue, computeValue, valueHandler]
	);

	const keyHandler = useCallback(
		(event) => {
			const { key, keyCode, shiftKey } = event;
			const allowedKeys = {
				0: "0",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				".": ".",
				"/": "/",
				"*": "*",
				"+": "+",
				"-": "-",
				Enter: "=",
				"=": "=",
				Backspace: "DE",
				Escape: "AC",
			};

			if ((key === "^" && shiftKey) || keyCode === 94) {
				clickHandler("^");
			} else if (allowedKeys[key]) {
				clickHandler(allowedKeys[key]);
			}
		},
		[clickHandler]
	);

	useEffect(() => {
		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
	}, [keyHandler]);

	return (
		<form>
			<Display />
			<Keys labels={["AC", "DE", ".", "/"]} onClick={clickHandler} />
			<Keys labels={["7", "8", "9", "*"]} onClick={clickHandler} />
			<Keys labels={["4", "5", "6", "+"]} onClick={clickHandler} />
			<Keys labels={["1", "2", "3", "-"]} onClick={clickHandler} />
			<Keys labels={["00", "0", "^", "="]} onClick={clickHandler} />
		</form>
	);
};

export default Form;
