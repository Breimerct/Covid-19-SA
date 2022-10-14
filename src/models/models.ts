export interface ICountrySelected {
  label?: string | null
  value?: string | null
}

export interface ICountriesOptions {
  label: string,
  value: string,
  img: string
}

export interface ICategory {
  title: string,
  icon: string,
  total: number,
  color: string,
  today: number
}
