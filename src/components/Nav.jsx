import { NavLink } from "react-router-dom"

export const Nav = () => {
	const isProduction = process.env.NODE_ENV === 'production'
	const baseURL = isProduction ? '/sorting-alogrithms' : ''

	return (
		<>
			<nav className="nav">
				{baseURL}lol

				<div className="centering">
					<div>
						<NavLink className='home-link' to='/'>MENU</NavLink>
					</div>
					<div>
						<NavLink to={`${baseURL}/bubble-sort`}>BUB</NavLink>
						<NavLink to={`${baseURL}/selection-sort`}>SEL</NavLink>
						<NavLink to={`${baseURL}/insertion-sort`}>INS</NavLink>
						<NavLink to={`${baseURL}/merge-sort`}>MER</NavLink>
						<NavLink to={`${baseURL}/quick-sort`}>QUI</NavLink>
						<NavLink to={`${baseURL}/random-quick-sort`}>RAN</NavLink>
					</div>

				</div>
			</nav>
		</>
	)

}