// app/api/rdv/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'
const prisma = new PrismaClient()

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    const body = await req.json()
    const { statut, noteAdmin } = body

    const demande = await prisma.demandeRDV.update({
      where: { id },
      data: {
        ...(statut && { statut }),
        ...(noteAdmin !== undefined && { noteAdmin }),
        lu: true,
      },
    })

    return NextResponse.json(demande)
  } catch (error) {
    console.error('[RDV PATCH Error]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}