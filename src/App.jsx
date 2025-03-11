import { Card } from './components/Card/Card';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';

function App() {
	return (
		<div className='wrapper clear'>
			<div style={{ display: 'none' }} className='overlay'>
				<Drawer />
			</div>
			<Header />
			<div className='content p-40'>
				<div className='d-flex align-center mb-40 justify-between'>
					<h1>Все кроссовки</h1>
					<div className='search-block d-flex align-center'>
						<img
							width={14.25}
							height={14.25}
							src='/img/search.svg'
							alt='search'
						/>
						<input placeholder='Поиск...' />
					</div>
				</div>
				<div className='sneakers d-flex'>
					<Card />
				</div>
			</div>
		</div>
	);
}

export default App;
