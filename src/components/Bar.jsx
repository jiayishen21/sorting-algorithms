import { useEffect, useState } from "react"

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
	const [height, setHeight] = useState(20*number/max)
	const [width, setWidth] = useState(40/length)

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [screenHeight, setScreenHeight] = useState(window.innerHeight)

	useEffect(() => {
		if(screenHeight > 700) {
			setHeight(20*number/max)
		}
		else {
			setHeight(15*number/max)
		}
	}, [number, max, screenHeight])

	useEffect(() => {
		if (screenWidth > 1024) {
			setWidth(40/length)
		}
		else if(screenWidth > 600) {
			setWidth(25/length)
		}
		else {
			setWidth(15/length)
		}
	}, [length, screenWidth])


  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
			setScreenHeight(window.innerHeight)
    };

    window.addEventListener('resize', handleResize);

		setScreenWidth(window.innerWidth);
		setScreenHeight(window.innerHeight)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

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