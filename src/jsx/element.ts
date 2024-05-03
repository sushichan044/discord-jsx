import type { APIBaseComponent, ComponentType } from "discord-api-types/v10"

type ElementBase = APIBaseComponent<ComponentType>

export type ElementJson = ElementBase & Record<string, unknown>
