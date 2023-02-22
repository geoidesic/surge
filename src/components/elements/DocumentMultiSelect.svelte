<script>
  import MultiSelect from "svelte-multiselect";
  import PrerequisiteSelectImage from "~/components/elements/PrerequisiteSelectImage.svelte";
  import { getContext } from "svelte";

  export let value;
  export let options = undefined;

  export let disabled = false;

  // Document reference
  const document = getContext("#doc");
</script>

<MultiSelect
  {...$$restProps}
  bind:options
  bind:value
  disabled={disabled || !$document.isOwner}
  on:change={async () => {
    $document.update({
      system: $document.system,
      flags: $document.flags,
    });
    console.log($document);
    console.log($document);
  }}
>
  <PrerequisiteSelectImage let:idx {idx} let:option {option} slot="option" />
</MultiSelect>
