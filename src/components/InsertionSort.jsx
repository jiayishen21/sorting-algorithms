import { useState, useEffect } from 'react'
import { VisualArray } from './VisualArray';
import { toast } from 'react-toastify';

export const InsertionSort = () => {
	const baseWaitTime = 500
	const [arr, setArr] = useState([1, 2, 3, 4])
	const [randomLength, setRandomLength] = useState("10")
	const [custom, setCustom] = useState("4, 3, 2, 1")
	const [speed, setSpeed] = useState(1);
	const [waitTime, setWaitTime] = useState(baseWaitTime)

	const randomArray = (length) => {
		const newArr = []
		for (let i = 0; i < length; i++) {
			const randomNumber = Math.floor(Math.random() * length) + 1
			newArr.push(randomNumber)
		}
		return newArr
	}

	const handleRandomLengthChange = (event) => {
		if(event.target.value.length < 3) {
			setRandomLength(event.target.value)
		}
  }

	const handleCustomChange = (event) => {
		setCustom(event.target.value)
  }

	const onClickGenerate = async() => {
		const number = parseInt(randomLength)
		if(isNaN(number) || number < 3) {
			toast.error('Array length must be at least 3.')
			return
		}
		if(number > 25) {
			toast.error('Array length must be 25 or lower.')
			return
		}
		await onStop()
		document.activeElement.blur()
		setArr(randomArray(number))
	}

	const onClickCustom = async() => {
		const values = custom.split(",").map((item) => item.trim());	
		const newCustom = values.map((value) => Number(value));
		if(!newCustom.every((value) => Number.isInteger(value))) {
			toast.error('Invalid input array. Must only input positive integers for display purposes.')
			return
		}
		if(!newCustom.every((value) => value > 0)) {
			toast.error('Invalid input array. Must only input positive integers for display purposes.')
			return
		}
		if(newCustom.length < 3) {
			toast.error('Array length must be at least 3.')
			return
		}
		if(newCustom.length > 25) {
			toast.error('Array length must be 25 or lower.')
			return
		}
		await onStop()
		document.activeElement.blur()
		setArr(newCustom)
	}

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSpeed(value);
  };

	useEffect(() => {
		setArr(randomArray(10))
	}, [])

	useEffect(() => {
		setWaitTime(baseWaitTime/speed)
	}, [speed])

	const decreaseTimer = async() => {
		if(timer > 0) {
			await delay(10)
			setTimer(timer - 10)
		}
	}

	const [timer, setTimer] = useState(0)

	const [comparingIndices, setComparingIndices] = useState([]);
	const [confirmedIndices, setConfirmedIndices] = useState([]);
	const [currentElement, setCurrentElement] = useState(undefined)
	const [sorting, setSorting] = useState(false)
	const [codePosition, setCodePosition] = useState(0)

	const delay = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const onStop = async () => {
		setSorting(false)
		await delay(50)
		setI(0)
		setJ(0)
		setCurrentElement(undefined)
		setComparingIndices([])
		setConfirmedIndices([])
		setCodePosition(0)
	}

	// v4
	const [i, setI] = useState(0)
	const [j, setJ] = useState(0)
	const [changeCurrent, setChangeCurrent] = useState(false)
	const [swapping, setSwapping] = useState(false)
	const [bigSwap, setBigSwap] = useState(false)

	const onClickSort = () => {
		if(!sorting) {
			setI(1)
			setJ(0)
			setCurrentElement(undefined)
			setChangeCurrent(false)
			setSwapping(false)
			setBigSwap(false)
			setComparingIndices([])
			setConfirmedIndices([0])
			setSorting(true)
		}
	}

	
	useEffect(() => {
		(async () => {
			if (!sorting) {
				return
			}
			if(timer > 0) {
				decreaseTimer()
				return
			}
			if(i >= arr.length) {
				await onStop();
				toast.success('Array sorted.')
				return;
			}
			if(swapping) {	
				setTimer(waitTime)
				const newArr = [...arr]
				newArr[j + 1] = arr[j]
				setArr(newArr)
				setSwapping(false)
				setJ(j - 1)
				return
			}
			if(bigSwap) {
				setTimer(waitTime)
				const newArr = [...arr]
				setBigSwap(false)
				newArr[j + 1] = currentElement
				setArr(newArr)
				const newConfirmedIndices = [...confirmedIndices]
				newConfirmedIndices.push(i)
				setConfirmedIndices(newConfirmedIndices)
				setComparingIndices([])
				setChangeCurrent(true)
				return
			}
			if(changeCurrent) {
				setTimer(waitTime)
				setChangeCurrent(false)
				if(!currentElement) {
					setComparingIndices([])
					setCurrentElement(arr[i])
				}
				else {
					setCurrentElement(undefined)
					setI(i + 1)
				}
				return
			}
			if(currentElement === undefined) {
				setTimer(waitTime)
				setCodePosition(1)
				setComparingIndices([i])
				setChangeCurrent(true)
				setJ(i - 1)
				return
			}
			if(j >= 0 && arr[j] > currentElement) {
				setTimer(waitTime)
				setCodePosition(2)
				setComparingIndices([j, j + 1])
				setSwapping(true)
				return
			}
			else {
				setTimer(waitTime)
				setCodePosition(3)
				setComparingIndices([j + 1, -1])
				setBigSwap(true)
				return
			}
		})()
	}, [sorting, i, timer]);
	
	return (
		<>
			<div className='page'>
				<VisualArray
					arr={arr}
					comparingIndices={comparingIndices}
					confirmedIndices={confirmedIndices}
					currentElement={currentElement}
				/>
				<div className='random'>
					Random array of length
					<input type="text" value={randomLength} onChange={handleRandomLengthChange} />
					<button onClick={onClickGenerate}>Go</button>
				</div>
				<div className="custom">
					arr =
					<input type="text" value={custom} onChange={handleCustomChange} />
					<button onClick={onClickCustom}>Go</button>
				</div>

				<div className='slider'>
					<input
						type="range"
						min="1"
						max="5"
						value={speed}
						onChange={handleSliderChange}
					/>
					<span>{speed}x speed</span>
				</div>

				<div className="btns">
					<button onClick={onClickSort}>Sort</button>
					<button onClick={onStop}>Stop</button>
				</div>

				<code>
					{`for (let i = 0; i < arr.length; i++) {`} <br/>
					<div className={codePosition === 1 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;{`let currentElement = arr[i]`}	<br/>
						&nbsp;&nbsp;{`let j = i - 1`}	<br/>
					</div>
					<br/>
					<div className={codePosition === 2 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;{`while (j >= 0 && arr[j] > currentElement)`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`arr[j + 1] = arr[j]`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`j --`}	<br/>
						&nbsp;&nbsp;{`}`}	<br/>
					</div>
					<br />
					<div className={codePosition === 3 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;&nbsp;&nbsp;{`arr[j + 1] = currentElement`}	<br/>
					</div>
					&nbsp;&nbsp;{`}`}	<br/>
					{`}`}
				</code>

			</div>
		</>
	)

}


