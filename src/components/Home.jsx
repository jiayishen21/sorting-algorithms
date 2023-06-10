import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate } from 'react-router-dom';

export const Home = () => {
	const [sorts, setSorts] = useState(['Random Quick Sort', 'Counting Sort', 'Radix Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'])
	const [activeSorts, setActiveSorts] = useState(['Random Quick Sort', 'Counting Sort', 'Radix Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort'])

	const changeRange = (change) => {
		let newSorts = sorts
		if(change === 1) {
			const moved = newSorts.shift()
			newSorts.push(moved)
		}
		else if(change === -1) {
			const moved = newSorts.pop()
			newSorts.unshift(moved)
		}
		setSorts(newSorts)
		setActiveSorts(sorts.slice(0, 7))
	}

	const [redirect, setRedirect] = useState(false)

	const handleKeyDown = (event) => {
		if(event.key === 'ArrowUp') {
			changeRange(+1)
		}
		else if(event.key === 'ArrowDown') {
			changeRange(-1)
		}
		else if(event.key === 'Enter') {
			setRedirect(true)
		}
	}

	useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

	if(redirect) {
		return <Navigate replace to={`/${activeSorts[3].toLowerCase().replace(/\s/g, '-')}`} />;
	}

	return (
		<>
			<div className="home">
				<div className='wheel'>
					<button className='up' onClick={() => changeRange(+1)}>
					</button>
					<div className='sorts'>
						{activeSorts.map((activeSort, index) => (
							<div
								key={activeSort}
								className={`wheel-element wheel${index}`}
							>
								{activeSort}
							</div>
						))}
					</div>
					<button className='down' onClick={() => changeRange(-1)}>
					</button>
				</div>

				<Link to={`/${activeSorts[3].toLowerCase().replace(/\s/g, '-')}`} className='select'>
					<FontAwesomeIcon icon={faArrowRight} />
				</Link>
			</div>
		</>
	)

}