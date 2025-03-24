import { useContext } from 'react';
import { AppContext } from '../../context';
import { Link } from 'react-router-dom';

export const Info = ({ title, description, src, alt, width, height, setIsOrderComplete }) => {
	const { setCartOpened } = useContext(AppContext);
	return (
		<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
			<img
				className='mb-20'
				width={width}
				height={height}
				src={src}
				alt={alt}
			/>
			<h2>{title}</h2>
			<p className='opacity-6'>{description}</p>
			<Link to='/'>
				<button
					onClick={() => {
						setCartOpened(false);
						// setIsOrderComplete(false);
					}}
					className='greenButton'>
					<img src='/img/arrow.svg' alt='arrow' />
					Вернуться назад
				</button>
			</Link>
		</div>
	);
};
