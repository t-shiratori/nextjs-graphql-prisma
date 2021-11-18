import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import { ApolloServer, gql } from 'apollo-server-micro'

export const config = {
	api: {
		bodyParser: false,
	},
}

const prisma = new PrismaClient()

const typeDefs = gql`
	type User {
		email: String!
		name: String
	}
	type Query {
		allUsers: [User!]!
	}
`
const resolvers = {
	Query: {
		allUsers: () => {
			return prisma.user.findMany()
		},
	},
}

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
})

const startServer = apolloServer.start()

const handler = async (req: MicroRequest, res: ServerResponse): Promise<void | boolean> => {
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD')
	if (req.method === 'OPTIONS') {
		res.end()
		return false
	}
	await startServer
	await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}

export default handler
