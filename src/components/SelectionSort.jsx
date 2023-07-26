import { useState, useEffect } from 'react'
import { VisualArray } from './VisualArray';
import { toast } from 'react-toastify';

export const SelectionSort = () => {
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
		if(event.target.value.length < 3 &&
      event.target.value[1] !== '.' &&
      event.target.value[0] !== '-') {
			setRandomLength(event.target.value)
		}
  }

	const handleCustomChange = (event) => {
		setCustom(event.target.value)
  }

	const onClickGenerate = async() => {
		const number = parseInt(randomLength)
		if(isNaN(number) || number < 3) {
			toast.error('Length must be at least 3.')
			return
		}
		if(number > 25) {
			toast.error('Length must be 25 or lower.')
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
			toast.error('Length must be at least 3.')
			return
		}
		if(newCustom.length > 25) {
			toast.error('Length must be 25 or lower.')
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
	const [sorting, setSorting] = useState(false)
	const [codePosition, setCodePosition] = useState(0)

	const delay = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const onStop = async () => {
		setSorting(false)
		await delay(50)
		setComparingIndices([])
		setConfirmedIndices([])
		setCodePosition(0)
	}

	// v4
	const [minIndex, setMinIndex] = useState(0)
	const [i, setI] = useState(0)
	const [j, setJ] = useState(0)
	const [smallCompare, setSmallCompare] = useState(false)
	const [comparing, setComparing] = useState(false)
	const [swapping, setSwapping] = useState(false)

	const onClickSort = () => {
		if(!sorting) {
			setMinIndex(0)
			setI(0)
			setJ(0)
			setSmallCompare(false)
			setComparing(false)
			setSwapping(false)
			setComparingIndices([])
			setConfirmedIndices([])
			setSorting(true)
		}
	}

	useEffect(() => {
		(async () => {
			if (!sorting) {
				return;
			}
			if(timer > 0) {
				decreaseTimer()
				return
			}
			if (i >= arr.length - 1) {
				await onStop();
				toast.success('Array sorted.')
				return;
			}

			if(smallCompare) {
				if (arr[j] < arr[minIndex]) {
					setMinIndex(j)
				}
				setJ(j + 1)
				setSmallCompare(false)
				return
			}

			if(comparing) {
				setComparing(false)
				
				if (minIndex !== i) {
					setSwapping(true)
				}
				else {
					const newConfirmedIndices = [...confirmedIndices]
					newConfirmedIndices.push(i)
					setConfirmedIndices(newConfirmedIndices)
					setMinIndex(i + 1)
					setJ(i + 2)
					setI(i + 1)
				}	
				return
			}

			if (j >= arr.length) {	
				setCodePosition(2)
				setComparingIndices([i, minIndex])
				setComparing(true)
				setTimer(waitTime)
				return
			}

			setCodePosition(1);
			setComparingIndices([j, minIndex])
			setSmallCompare(true)	
			setTimer(waitTime)	
		})()
	}, [sorting, i, j, timer]);

	// Swap
	useEffect(() => {
		if(swapping && sorting && arr[i] > arr[minIndex]) {
			setCodePosition(2)
			const newArr = [...arr]
			const temp = newArr[i]
			newArr[i] = newArr[minIndex]
			newArr[minIndex] = temp
			setArr(newArr)

			const newConfirmedIndices = [...confirmedIndices]
			newConfirmedIndices.push(i)
			setConfirmedIndices(newConfirmedIndices)
			setMinIndex(i + 1)
			setJ(i + 2)
			setI(i + 1)
			setSwapping(false)
		}
		else if(!sorting) {
			setCodePosition(0)
			setComparingIndices([])
			setConfirmedIndices([])
		}
		else if(swapping) {
			setSwapping(false)
		}
	}, [swapping, sorting])

	return (
		<>
			<div className='page'>
				<VisualArray arr={arr} comparingIndices={comparingIndices} confirmedIndices={confirmedIndices} />
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
					{`for (let i = 0; i < arr.length - 1; i++) {`} <br/>
					&nbsp;&nbsp;{`let minIndex = i`}	<br/>
					<br/>
					&nbsp;&nbsp;{`for (let j = i + 1; j < arr.length; j++) {`}	<br/>
					<div className={codePosition === 1 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;&nbsp;&nbsp;{`if (arr[j] < arr[minIndex]) {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`minIndex = j`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`}`}	<br/>
					</div>
					<br />
					<div className={codePosition === 2 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;&nbsp;&nbsp;{`if (minIndex !== i) {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`let temp = arr[i]`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`arr[i] = arr[minIndex]`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`arr[minIndex] = temp`}	<br/>
					</div>
					&nbsp;&nbsp;&nbsp;&nbsp;{`}`}	<br/>
					&nbsp;&nbsp;{`}`}	<br/>
					{`}`}
				</code>

			</div>
		</>
	)

}

