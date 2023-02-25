<svelte:options accessors={true} />

<script>
  import { getContext } from "svelte";

  // The value of the input
  export let value;
  export let preventDefault = false;

  // Document reference
  const document = getContext("#doc");

  export let disabled = false;
</script>

<input
  class={$$props.class}
  type="checkbox"
  bind:checked={value}
  disabled={disabled || !$document.isOwner}
  on:change
  on:change={async () => {
    if (preventDefault) return;
    $document.update({
      system: $document.system,
      flags: $document.flags,
    });
  }}
/>
