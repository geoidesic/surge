<script>
  export let option;
  export let idx;
</script>

<template lang="pug">
  span {idx + 1}
    strong {option.label}
    img(src='{option.img}' width='14pt')

</template>

<style>
  span {
    display: flex;
    place-items: center;
    gap: 10pt;
    padding: 0;
    position: relative;
  }
  img {
    position: absolute;
    right: 0;
    top: -2px;
    border: none;
    height: 20px;
    width: 20px;
  }
</style>
