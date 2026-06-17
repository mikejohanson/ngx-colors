export class NgxColorsColor {
  preview!: string
  variants!: string[]
  constructor(params?: any) {
    if (params) {
      this.preview = params.preview
      this.variants = params.variants
    }
  }
}
