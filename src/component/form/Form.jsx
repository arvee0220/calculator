import Display from "../display/Display";
import Keys from "../keys/Keys";
import { useCalculator } from "../../context/calculatorContext";

const Form = () => {
	const { resetHandler, deleteValue, valueHandler, computeValue } = useCalculator();

	const clickHandler = (label) => {
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
	};
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
