export interface Model {

}
export interface Categorie {
    libelle: string,
    id: number,
}

export interface Article {
    libelle: string,
    id: number,
    prix: number,
    stock: number,
    fournisseur: Fournisseur,
    categorie: Categorie,
    reference: string
}

export interface Fournisseur {
    categorie: Categorie
    libelle: string,
    id: number
}

export interface FournisseurSubject {
    fournisseur: Fournisseur,
    position: number
}


export interface DTO{
  data: Categorie[],
  total:number
}
