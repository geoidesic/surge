<script>
  export let level = void 0;
  export let level = void 0;
</script>

<!--Total Value-->
<div class="tag {level == level ? '' : level > level ? 'greater' : 'lesser'}">
  {level}
</div>

<style lang="scss">
  @import "../../../Styles/Mixins.scss";

  .tag {
    @include flex-row;
    @include flex-group-center;
    @include border;
    @include label;
    @include mod-colors;
    width: 100%;
    height: 100%;
  }
</style>
