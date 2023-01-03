import styles from './Prato.module.scss';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import cardapio from 'data/cardapio.json'
import { lazy } from 'react';

const TagsPrato = lazy(() => import('components/TagsPrato'))
const PaginaPadrao = lazy(() => import('../PaginaPadrao'))
const NotFound = lazy(() => import('../NotFound'))

export default function Prato() {
	const { id } = useParams()
	const navigate = useNavigate()
	const prato = cardapio.find(item => item.id === Number(id))
	if (!prato) {
		return <NotFound />
	}

	return (
		<Routes>
			<Route path='*' element={<PaginaPadrao />}>
				<Route index element={
					<>
						<button className={styles.voltar} onClick={() => navigate(-1)}>
							{'< Voltar'}
						</button>
						<section className={styles.container}>
							<h1 className={styles.titulo}>
								{prato.title}
							</h1>
							<div>
								<img src={prato.photo} alt={prato.title} />
							</div>
							<div className={styles.conteudo}>
								<p className={styles.conteudo__descricao}>
									{prato.description}
								</p>
							</div>
							<TagsPrato {...prato} />
						</section>
					</>} />
			</Route>
		</Routes >
	);
}