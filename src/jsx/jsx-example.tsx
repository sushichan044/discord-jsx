/** @jsxImportSource . */

import ActionRow from "./components/ActionRow"
import Button from "./components/Button"
import { render } from "./render"

console.dir(
  render(
    <ActionRow>
      <Button custom_id="huga" style="Success">
        hoge
      </Button>
    </ActionRow>,
  ),
  { depth: null },
)
