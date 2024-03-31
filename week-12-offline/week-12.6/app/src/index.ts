import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({ datasourceUrl: env.DATABASE_URL }).$extends(withAccelerate());

		await prisma.log.create({
			data: {
				level: 'Info',
				message: `${request.method} ${request.url}`,
				meta: {
					headers: JSON.stringify(request.headers),
				},
			},
		});

		const { data, info } = await prisma.log
			.findMany({
				take: 20,
				orderBy: {
					id: 'desc',
				},
			})
			.withAccelerateInfo();
		console.log(JSON.stringify(info));

		return new Response(`request method: ${request.method}!`);
		// return Response.json(info);
	},
};

/* 

Serverless environments have one big problem when dealing with databases. 
1.There can be many connections open to the DB since there can be multiple workers open in various regions
2.Prisma the library has dependencies that the cloudflare runtime doesn’t understand.

Serverless environments have many workers(servers) around the globe, so instead of all of them trying to access the database and exceeding it's request limit, we can make a connection pool and let the workers connect to connection pool and from that connection pool we can make a connection to the DB. this is an efficient approach.

all environment variables that we want to use in our index.ts file should be inside wrangler.toml file. All environment variables that we want to use from CLI should be inside .env file.

*/
