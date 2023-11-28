import { FC } from 'react';

interface ILoginBtn {
	onClickHandler: () => void;
	text: string;
}

export const LoginBtn: FC<ILoginBtn> = ({ onClickHandler, text }) => {
	return (
		<button
			onClick={onClickHandler}
			className="text-slate-300 hover:text-white"
		>
			{text}
		</button>
	);
};
