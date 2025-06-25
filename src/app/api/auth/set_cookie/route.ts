import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { role } = await req.json()

  const res = NextResponse.json({ success: true })
  res.cookies.set('loggedInRole', role, { path: '/', maxAge: 60 * 60 * 24 })

  return res
}
