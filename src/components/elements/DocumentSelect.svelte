<script>
  import Select from "~/helpers/svelte-components/select/Select.svelte";
  import { getContext } from "svelte";

  // The value of the input
  export let value;
  export let options;

  export let disabled = false;

  // Document reference
  const document = getContext("#doc");
</script>

<Select
  bind:options
  bind:value
  disabled={disabled || !$document.isOwner}
  on:change
  on:change={async () => {
    $document.update({
      system: $document.system,
      flags: $document.flags,
    });
  }}
>
  <slot />
</Select>
