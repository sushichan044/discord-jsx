import type { Child, JSXElement, Props } from "./base"
import type { DiscordElementKebabTag } from "./intrinsic-elements"

import { jsxFn } from "./base"

export function jsxDEV(
  // eslint-disable-next-line @typescript-eslint/ban-types
  tag: DiscordElementKebabTag | Function,
  props: Props,
): JSXElement {
  let node: JSXElement
  if (!props || !("children" in props)) {
    node = jsxFn(tag, props, [])
  } else {
    const children = props.children as Child
    delete props.children
    node = Array.isArray(children)
      ? jsxFn(tag, props, children)
      : jsxFn(tag, props, [children])
  }
  return node
}
