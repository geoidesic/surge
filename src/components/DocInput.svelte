<script>
  import { getContext } from "svelte";

  import { debounce } from "@typhonjs-fvtt/runtime/svelte/util";

  export let attr = void 0;

  const doc = getContext("#doc");

  const updateDebounce = debounce(update, 500);

  let data;

  $: data = $doc ? $doc?.[attr] : "";

  function update(event) {
    if ($doc) {
      $doc.update({ [attr]: event.target.value });
    }
  }
</script>

<input value={data} on:input={updateDebounce} />
