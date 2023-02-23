// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Student from "@/models/student"
import connectMongo from "@/utils/connectMongo"

export default async function handler(req, res) {
  await connectMongo()
  console.log('connected to mongo')
  const stu = await Student.create({
    name: 'muneeb',
    email: 'muneeb@gmail.com'
  })
  res.status(200).json(stu)
}
