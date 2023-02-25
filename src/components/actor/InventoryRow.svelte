<script>
</script>

<template lang="pug">
  li(class="{$$restProps.class} flexrow")
    div.flex0
      slot(name="c1")
    .flex3.left.ml-xl
      slot(name="c2")
    .flex1.left
      slot(name="c3")
    .flex1
      slot(name="c4")
    .flex1
      slot(name="c5")
    .flex1
      slot(name="c6")
    .flex1.actions.right 
      slot(name="c7")
</template>

<style lang="scss" scoped>
  .flexrow {
    gap: 2px;
  }
</style>
