import { useEffect, useRef } from "react";
import { useCalculator } from "../../context/calculatorContext";
import "./Display.styles.scss";

const Display = () => {
	const { value } = useCalculator();
	const inputRef = useRef(null);

	useEffect(() => {
		const input = inputRef.current;
		const maxSize = 40; // Maximum font size
		const minSize = 10; // Minimum font size

		const adjustFontSize = () => {
			if (!input) return;

			const { scrollWidth, clientWidth } = input;
			const ratio = clientWidth / scrollWidth;

			// Adjust font size based on the ratio
			const newSize = Math.min(
				maxSize,
				Math.max(minSize, ratio * parseInt(window.getComputedStyle(input).fontSize))
			);
			input.style.fontSize = newSize + "px";
		};

		// Call adjustFontSize when the value changes or the window resizes
		window.addEventListener("resize", adjustFontSize);
		adjustFontSize();

		return () => {
			window.removeEventListener("resize", adjustFontSize);
		};
	}, [value]);

	return (
		<div className="display">
			<input ref={inputRef} type="text" value={value} readOnly />
		</div>
	);
};

export default Display;
