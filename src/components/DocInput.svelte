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

  $: if (attr.includes("system.")) {
    const split = attr.split(".");
    console.log(split);
    data = $doc ? $doc?.system[split[1]] : "";
  } else {
    data = $doc ? $doc?.[attr] : "";
  }

  console.log(data);
  console.log(attr);
  console.log(attr.includes("system."));
  console.log($doc.system);

  function update(event) {
    if ($doc) {
      $doc.update({ [attr]: event.target.value });
    }
  }
</script>

<label class="flexrow">
  {label}
  <input value={data} on:input={updateDebounce} />
</label>
