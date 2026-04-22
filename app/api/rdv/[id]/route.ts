// app/api/rdv/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id   = parseInt(params.id)
    const body = await req.json()
    const { statut, noteAdmin } = body

    const demande = await prisma.demandeRDV.update({
      where: { id },
      data: {
        ...(statut    && { statut }),
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