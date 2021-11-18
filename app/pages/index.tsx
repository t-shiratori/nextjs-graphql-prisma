import { GetStaticProps } from 'next'
import { TProducts } from '../types'
import { products } from '../dummyData'

type TTopProps = {
	products: TProducts
}

const Home = ({ products }: TTopProps): React.ReactElement => {
	return (
		<div>
			<ul>
				{products.map((product) => {
					return <li key={product.id}>{product.name}</li>
				})}
			</ul>
		</div>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			products,
		},
		revalidate: 1,
	}
}
