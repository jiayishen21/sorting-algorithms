import { useState, useEffect } from 'react'
import { QuickSortVisualArray } from './QuickSortVisualArray';
import { toast } from 'react-toastify';

export const RandomQuickSort = () => {
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
	}

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

	const delay = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const onStop = async () => {
		setSorting(false)
		await delay(50)
		setTimer(0)
    setComparingIndex(-1)
    setPivotIndex(-1)
		setConfirmedIndices([])
    setSmallerIndices([])
    setBiggerIndices([])
    setChangeArr(false)
    setMovePivot(-1)
		setCodePosition(0)
	}

	const onClickSort = () => {
		if(!sorting) {
			setTimer(0)

      setComparingIndex(-1)
      setPivotIndex(-1)
      setConfirmedIndices([])
      setSmallerIndices([])
      setBiggerIndices([])
      setChangeArr(false)
      setMovePivot(-1)
			setSorting(true)
		}
	}

	const [comparingIndex, setComparingIndex] = useState(-1);
	const [pivotIndex, setPivotIndex] = useState(-1);
	const [confirmedIndices, setConfirmedIndices] = useState([]);
  const [smallerIndices, setSmallerIndices] = useState([])
  const [biggerIndices, setBiggerIndices] = useState([])
	const [sorting, setSorting] = useState(false)
	const [codePosition, setCodePosition] = useState(0)
  const [changeArr, setChangeArr] = useState(false)
  const [movePivot, setMovePivot] = useState(-1)

	useEffect(() => {
		(async() => {
			if(!sorting) {
				setTimer(0)
				return
			}
			if(timer > 0) {
				decreaseTimer()
				return
			}
      if(changeArr) {
        setTimer(waitTime)
        setCodePosition(4)
        setChangeArr(false)
        const insertArr = []
        for(let index of smallerIndices) {
          insertArr.push(arr[index])
        }
        insertArr.push(arr[pivotIndex])
        for(let index of biggerIndices) {
          insertArr.push(arr[index])
        }

        const newArr = [...arr]
        newArr.splice(pivotIndex, 1 + smallerIndices.length + biggerIndices.length)
        newArr.splice(pivotIndex, 0, ...insertArr)
        setArr(newArr)
        
        const newConfirmedIndices = [...confirmedIndices]
        newConfirmedIndices.push(pivotIndex + smallerIndices.length)
        setConfirmedIndices(newConfirmedIndices)
        setPivotIndex(-1)
        setSmallerIndices([])
        setBiggerIndices([])
        return
      }
      if(movePivot !== -1) {
        setTimer(waitTime)
        const newArr = [...arr]
        const temp = newArr[pivotIndex]
        newArr[pivotIndex] = newArr[movePivot]
        newArr[movePivot] = temp
        setPivotIndex(movePivot)
        setArr(newArr)
        setMovePivot(-1)
        return
      }
      if(pivotIndex === -1) {
        for(let i in arr) {
          if(!confirmedIndices.includes(parseInt(i))) {
            setTimer(waitTime)
            setCodePosition(2)
            const head = parseInt(i)
            let length = 0
            while(!confirmedIndices.includes(head + length) &&
              head + length < arr.length) {
                length ++
            }
            const newPivotIndex = head + Math.floor(Math.random() * length)
            console.log('Length', length)
            console.log('New pivot', newPivotIndex)
            setPivotIndex(newPivotIndex)
            setMovePivot(head)
            return
          }
        }
				await onStop();
				toast.success('Array sorted.')
				return;
      }
      if(confirmedIndices.includes(pivotIndex + 1) ||
        pivotIndex + 1 >= arr.length) {
        setTimer(waitTime)
        setCodePosition(1)
        const newConfirmedIndices = [...confirmedIndices]
        newConfirmedIndices.push(pivotIndex)
        setConfirmedIndices(newConfirmedIndices)
        setPivotIndex(-1)
        return
      }
      if(comparingIndex === -1) {
        setTimer(waitTime)
        setCodePosition(3)
        setComparingIndex(pivotIndex + 1)
        return
      }
      if(confirmedIndices.includes(comparingIndex + 1) ||
        comparingIndex + 1 >= arr.length) {
        setTimer(waitTime)
        setChangeArr(true)
        if(arr[pivotIndex] < arr[comparingIndex]) {
          const newBiggerIndices = [...biggerIndices]
          newBiggerIndices.push(comparingIndex)
          setBiggerIndices(newBiggerIndices)
        }
        else {
          const newSmallerIndices = [...smallerIndices]
          newSmallerIndices.push(comparingIndex)
          setSmallerIndices(newSmallerIndices)
        }
        setComparingIndex(-1)
        return
      }
      else {
        setTimer(waitTime)
        if(arr[pivotIndex] < arr[comparingIndex]) {
          const newBiggerIndices = [...biggerIndices]
          newBiggerIndices.push(comparingIndex)
          setBiggerIndices(newBiggerIndices)
        }
        else {
          const newSmallerIndices = [...smallerIndices]
          newSmallerIndices.push(comparingIndex)
          setSmallerIndices(newSmallerIndices)
        }
        setComparingIndex(comparingIndex + 1)
      }
		}) ()
	}, [sorting, timer])

	return (
		<>
			<div className='page'>
        <QuickSortVisualArray
          arr={arr}
          comparingIndex={comparingIndex}
          confirmedIndices={confirmedIndices}
          pivotIndex={pivotIndex}
          smallerIndices={smallerIndices}
          biggerIndices={biggerIndices}
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
          {`const randomQuickSort = (arr) => {`} <br/>
					<div className={codePosition === 1 ? 'highlighted-code' : ''}>
            &nbsp;&nbsp;{`if(arr.length <= 1) {`} <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{`return arr`}	<br/>
            &nbsp;&nbsp;{`}`} <br/>
					</div>
					<br/>
					<div className={codePosition === 2 ? 'highlighted-code' : ''}>
            &nbsp;&nbsp;{`const pivotIndex = Math.floor(Math.random() * arr.length)`}	<br/>
            &nbsp;&nbsp;{`const pivot = arr[pivotIndex]`}	<br/>
            &nbsp;&nbsp;{`arr.splice(pivotIndex, 1)`}	<br/>
					</div>
          <br />
          &nbsp;&nbsp;{`const left = []`}	<br/>
          &nbsp;&nbsp;{`const right = []`}	<br/>
          <br />
					<div className={codePosition === 3 ? 'highlighted-code' : ''}>
            &nbsp;&nbsp;{`for(let i = 0; i < arr.length; i++) {`}	<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{`if (arr[i] < pivot) {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`left.push(arr[i])`}	<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{`}`}	<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{`else {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`right.push(arr[i])`}	<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{`}`}	<br/>
            &nbsp;&nbsp;{`}`}	<br/>
					</div>
          <br />
					<div className={codePosition === 4 ? 'highlighted-code' : ''}>
            &nbsp;&nbsp;{`return [...randomQuickSort(left), pivot, ...randomQuickSort(right)]`} <br />
          </div>
          {`}`}
				</code>

			</div>
		</>
	)

}

