import { Bar } from "./Bar"

export const VisualArray = ({arr, comparingIndices, confirmedIndices, currentElement}) => {
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
						currentElement={false}
						length={arr.length}
					/>
				))}
				{currentElement !== undefined ? (
					<Bar
						number={currentElement}
						max={max}
						highlight={comparingIndices.includes(-1)}
						confirmed={false}
						currentElement={!comparingIndices.includes(-1)}
						length={arr.length}
					/>) : <></>
				}
		 </div>
		</>
	)
}