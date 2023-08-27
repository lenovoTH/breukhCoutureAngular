import { AbstractInterface } from "./abstract-interface"

export interface Model {

}
export interface Categorie extends AbstractInterface {
    type:string
}

export interface Article extends AbstractInterface {
    prix: number,
    stock: number,
    fournisseur: Fournisseur,
    categorie: Categorie,
    reference: string,
    photo: string
}

export interface ArticleVente extends AbstractInterface {
    prix: number,
    quantiteStock: number,
    categorie: Categorie,
    reference: string,
    photo: string,
    cout: number,
    marge: number,
    promo: number,
    articleConfection: Article[]
}

export interface Fournisseur extends AbstractInterface {
    categorie: Categorie
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

export interface AllVente {
    articlesVente: ArticleVente[],
    fournisseurs: Fournisseur[]
    categories: Categorie[],
}



