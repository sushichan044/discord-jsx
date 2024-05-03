const toCamel = <T extends string>(str: T) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  )

export { toCamel }
