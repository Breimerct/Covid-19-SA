export interface ICountriesOptions {
  label: string
  shortName?: string
  value: string
  flag: string
}

export interface ICategory {
  category: string
  title: string
  icon: string
  total: number
  color: string
  today: number
}

export interface ICategories {
  name: string
  data: [number, number][]
  color: string
}

export interface ISocial {
  url: string
  icon: string
  color: string
}
