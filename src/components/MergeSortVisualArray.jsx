import { Bar } from "./Bar"
import { Fragment } from "react";

// TODO: Add in comparingIndices, and perhaps a highlight for the merging arrays
export const MergeSortVisualArray = ({arrs,}) => {

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

  const flattened = flattenNestedArray(arrs)
	const max = findMaxNumberIn2DArray(flattened)
  const length = getTotalLength(flattened)

  // Set spaceWidth to half a bar
	const spaceWidth = 20/length

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
            {arr.map((number, index) => (
              <Bar
                key={`bar${i}-${index}`}
                number={number}
                max={max}
                highlight={false}
                confirmed={false}
                length={length + 0.5}
              />
            ))}
          </Fragment>
				))}
		 </div>
		</>
	)
}
