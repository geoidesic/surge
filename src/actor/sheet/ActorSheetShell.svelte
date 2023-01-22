<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { debounce } from "@typhonjs-fvtt/runtime/svelte/util";
  import { getContext, setContext } from "svelte";
  import DocInput from "~/components/DocInput.svelte";

  export let attr = void 0;

  export let elementRoot;
  export let storeDoc;
  export let document;

  setContext("#doc", storeDoc);

  const updateDebounce = debounce(update, 500);
  const { application } = getContext("external");
  let data;

  $: data = $storeDoc ? $storeDoc?.[attr] : "";

  function update(event) {
    if ($storeDoc) {
      $storeDoc.update({ [attr]: event.target.value });
    }
  }
  console.log(game);
  console.log(storeDoc);
  console.log(document);
  console.log(application);
</script>

<ApplicationShell bind:elementRoot>
  <p>{document.name}</p>
  <DocInput attr={name} />
</ApplicationShell>
