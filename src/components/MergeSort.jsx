import { useState, useEffect } from 'react'
import { MergeSortVisualArray } from './MergeSortVisualArray';
import { toast } from 'react-toastify';

export const MergeSort = () => {
	const baseWaitTime = 500
	const [arrs, setArrs] = useState([1, 2, 3, 4])
	const [randomLength, setRandomLength] = useState("10")
	const [custom, setCustom] = useState("4, 3, 2, 1")
	const [speed, setSpeed] = useState(1);
	const [waitTime, setWaitTime] = useState(baseWaitTime)

	const flattenArray = (arr) => {
		let flattenedArray = [];
	
		arr.forEach((element) => {
			if (Array.isArray(element)) {
				flattenedArray.push(...flattenArray(element));
			} else {
				flattenedArray.push(element);
			}
		});
	
		return flattenedArray;
	}

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
		setArrs(randomArray(number))
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
		setArrs(newCustom)
	}

	const handleSliderChange = (event) => {
		const value = parseInt(event.target.value, 10);
		setSpeed(value);
	}

	useEffect(() => {
		setArrs(randomArray(10))
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

	const [sorting, setSorting] = useState(false)
	const [codePosition, setCodePosition] = useState(0)

	const delay = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const onStop = async () => {
		setSorting(false)
		await delay(50)
		setCodePosition(0)
    setTimer(0)
    setCurPath([])
    setMerging(false)
		const newArrs = flattenArray(arrs)
		setArrs(newArrs)
	}

	const onClickSort = () => {
		if(!sorting) {
      setTimer(0)
			setCodePosition(0)
			setSorting(true)
      setCurPath([])
      setMerging(false)
		}
	}

  const [curPath, setCurPath] = useState([])
  const [merging, setMerging] = useState(false)

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

      let curArr = arrs
      for(let i of curPath) {
        curArr = curArr[i]
      }

      if(merging) {
				setTimer(waitTime)
				const newArrs = [...arrs]
				curArr = newArrs
				for(let i of curPath) {
					curArr = curArr[i]
				}

				if(curArr.length < 3) {
					curArr.unshift([])
				}

				if(curArr[1] && curArr[1].length === 0) {
					const combined = curArr[0].concat(curArr[2])
					curArr.splice(0)
					curArr.push(...combined)

					const newPath = [...curPath]

					if(curPath.length === 0) {
						setArrs(newArrs)
						await onStop();
						toast.success('Array sorted.')
						return;
					}

					// If currently on right path
					if(newPath[newPath.length - 1]) {
						newPath.pop()
					}
					// If on left path, move to right path
					else {
						newPath[newPath.length - 1] = 1
						setMerging(false)
					}
					setCurPath(newPath)
				}
				else if(curArr[2] && curArr[2].length === 0) {
					const combined = curArr[0].concat(curArr[1])
					curArr.splice(0)
					curArr.push(...combined)

					const newPath = [...curPath]

					if(curPath.length === 0) {
						setArrs(newArrs)
						await onStop();
						toast.success('Array sorted.')
						return;
					}

					// If currently on right path	
					if(newPath[newPath.length - 1]) {
						newPath.pop()
					}
					// If on left path, move to right path
					else {
						newPath[newPath.length - 1] = 1
						setMerging(false)
					}

					setCurPath(newPath)
				}

				else {
					if(curArr[1][0] < curArr[2][0]) {
						curArr[0].push(curArr[1].shift())
					}
					else {
						curArr[0].push(curArr[2].shift())
					}
				}
				setArrs(newArrs)
				return
      }

      if(curArr.length <= 1) {
        setTimer(waitTime)
        // setCodePosition(1)

        // If currently at right array
        if(curPath[-1]) {
					// Merge
          const newCurPath = [...curPath]
          newCurPath.pop()
          setCurPath(newCurPath)
          setMerging(true)
        }
        // If currentl at left array
        else {
					// Move into the right array
          const newCurPath = [...curPath]
          newCurPath[-1] = 1
          setCurPath(newCurPath)
        }
        return
      }
			// If current array is larger than length 1, split
			else {
				setTimer(waitTime)
				const middle = Math.floor(curArr.length / 2)
				const leftHalf = curArr.slice(0, middle);
 				const rightHalf = curArr.slice(middle);

				// Update arrs
				const newArrs = [...arrs]
				let newCurArr = newArrs
				for(let i of curPath) {
					newCurArr = newCurArr[i]
				}
				newCurArr.splice(0)
				newCurArr.push(leftHalf)
				newCurArr.push(rightHalf)
				setArrs(newArrs)

				const newCurPath = curPath
				newCurPath.push(0)
				setCurPath(newCurPath)
			}

		}) ()
	}, [sorting, timer])

	return (
		<>
			<div className='page'>
        <MergeSortVisualArray 
          arrs={arrs}
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
					{`const mergeSort = (arr) => {`} <br/>
					<div className={codePosition === 1 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;{`if(arr.length <= 1) {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`return arr`}	<br/>
						&nbsp;&nbsp;{`if(arr.length <= 1) {`}	<br/>
					</div>
					<br/>
					<div className={codePosition === 2 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;{`const middle = Math.floor(arr.length / 2)`}	<br/>
						&nbsp;&nbsp;{`const leftHalf = arr.slice(0, middle)`}	<br/>
						&nbsp;&nbsp;{`const rightHalf = arr.slice(middle)`}	<br/>
						<br />
						&nbsp;&nbsp;{`const sortedLeft = mergeSort(leftHalf)`}	<br/>
						&nbsp;&nbsp;{`const sortedRight = mergeSort(rightHalf)`}	<br/>
						<br />
						&nbsp;&nbsp;{`return merge(sortedLeft, sortedRight)`}	<br/>
					</div>
					{`}`} <br />
					<br />
					{`const merge = (arr) => {`} <br/>
					&nbsp;&nbsp;{`let combined = []`}	<br/>
					&nbsp;&nbsp;{`let leftIndex = 0`}	<br/>
					&nbsp;&nbsp;{`let rightIndex = 0`}	<br/>
					<br />
					&nbsp;&nbsp;{`while(leftIndex < left.length && rightIndex < right.length) {`}	<br/>
					<div className={codePosition === 3 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;&nbsp;&nbsp;{`if(left[leftIndex] < right[rightIndex]) {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`combined.push(left[leftIndex])`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`leftIndex++`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`}`}	<br/>
					</div>
					<br />
					<div className={codePosition === 4 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;&nbsp;&nbsp;{`else {`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`combined.push(right[rightIndex])`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`rightIndex++`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`}`}	<br/>
					</div>
					&nbsp;&nbsp;{`}`}	<br/>
					<br />
					<div className={codePosition === 5 ? 'highlighted-code' : ''}>
						&nbsp;&nbsp;{`return combined`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`.concat(left.slice(leftIndex))`}	<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;{`.concat(right.slice(rightIndex))`}	<br/>
						</div>
					{`}`}
				</code>

			</div>
		</>
	)

}
