import "./Keys.styles.scss";

const Keys = ({ labels, onClick }) => {
	return (
		<>
			<div>
				{labels.map((label, index) => (
					<input key={index} type="button" value={label} onClick={() => onClick(label)} />
				))}
			</div>
		</>
	);
};

export default Keys;
