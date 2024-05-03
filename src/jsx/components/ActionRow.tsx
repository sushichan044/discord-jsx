/** @jsxImportSource ../ */

import { ComponentType } from "discord-api-types/v10"

import type { Child, FC } from "../base"

const ActionRow: FC<{ children: Child }> = ({ children }) => {
  return <action-row type={ComponentType.ActionRow}>{children}</action-row>
}

export default ActionRow
