import { Bar } from "./Bar"

export const VisualArray = ({arr, comparingIndices, confirmedIndices}) => {
	const max = Math.max(...arr)

	return (
		<>
		 <div className="visual-array">
				{arr.map((number, index) => (
					<Bar
						key={index}
						number={number}
						max={max}
						highlight={comparingIndices.includes(index)}
						confirmed={confirmedIndices.includes(index)}
						length={arr.length}
					/>
				))}
		 </div>
		</>
	)
}