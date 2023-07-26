import { NavLink } from "react-router-dom"

export const Nav = () => {
	return (
		<>
			<nav className="nav">
				<div className="centering">
					<div>
						<NavLink className='home-link' to='/'>MENU</NavLink>
					</div>
					<div>
						<NavLink to='/bubble-sort'>BUB</NavLink>
						<NavLink to='/selection-sort'>SEL</NavLink>
						<NavLink to='/insertion-sort'>INS</NavLink>
						<NavLink to='/merge-sort'>MER</NavLink>
						<NavLink to='/quick-sort'>QUI</NavLink>
						<NavLink to='/random-quick-sort'>RAN</NavLink>
					</div>

				</div>
			</nav>
		</>
	)

}