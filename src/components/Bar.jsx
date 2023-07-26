

export const Bar = ({number, max, length, highlight, confirmed, currentElement}) => {
	const height = 20*number/max
	const width = 40/length

	return (
		<>
			<div className='bar-wrapper'>
				<span
					className={
						`bar ${highlight ? 'highlight' :
						confirmed ? 'confirmed' :
						currentElement ? 'currentElement' : ''}`}
					style={{
						height: `${height}rem`,
						width: `${width}rem`,
					}}
				>
				</span>

				<div>
					{currentElement ? `Selected: ${number}`: number}
				</div>
			</div>
		</>
	)

}