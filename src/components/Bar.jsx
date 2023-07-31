export const Bar = ({
	number,
	max,
	length,
	highlight,
	confirmed,
	currentElement,
	pivot,
	smaller,
	bigger,
}) => {
	const height = 20*number/max
	const width = 40/length

	return (
		<>
			<div className='bar-wrapper'>
				<span
					className={
						`bar ${highlight ? 'highlight' :
						confirmed ? 'confirmed' :
						currentElement || pivot ? 'currentElement' :
						smaller ? 'smaller' :
						bigger ? 'bigger' : ''
					}`}
					style={{
						height: `${height}rem`,
						width: `${width}rem`,
					}}
				>
				</span>

				<div>
					{
						currentElement ? `Selected: ${number}`:
						pivot ? `Pivot : ${number}`:
						number}
				</div>
			</div>
		</>
	)

}