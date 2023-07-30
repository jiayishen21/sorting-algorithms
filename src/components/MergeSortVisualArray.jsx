import { useEffect, useState } from "react";
import { Bar } from "./Bar"
import { Fragment } from "react";

// TODO: Add in comparingIndices, and perhaps a highlight for the merging arrays
export const MergeSortVisualArray = ({arrs, comparingIndices, confirmedIndices}) => {
  const findMaxNumberIn2DArray = (arr2d) => {
    if (!Array.isArray(arr2d) || arr2d.length === 0) {
      return null; // Return null if the input is not a valid 2D array
    }
  
    let maxNumber = arr2d[0][0]; // Assume the first element is the maximum
  
    for (let i = 0; i < arr2d.length; i++) {
      for (let j = 0; j < arr2d[i].length; j++) {
        if (typeof arr2d[i][j] === 'number' && arr2d[i][j] > maxNumber) {
          maxNumber = arr2d[i][j];
        }
      }
    }
  
    return maxNumber;
  }

  const flattenNestedArray = (arrTree) => {
    const result = [];

    function flatten(element) {
      if (Array.isArray(element)) {
        const onlyNumbersArray = element.filter(item => typeof item === 'number');
        if (onlyNumbersArray.length > 0) {
          result.push(onlyNumbersArray);
        }
        for (const item of element) {
          flatten(item);
        }
      }
    }

    flatten(arrTree);
    return result;
  }

  const getTotalLength = (flattened) => {
    let length = 0
    for(let i in flattened) {
      length += flattened[i].length
    }
    // +0.5*flattened.length to account for gaps between each set of bars
    return length + 0.5*flattened.length
  }

  const [flattened, setFlattened] = useState([])
  useEffect(() => {
    setFlattened(flattenNestedArray(arrs))
  }, [arrs])

  const [max, setMax] = useState(10)
  const [length, setLength] = useState(10)
  useEffect(() => {
    setMax(findMaxNumberIn2DArray(flattened))
    setLength(getTotalLength(flattened))
  }, [flattened])

  const [spaceWidth, setSpaceWidth] = useState(2)
  useEffect(() => {
    // Set spaceWidth to half a bar
    setSpaceWidth(20/length)
  }, [length])

  const [flattendComparingIndices, setFlattenedComparingIndices] = useState([])
  const [flattenedConfirmedIndices, setFlattenedConfirmedIndices] = useState([])

  useEffect(() => {
    let counter = 0
    const newComparing = []
    const newConfirmed = []
    for(let i in flattened) {
      for(let j in flattened[i]) {
        if(comparingIndices.includes(counter)) {
          newComparing.push(`${i}-${j}`)
        }
        if(confirmedIndices.includes(counter)) {
          newConfirmed.push(`${i}-${j}`)
        }
        counter ++
      }
    }
    setFlattenedComparingIndices(newComparing)
    setFlattenedConfirmedIndices(newConfirmed)
  }, [flattened, comparingIndices, confirmedIndices])

	return (
		<>
		 <div className="visual-array">
				{flattened.map((arr, i) => (
          <Fragment key={`arr${i}`}>
            {i === 0 ?
              <></> :
              <div style={{
                width: `${spaceWidth}rem`,
                height: '1px'
              }}></div> 
            }
            {arr.map((number, j) => (
              <Bar
                key={`bar${i}-${j}`}
                number={number}
                max={max}
                highlight={flattendComparingIndices.includes(`${i}-${j}`)}
                confirmed={flattenedConfirmedIndices.includes(`${i}-${j}`)}
                length={length + 0.5}
              />
            ))}
          </Fragment>
				))}
		 </div>
		</>
	)
}
