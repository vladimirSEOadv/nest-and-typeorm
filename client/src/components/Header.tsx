import { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';

export const Header: FC = () => {
	// const isAuth = true;
	const [isAuth, setIsAuth] = useState(true);
	return (
		<header className="flex items-center  bg-slate-800 p-4 shadow-sm backdrop-blur-sm ">
			<Link to={'/'}>
				<FaBtc size={20} />
			</Link>
			{/*Menu*/}
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/transactions'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/categories'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Categories
							</NavLink>
						</li>
						{/*<li>*/}
						{/*	<NavLink*/}
						{/*		to={'/auth'}*/}
						{/*		className={({ isActive }) =>*/}
						{/*			isActive ? 'text-white' : 'text-white/50'*/}
						{/*		}*/}
						{/*	>*/}
						{/*		Auth*/}
						{/*	</NavLink>*/}
						{/*</li>*/}
					</ul>
				</nav>
			)}
			{/*Actions*/}
			{isAuth ? (
				<button
					// onClick={() => setIsAuth((prev) => !prev)}
					className="btn btn-red "
				>
					<span>Log out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className="hover: ml-auto py-2 text-white/50 hover:text-white"
					to={'auth'}
				>
					Log in
				</Link>
			)}
		</header>
	);
};
