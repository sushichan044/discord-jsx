import type {
  APIActionRowComponent,
  APIActionRowComponentTypes,
  ComponentType,
} from "discord-api-types/v10"
import type { APIButtonComponent } from "discord-api-types/v10"

import type { Child } from "./base"
import type { CamelToKebab } from "./utils/type"

export type DiscordElementCamelTag = keyof typeof ComponentType
export type DiscordElementKebabTag = `${CamelToKebab<DiscordElementCamelTag>}`
export type ElementTag = "view" | DiscordElementKebabTag

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Hord {
    type ViewAttributes = Record<string, never>
    type ActionRowAttributes = { children?: Child } & Omit<
      APIActionRowComponent<APIActionRowComponentTypes>,
      "components"
    >
    type ButtonAttributes = APIButtonComponent

    interface IntrinsicElements {
      "action-row": ActionRowAttributes
      "button": ButtonAttributes
      "view": ViewAttributes
    }
  }
}

export type IntrinsicElements = Hord.IntrinsicElements
