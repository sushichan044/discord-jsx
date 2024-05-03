export type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${CamelToKebab<U>}`
    : `${Uncapitalize<T>}-${CamelToKebab<U>}`
  : ""

export type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<KebabToCamel<U>>}`
  : S
