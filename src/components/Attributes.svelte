<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import Attribute from "~/components/Attribute.svelte";
  import AttributeBlock from "~/components/AttributeBlock.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import { getContext } from "svelte";

  let cats = ["one", "two", "three"];
  let str = ["siz", "hid", "mus", "ton", "den"];
  let dex = ["spd", "flx", "agl", "bal", "coo"];
  let cha = ["com", "pre", "gab", "chr", "sta"];
  let int = ["mem", "dsc", "ins", "wil", "cog"];
  let per = ["sig", "hea", "sml", "tst", "tch"];
  let hlt = ["end", "imm", "fat", "wnd", "dis"];

  const doc = getContext("#doc");

  console.log("siz int", parseInt($doc.system.siz.currentValue));
  $: STR =
    (parseInt($doc.system.siz.currentValue) +
      parseInt($doc.system.hid.currentValue) +
      parseInt($doc.system.mus.currentValue) +
      parseInt($doc.system.ton.currentValue) +
      parseInt($doc.system.den.currentValue)) /
    5;

  $: DEX =
    (parseInt($doc.system.spd.currentValue) +
      parseInt($doc.system.flx.currentValue) +
      parseInt($doc.system.agl.currentValue) +
      parseInt($doc.system.bal.currentValue) +
      parseInt($doc.system.coo.currentValue)) /
    5;

  $: CHA =
    (parseInt($doc.system.com.currentValue) +
      parseInt($doc.system.pre.currentValue) +
      parseInt($doc.system.gab.currentValue) +
      parseInt($doc.system.chr.currentValue) +
      parseInt($doc.system.sta.currentValue)) /
    5;

  $: INT =
    (parseInt($doc.system.mem.currentValue) +
      parseInt($doc.system.dsc.currentValue) +
      parseInt($doc.system.ins.currentValue) +
      parseInt($doc.system.wil.currentValue) +
      parseInt($doc.system.cog.currentValue)) /
    5;

  $: PER =
    (parseInt($doc.system.sig.currentValue) +
      parseInt($doc.system.hea.currentValue) +
      parseInt($doc.system.sml.currentValue) +
      parseInt($doc.system.tst.currentValue) +
      parseInt($doc.system.tch.currentValue)) /
    5;

  $: HLT =
    (parseInt($doc.system.end.currentValue) +
      parseInt($doc.system.imm.currentValue) +
      parseInt($doc.system.fat.currentValue) +
      parseInt($doc.system.wnd.currentValue) +
      parseInt($doc.system.dis.currentValue)) /
    5;
</script>

<template lang="pug">
  ScrollingContainer

    .flexrow
      .flexcol.str
        .flexrow.title
          span.code STR 
          span.caption (Strength) 
          span.val {STR}
        AttributeBlock( codes="{str}")
      .flexcol.dex
        .flexrow.title
          span.code DEX 
          span.caption (Dexterity) 
          span.val {DEX}
        AttributeBlock( codes="{dex}")

    .flexrow
      .flexcol.cha
        .flexrow.title
          span.code CHA 
          span.caption (Charisma) 
          span.val {CHA}
        AttributeBlock( codes="{cha}")
      .flexcol.int
        .flexrow.title
          span.code INT 
          span.caption (Intellect) 
          span.val {INT}
        AttributeBlock( codes="{int}")

    .flexrow
      .flexcol.per
        .flexrow.title
          span.code PER 
          span.caption (Perception) 
          span.val {PER}
        AttributeBlock( codes="{per}")
      .flexcol.hlt
        .flexrow.title
          span.code HLT 
          span.caption (Health) 
          span.val {HLT}
        AttributeBlock( codes="{hlt}")


</template>

<style lang="scss" scoped>
  .title {
    font-size: 1.2rem;
    line-height: 2rem;
  }
  .caption {
    font-size: 0.8rem;
    vertical-align: bottom;
  }
  .str {
    background-color: var(--str-color-lighter);
  }
  .dex {
    background-color: var(--dex-color);
  }
  .cha {
    background-color: var(--cha-color);
  }
  .int {
    background-color: var(--int-color);
  }
  .hlt {
    background-color: var(--hlt-color);
  }
  .per {
    background-color: var(--per-color);
  }
</style>
