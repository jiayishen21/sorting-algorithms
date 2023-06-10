

export const Bar = ({number, max, length, highlight, confirmed}) => {
	const height = 20*number/max
	const width = 40/length

	return (
		<>
			<div className='bar-wrapper'>
				<span
					className={`bar ${highlight ? 'highlight' : confirmed ? 'confirmed' : ''}`}
					style={{
						height: `${height}rem`,
						width: `${width}rem`,
					}}
				>
				</span>

				<div>
					{number}
				</div>
			</div>
		</>
	)

}