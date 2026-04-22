-- CreateEnum
CREATE TYPE "StatutDevis" AS ENUM ('EN_ATTENTE', 'VU', 'EN_COURS', 'ENVOYE', 'ACCEPTE', 'REFUSE');

-- CreateEnum
CREATE TYPE "RoleAdmin" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITEUR');

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "descriptionLongue" TEXT,
    "prix" DOUBLE PRECISION,
    "reference" TEXT,
    "marque" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "categorieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProduitImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "principale" BOOLEAN NOT NULL DEFAULT false,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "ProduitImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specification" (
    "id" SERIAL NOT NULL,
    "cle" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "unite" TEXT,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "produitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "societe" TEXT,
    "ville" TEXT,
    "sujet" TEXT,
    "message" TEXT NOT NULL,
    "lu" BOOLEAN NOT NULL DEFAULT false,
    "repondu" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devis" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "societe" TEXT,
    "ville" TEXT,
    "message" TEXT,
    "statut" "StatutDevis" NOT NULL DEFAULT 'EN_ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Devis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevisLigne" (
    "id" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "note" TEXT,
    "devisId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "DevisLigne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ville" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ville_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageContenu" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "sousTitre" TEXT,
    "contenu" TEXT,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageContenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temoignage" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "societe" TEXT,
    "ville" TEXT,
    "texte" TEXT NOT NULL,
    "note" INTEGER NOT NULL DEFAULT 5,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Temoignage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partenaire" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "logo" TEXT,
    "site" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Partenaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actualite" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resume" TEXT,
    "contenu" TEXT,
    "image" TEXT,
    "publie" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actualite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleAdmin" NOT NULL DEFAULT 'EDITEUR',
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visite" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_slug_key" ON "Categorie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Produit_slug_key" ON "Produit"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Produit_reference_key" ON "Produit"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Devis_reference_key" ON "Devis"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Ville_slug_key" ON "Ville"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PageContenu_page_key" ON "PageContenu"("page");

-- CreateIndex
CREATE UNIQUE INDEX "Actualite_slug_key" ON "Actualite"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduitImage" ADD CONSTRAINT "ProduitImage_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specification" ADD CONSTRAINT "Specification_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevisLigne" ADD CONSTRAINT "DevisLigne_devisId_fkey" FOREIGN KEY ("devisId") REFERENCES "Devis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevisLigne" ADD CONSTRAINT "DevisLigne_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
