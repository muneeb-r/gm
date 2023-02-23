// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Student from "@/models/student"

export default async function handler(req, res) {
  res.status(200).json({hello:'hello'})
}
