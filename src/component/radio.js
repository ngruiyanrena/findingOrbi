import { Radio } from "@supabase/ui";
import { useState } from "react";

export default function RadioControlled() {
  const [value, setValue] = useState("Novice");

  function handleOnChange(e) {
    setValue(e.target.value);
  }

  return (
    <Radio.Group value={value} onChange={handleOnChange} name="radio-basic">
      <Radio label="Team member" value="1" />
      <Radio label="Team leader" value="1" />
      <Radio label="Basic Radio 2" value="Expert" />
    </Radio.Group>
  );
}