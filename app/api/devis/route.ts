import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const DATA_FILE = path.join(process.cwd(), 'data', 'devis.json')
const SECRET_KEY = 'cadozat-secret-key-2024'

// Vérifier le token
function verifyToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString())
    if (payload.key !== SECRET_KEY) return false
    if (payload.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

// Vérifier l'authentification admin
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  if (!token) return false
  return verifyToken(token)
}

// Assurer que le dossier data existe
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Lire les devis existants
async function getDevis() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Sauvegarder les devis
async function saveDevis(devis: any[]) {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(devis, null, 2))
}

// GET - Récupérer tous les devis (pour l'admin)
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const devis = await getDevis()
    return NextResponse.json(devis)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Créer un nouveau devis (accessible publiquement)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation basique
    if (!body.nom || !body.prenom || !body.telephone || !body.email || !body.vehicule) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    const devis = await getDevis()
    
    const newDevis = {
      id: `DEV-${Date.now()}`,
      ...body,
      date: new Date().toISOString(),
      statut: 'nouveau',
      notes: '',
    }

    devis.unshift(newDevis)
    await saveDevis(devis)

    return NextResponse.json({ success: true, id: newDevis.id })
  } catch (error) {
    console.error('Erreur création devis:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT - Mettre à jour un devis (statut, notes)
export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { id, statut, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
    }

    const devis = await getDevis()
    const index = devis.findIndex((d: any) => d.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Devis non trouvé' }, { status: 404 })
    }

    if (statut) devis[index].statut = statut
    if (notes !== undefined) devis[index].notes = notes
    devis[index].updatedAt = new Date().toISOString()

    await saveDevis(devis)

    return NextResponse.json({ success: true, devis: devis[index] })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Supprimer un devis
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
    }

    let devis = await getDevis()
    devis = devis.filter((d: any) => d.id !== id)
    await saveDevis(devis)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}