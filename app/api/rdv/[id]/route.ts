import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 })
    }

    const body = await request.json()
    const { statut } = body

    const statutsValides = ['NOUVEAU', 'CONFIRME', 'EN_COURS', 'TERMINE', 'ANNULE']
    if (!statut || !statutsValides.includes(statut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    const demande = await prisma.demandeRDV.update({
      where: { id },
      data: { statut, lu: true },
    })

    return NextResponse.json(demande)
  } catch (error) {
    console.error('Erreur PATCH RDV:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 })
    }

    const demande = await prisma.demandeRDV.findUnique({
      where: { id },
    })

    if (!demande) {
      return NextResponse.json({ error: 'Demande non trouvée' }, { status: 404 })
    }

    return NextResponse.json(demande)
  } catch (error) {
    console.error('Erreur GET RDV:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}