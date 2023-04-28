import { connect } from '@planetscale/database'

const planetscale = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
})

export const config = { 
    runtime: 'edge',
    regions: ['fra1']
  }

export default async function GET(request: Request) {
    const DBresponse = await planetscale.execute('SELECT * FROM Example;')

    return new Response(JSON.stringify(DBresponse.rows));
}
