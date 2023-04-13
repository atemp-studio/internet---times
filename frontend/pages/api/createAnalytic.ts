import { client } from "../../client";

export default async function createComment(req: any, res: any) {
  const { _id, name, data, createdAt} = JSON.parse(req.body)
  try {
    await client.create({
     _type: 'analytics',
     name,
     data,
     createdAt
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: `Couldn't submit`, err})
  }
    
  return res.status(200).json({ message: 'Submitted' })
} 