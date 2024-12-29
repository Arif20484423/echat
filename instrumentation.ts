import dbConnect from './lib/db'

export async function register(){
    await dbConnect();
}