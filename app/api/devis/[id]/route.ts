// app/api/devis/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id     = parseInt(params.id)
    const { statut } = await request.json()

const validStatuts = ['EN_ATTENTE', 'EN_COURS', 'TRAITE', 'REFUSE']
    if (!validStatuts.includes(statut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    const devis = await prisma.devis.update({
      where: { id },
      data:  { statut },
    })

    return NextResponse.json(devis)
  } catch (error) {
    console.error('[devis PATCH] ❌', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    await prisma.devis.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}