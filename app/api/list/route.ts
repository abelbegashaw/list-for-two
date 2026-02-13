import { NextResponse } from "next/server"

import { getDatabase } from "@/lib/firebaseAdmin"

type ListItem = {
  id: string
  label: string
  done: boolean
}

type ListDocument = {
  _id: string
  items: ListItem[]
  updatedAt: string
}

const listDocId = "shared"
const accessCode = (process.env.LIST_ACCESS_CODE ?? "131023").trim()

const verifyAccess = (request: Request): boolean => {
  const provided = request.headers.get("x-access-code")
  const normalizedProvided = typeof provided === "string" ? provided.trim() : ""
  return Boolean(accessCode) && normalizedProvided === accessCode
}

export async function GET(request: Request) {
  if (!verifyAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const listRef = getDatabase().ref(`lists/${listDocId}`)
    const snapshot = await listRef.get()

    if (!snapshot.exists()) {
      const items: ListItem[] = []
      await listRef.set({
        _id: listDocId,
        items,
        updatedAt: new Date().toISOString(),
      })
      return NextResponse.json({ items })
    }

    const doc = snapshot.val() as ListDocument
    const items = Array.isArray(doc?.items) ? doc.items : []
    return NextResponse.json({ items })
  } catch (error) {
    console.error("GET /api/list error:", error)
    return NextResponse.json(
      { error: `Backend connection failed: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  if (!verifyAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let payload: { items?: ListItem[] } = {}
  try {
    payload = (await request.json()) as { items?: ListItem[] }
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  if (!Array.isArray(payload.items)) {
    return NextResponse.json({ error: "Invalid items" }, { status: 400 })
  }

  const items = payload.items
    .filter((item) => item && typeof item.id === "string")
    .map((item) => ({
      id: String(item.id),
      label: typeof item.label === "string" ? item.label : "",
      done: Boolean(item.done),
    }))

  try {
    const listRef = getDatabase().ref(`lists/${listDocId}`)
    await listRef.set({
      _id: listDocId,
      items,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("POST /api/list error:", error)
    return NextResponse.json(
      { error: `Backend connection failed: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    )
  }
}
