/** @jsxImportSource ../ */

import type { APIButtonComponentWithCustomId } from "discord-api-types/v10"

import { ButtonStyle } from "discord-api-types/v10"
import { ComponentType } from "discord-api-types/v10"

import type { FC } from "../base"

type ButtonProps = {
  children?: string | undefined
  style: Exclude<keyof typeof ButtonStyle, "Link">
} & Omit<APIButtonComponentWithCustomId, "label" | "style" | "type">

const Button: FC<ButtonProps> = ({ children, style, ...rest }) => {
  return (
    <button
      label={children}
      style={ButtonStyle[style]}
      type={ComponentType.Button}
      {...rest}
    ></button>
  )
}

export default Button
