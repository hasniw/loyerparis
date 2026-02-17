export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'prix-loyer-paris-2026',
    title: 'Prix des loyers à Paris en 2026 : état des lieux complet',
    excerpt: "Découvrez les prix moyens des loyers à Paris en 2026, arrondissement par arrondissement, et les tendances du marché locatif parisien.",
    date: '2026-01-15',
    readTime: '8 min',
    content: `
## Le marché locatif parisien en 2026

Le marché locatif parisien continue d'évoluer en 2026, avec des disparités importantes entre les arrondissements. Le prix moyen au m² s'établit autour de **29,50 €/m²** pour l'ensemble de la capitale, en hausse de 1,8 % par rapport à 2025.

### Les arrondissements les plus chers

Sans surprise, les 6e, 7e et 4e arrondissements restent les plus onéreux avec des prix dépassant les **35 €/m²**. Le 1er arrondissement, malgré sa petite taille, affiche également des tarifs premium.

### Les arrondissements les plus abordables

Le 19e arrondissement reste le plus accessible avec un prix moyen de **24 €/m²**, suivi du 20e (25 €/m²) et du 13e (25,50 €/m²). Ces quartiers bénéficient cependant des plus fortes hausses.

### Tendances 2026

- **Hausse généralisée dans l'est parisien** : les 18e, 19e et 20e arrondissements connaissent des hausses de 3 à 4 %
- **Stabilité dans l'ouest** : les arrondissements historiquement chers se stabilisent
- **Impact du Grand Paris Express** : les quartiers proches des futures gares voient leurs loyers augmenter
- **Encadrement des loyers** : le dispositif continue de modérer les hausses dans le centre

### Prix moyen par type de logement

| Type | Fourchette mensuelle |
|------|---------------------|
| Studio | 500 € - 1 200 € |
| T2 | 800 € - 2 000 € |
| T3 | 1 200 € - 3 200 € |

### Conseils pour les locataires

1. **Comparez les prix** avec les références de l'OLAP
2. **Vérifiez l'encadrement** : votre loyer ne doit pas dépasser le loyer de référence majoré
3. **Négociez** : dans les quartiers stables, une marge de négociation existe
4. **Anticipez** : les meilleurs biens partent en quelques jours
    `,
  },
  {
    slug: 'negocier-son-loyer',
    title: 'Comment négocier son loyer à Paris : guide pratique 2026',
    excerpt: "Techniques concrètes pour négocier votre loyer à Paris, que ce soit à la signature du bail ou lors du renouvellement.",
    date: '2026-01-20',
    readTime: '6 min',
    content: `
## Négocier son loyer : c'est possible !

Contrairement aux idées reçues, négocier son loyer à Paris est tout à fait possible. Voici nos conseils pour y parvenir.

### Quand négocier ?

- **À la signature du bail** : c'est le meilleur moment, surtout si le bien est sur le marché depuis plusieurs semaines
- **Au renouvellement** : si votre loyer dépasse le loyer de référence, vous avez un levier légal
- **En cours de bail** : plus difficile, mais possible si vous êtes un locataire exemplaire

### Arguments qui fonctionnent

1. **Le loyer de référence** : consultez la carte des loyers de l'OLAP et comparez avec votre loyer
2. **L'état du logement** : des travaux nécessaires justifient une réduction
3. **La durée d'engagement** : proposez un bail plus long en échange d'un loyer réduit
4. **Le paiement ponctuel** : mettez en avant votre fiabilité financière
5. **Le marché** : si des biens similaires sont moins chers, montrez les annonces

### Combien peut-on économiser ?

En moyenne, une négociation réussie permet d'économiser entre **5 et 10 %** du loyer mensuel. Sur un T2 à 1 200 €, cela représente 60 à 120 € par mois, soit **720 à 1 440 € par an**.

### Modèle de lettre de négociation

Adaptez ce modèle à votre situation :

> Madame, Monsieur,
> 
> Locataire du logement situé au [adresse] depuis [date], je me permets de vous solliciter concernant le montant du loyer.
> 
> Après consultation des loyers de référence publiés par l'OLAP pour le quartier, je constate que le loyer actuel de [montant] €/m² se situe au-dessus du loyer de référence majoré de [montant ref] €/m².
> 
> Je souhaiterais engager une discussion pour ajuster le loyer à un niveau conforme au marché.

### Erreurs à éviter

- Ne jamais menacer de partir si vous n'êtes pas prêt à le faire
- Ne pas négliger les charges : elles sont aussi négociables
- Ne pas oublier les travaux : un propriétaire qui fait des travaux peut justifier un loyer plus élevé
    `,
  },
  {
    slug: 'encadrement-des-loyers-guide',
    title: "Encadrement des loyers à Paris : le guide complet 2026",
    excerpt: "Tout comprendre sur l'encadrement des loyers à Paris : fonctionnement, loyers de référence, recours et exceptions.",
    date: '2026-02-01',
    readTime: '10 min',
    content: `
## L'encadrement des loyers à Paris en 2026

Depuis 2019, l'encadrement des loyers est en vigueur à Paris. Voici tout ce que vous devez savoir.

### Comment ça fonctionne ?

L'OLAP (Observatoire des Loyers de l'Agglomération Parisienne) publie chaque année trois niveaux de loyer pour chaque quartier :

- **Loyer de référence** : le loyer médian du quartier
- **Loyer de référence majoré** (+20 %) : le plafond légal
- **Loyer de référence minoré** (-30 %) : le plancher

### Votre loyer est-il conforme ?

Pour le vérifier :
1. Identifiez votre quartier parmi les 80 quartiers parisiens
2. Consultez les loyers de référence sur le site de la DRIHL
3. Comparez avec votre loyer charges comprises

### Que faire si votre loyer est trop élevé ?

1. **Envoyez un courrier recommandé** à votre propriétaire
2. **Saisissez la commission de conciliation** si pas de réponse sous 2 mois
3. **Saisissez le tribunal** en dernier recours

### Les exceptions au plafonnement

Le propriétaire peut appliquer un **complément de loyer** si le logement présente des caractéristiques exceptionnelles :
- Vue remarquable (Tour Eiffel, Seine...)
- Terrasse de grande surface
- Hauteur sous plafond supérieure à 3,30 m
- Équipements de luxe

### Sanctions pour les propriétaires

Depuis 2022, les sanctions sont renforcées :
- **Amende jusqu'à 5 000 €** pour un particulier
- **Amende jusqu'à 15 000 €** pour une personne morale
- **Obligation de rembourser** le trop-perçu au locataire

### Impact de l'encadrement

L'encadrement a permis de modérer les hausses dans les quartiers centraux, mais son effet reste limité dans les arrondissements périphériques où les loyers étaient déjà sous le plafond.
    `,
  },
  {
    slug: 'quartiers-moins-chers-paris',
    title: 'Les quartiers les moins chers pour se loger à Paris en 2026',
    excerpt: "Où trouver un logement abordable à Paris ? Tour d'horizon des quartiers et villes limitrophes offrant le meilleur rapport qualité-prix.",
    date: '2026-02-05',
    readTime: '7 min',
    content: `
## Se loger à petit prix à Paris : c'est encore possible

Paris est chère, mais certains quartiers restent accessibles. Voici notre sélection des meilleurs rapports qualité-prix.

### Top 5 des arrondissements les moins chers

1. **19e arrondissement** (24 €/m²) : Buttes-Chaumont, Villette, canal de l'Ourcq
2. **20e arrondissement** (25 €/m²) : Belleville, Ménilmontant, Gambetta
3. **13e arrondissement** (25,50 €/m²) : Butte-aux-Cailles, Chinatown, BnF
4. **18e arrondissement** (26 €/m²) : Jules Joffrin, Marcadet, Marx Dormoy
5. **12e arrondissement** (26,50 €/m²) : Bercy, Nation, Bois de Vincennes

### Les pépites de la petite couronne

Pour un budget encore plus serré, la petite couronne offre des alternatives intéressantes :

- **Créteil** (17,50 €/m²) : lac, métro 8, université
- **Saint-Denis** (18 €/m²) : en pleine transformation post-JO
- **Nanterre** (19,50 €/m²) : proximité La Défense, RER A
- **Montreuil** (20,50 €/m²) : le "21e arrondissement"

### Critères pour bien choisir

Ne regardez pas que le prix ! Vérifiez aussi :
- **Les transports** : temps de trajet réel vers votre travail
- **Les commerces** : qualité de vie au quotidien
- **La sécurité** : consultez les statistiques locales
- **L'évolution** : un quartier en hausse = plus-value à terme
- **Les projets urbains** : Grand Paris Express, rénovations...

### Budget type pour un studio

| Quartier | Loyer | Charges | Transport | Total mensuel |
|----------|-------|---------|-----------|---------------|
| Paris 19e | 620 € | 50 € | 86 € | 756 € |
| Montreuil | 560 € | 45 € | 86 € | 691 € |
| Saint-Denis | 490 € | 40 € | 86 € | 616 € |

### Notre conseil

Privilégiez les quartiers en transformation près des futures lignes du Grand Paris Express. Vous bénéficierez de loyers encore bas aujourd'hui et d'une amélioration progressive de la desserte.
    `,
  },
  {
    slug: 'colocation-paris-budget',
    title: 'Colocation à Paris : le guide budget 2026',
    excerpt: "La colocation est souvent la solution la plus économique pour vivre à Paris. Découvrez nos conseils pour trouver la colocation idéale.",
    date: '2026-02-10',
    readTime: '7 min',
    content: `
## La colocation : la solution maligne pour vivre à Paris

Avec un budget moyen de **550 à 800 €/mois** charges comprises, la colocation permet d'accéder à des quartiers et des surfaces impossibles en location classique.

### Combien ça coûte ?

| Arrondissement | Chambre en colocation | Studio équivalent | Économie |
|---------------|----------------------|-------------------|----------|
| Paris 11e | 650 € | 870 € | -25 % |
| Paris 18e | 580 € | 800 € | -28 % |
| Paris 15e | 620 € | 850 € | -27 % |

### Les meilleurs quartiers pour la colocation

1. **Le 11e** : vie nocturne, métros, ambiance jeune
2. **Le 18e** : Montmartre, prix accessibles, charme
3. **Le 10e** : canal Saint-Martin, bars, restos
4. **Le 20e** : Belleville, multiculturel, abordable
5. **Montreuil** : espaces plus grands, ambiance créative

### Où chercher ?

- **La Carte des Colocs** : le site de référence en France
- **Appartager** : grande base de données
- **Facebook** : groupes "Colocation Paris"
- **Le Bon Coin** : section colocation
- **Roomlala** : pour les séjours plus courts

### Les pièges à éviter

1. **Le bail** : insistez pour un bail individuel (chacun son contrat)
2. **Les charges** : faites préciser ce qui est inclus (internet, électricité, eau)
3. **L'état des lieux** : faites-le méticuleusement, pièce par pièce
4. **La caution** : ne versez jamais avant d'avoir visité
5. **L'assurance** : chaque colocataire doit avoir sa propre assurance habitation

### Aspects juridiques

Depuis la loi ALUR, deux types de baux existent pour la colocation :
- **Bail unique** : tous les colocataires signent le même bail (clause de solidarité fréquente)
- **Baux individuels** : chacun a son propre contrat (plus protecteur)

### Budget mensuel type en colocation

| Poste | Montant |
|-------|---------|
| Loyer + charges | 650 € |
| Internet (partagé) | 10 € |
| Électricité (partagée) | 20 € |
| Assurance habitation | 15 € |
| **Total** | **695 €** |
    `,
  },
  {
    slug: 'assurance-habitation-comparatif',
    title: 'Assurance habitation à Paris : comparatif 2026',
    excerpt: "Comparez les meilleures assurances habitation pour votre logement parisien. Prix, garanties, et conseils pour bien choisir.",
    date: '2026-02-15',
    readTime: '6 min',
    content: `
## Bien choisir son assurance habitation à Paris

L'assurance habitation est obligatoire pour tout locataire. À Paris, les tarifs varient selon l'arrondissement, la surface et les garanties choisies.

### Comparatif des tarifs 2026

Pour un T2 de 45 m² à Paris :

| Assureur | Formule de base | Formule complète |
|----------|----------------|-----------------|
| Luko | 8 €/mois | 15 €/mois |
| Lovys | 7 €/mois | 14 €/mois |
| MAIF | 12 €/mois | 22 €/mois |
| AXA | 14 €/mois | 25 €/mois |
| Matmut | 10 €/mois | 19 €/mois |

### Les garanties essentielles

Toute assurance habitation doit couvrir au minimum :
- **Responsabilité civile** : dommages causés aux tiers
- **Dégâts des eaux** : fuites, infiltrations
- **Incendie** : y compris explosion
- **Catastrophes naturelles** : inondations, tempêtes

### Garanties recommandées à Paris

- **Vol et cambriolage** : indispensable dans certains quartiers
- **Bris de glace** : utile en rez-de-chaussée
- **Protection juridique** : litiges avec le propriétaire
- **Dommages électriques** : surtensions dans les vieux immeubles

### Spécificités parisiennes

- **Le risque inondation** : les arrondissements proches de la Seine (1er, 4e, 5e, 6e, 7e, 12e, 13e, 15e, 16e) sont en zone de risque
- **Le vol** : les arrondissements touristiques (1er, 4e, 8e, 18e) ont des taux plus élevés
- **Les vieux immeubles** : les installations électriques et la plomberie vétustes augmentent les risques

### Comment réduire sa prime ?

1. **Installez des dispositifs de sécurité** : serrure 3 points, détecteur de fumée
2. **Augmentez la franchise** : une franchise plus élevée = une prime plus basse
3. **Regroupez vos contrats** : auto + habitation chez le même assureur
4. **Comparez chaque année** : les prix évoluent, renégociez !
5. **Optez pour le paiement annuel** : souvent moins cher que le mensuel

### Pour les colocataires

Chaque colocataire doit avoir sa propre assurance habitation. Certains assureurs comme Luko proposent des formules spéciales colocation.
    `,
  },
];
