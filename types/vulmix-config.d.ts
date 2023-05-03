export interface VulmixConfig {
  lang?: string

  head?: {
    title?: string

    meta?: {
      charset?: string
      name?: string
      property?: string
      'http-equiv'?: string
      content?: string
    }[]

    link?: {
      rel?: string
      sizes?: string
      href?: string
    }[]
  }
}
