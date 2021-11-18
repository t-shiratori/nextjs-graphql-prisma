import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { TProduct } from '../../types'
import { products } from '../../dummyData'

type TPost = {
	product: TProduct
}

const Post = ({ product }: TPost): JSX.Element => {
	return (
		<div>
			<article>
				<header className="p-5 rounded-sm bg-white">
					<h1>{product.name}</h1>
				</header>
			</article>

			{/* Home Link */}
			<div className="text-sm mt-8 hidden tablet:flex justify-center ">
				<Link href={`/`}>
					<span className="underline hover:no-underline cursor-pointer">Home</span>
				</Link>
			</div>
		</div>
	)
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = products.map((product) => {
		return {
			params: { id: product.id },
		}
	})

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!products.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const targetProduct = products.find((product) => product.id === params?.id)

	return {
		props: {
			product: targetProduct,
		},
		revalidate: 1,
	}
}
