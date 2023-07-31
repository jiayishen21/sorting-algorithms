import { Bar } from "./Bar"

export const QuickSortVisualArray = ({
  arr,
  comparingIndex,
  confirmedIndices,
  pivotIndex,
  smallerIndices,
  biggerIndices,
}) => {
	const max = Math.max(...arr)

	return (
		<>
		 <div className="visual-array">
				{arr.map((number, index) => (
					<Bar
						key={index}
						number={number}
						max={max}
						highlight={comparingIndex === index}
						confirmed={confirmedIndices.includes(index)}
						pivot={pivotIndex === index}
            smaller={smallerIndices.includes(index)}
            bigger={biggerIndices.includes(index)}
						length={arr.length}
					/>
				))}
		 </div>
		</>
	)
}
