<script>
  export let options = void 0;
  export let value = void 0;
  console.log("Select value: " + value);
  export let disabled = false;
</script>

<select bind:value on:change selected={value} {disabled}>
  {#if options && options.length}
    {#each options as option}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  {/if}
  <slot />
</select>

<style lang="scss">
  @import "../../../styles/Mixins.scss";

  select {
    @include input;

    &:disabled {
      @include input-disabled;
    }
  }
</style>
