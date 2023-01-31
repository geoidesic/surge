<script>
  import { getContext } from "svelte";
  import { debounce } from "@typhonjs-fvtt/runtime/svelte/util";
  import _ from "lodash";

  export let attr = void 0;
  export let label = "";

  const doc = getContext("#doc");

  const updateDebounce = debounce(update, 500);

  console.log(doc); //TJSDocument
  console.log($doc); //Actor

  let data;

  // $: if (attr.includes("system.")) {
  //   data = $doc ? $doc?.system[attr] : "";
  // } else {
  //   data = $doc ? $doc?.[attr] : "";
  // }

  function update(event) {
    if ($doc) {
      if (attr.includes("system.")) {
        console.log("attr", attr);
        console.log("value", event.target.value);
        // const obj = { system: {} };
        // _.set(obj, attr, event.target.value);
        // console.log("obj", obj);
        $doc.update({
          system: $doc.system,
          flags: $doc.flags,
          name: $doc.name,
        });
      } else {
        $doc.update({ [attr]: event.target.value });
      }
    }
  }
</script>

<label class="flexrow">
  {label}
  <input value={data} on:input={updateDebounce} />
</label>
