export interface Model {

}
export interface Categorie {
    libelle: string,
    id: number,
}

export interface Article {
    id: number,
    libelle: string,
    prix: number,
    stock: number,
    fournisseur: Fournisseur,
    categorie: Categorie,
    reference: string,
    photo:string
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

export interface DTO {
    data: Categorie[],
    total: number
}

export interface AllData {
    articles: Article[],
    fournisseurs: Fournisseur[]
    categories: Categorie[],
}
