import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cadozat.com'

  const modeles = [
    'ftr-34k', 'ftr-34m', 'ftr-34p', 'fvr-34k', 'fvr-34p',
    'nmr-77e', 'nmr-85h', 'nnr-85h', 'npr-75k', 'npr-75l',
    'nqr-90k', 'nqr-90m', 'dmax-tfr', 'karry-22b', 'karry-22q',
  ]

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalogue`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/references`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/societe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...modeles.map(m => ({
      url: `${base}/catalogue/${m}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}