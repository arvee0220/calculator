import { useCalculator } from "../../context/calculatorContext";
import "./Display.styles.scss";

const Display = () => {
	const { value } = useCalculator();

	return (
		<div className="display">
			<input type="text" value={value} readOnly />
		</div>
	);
};

export default Display;
