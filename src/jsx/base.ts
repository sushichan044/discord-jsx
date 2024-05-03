import { ComponentType } from "discord-api-types/v10"

import type { ElementJson } from "./element"
import type {
  DiscordElementCamelTag,
  DiscordElementKebabTag,
  IntrinsicElements as IntrinsicElementsDefined,
} from "./intrinsic-elements"

import { toCamel } from "./utils/string"

export type Child = Child[] | JSXElement | string | null | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props = Record<string, any>
export type FC<P = Props> = (props: P) => JSXElement

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = JSXElement
    type IntrinsicElements = IntrinsicElementsDefined
    type ElementChildrenAttribute = { children: Child }
  }
}

export class JSXElement {
  children: Child[]
  props: Props
  // eslint-disable-next-line @typescript-eslint/ban-types
  tag: DiscordElementKebabTag | Function

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    tag: DiscordElementKebabTag | Function,
    props: Props,
    children: Child[],
  ) {
    this.tag = tag
    this.props = props
    this.children = children
  }

  toJson(): ElementJson {
    if (this.children.length > 5) {
      throw new Error("Too many children!")
    }
    const tag = this.tag as DiscordElementKebabTag

    switch (tag) {
      case "action-row":
        return {
          type: ComponentType.ActionRow,
          ...this.props,
          components: this.children.map((child) => {
            if (child instanceof JSXElement) {
              try {
                return child.toJson()
              } catch {
                return null
              }
            }
            return child
          }),
        }
      default:
        return {
          type: ComponentType[toCamel(tag) as DiscordElementCamelTag],
          ...this.props,
        }
    }
  }
}

export class JSXFunctionElement extends JSXElement {
  toJson(): ElementJson {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/ban-types
    const res = (this.tag as Function).call(null, {
      ...this.props,
      children: this.children.length <= 1 ? this.children[0] : this.children,
    })

    if (!(res instanceof JSXElement)) {
      throw new Error("Invalid return value")
    }
    return res.toJson()
  }
}

export const jsx = (
  tag: DiscordElementKebabTag,
  props: Props,
  ...children: Child[]
): JSXElement => {
  return jsxFn(tag, props, children)
}

export const jsxFn = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  tag: DiscordElementKebabTag | Function,
  props: Props,
  children: Child[],
): JSXElement => {
  if (typeof tag === "function") {
    return new JSXFunctionElement(tag, props, children)
  }
  return new JSXElement(tag, props, children)
}
