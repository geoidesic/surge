<script>
  import DocumentMultiSelect from "~/components/elements/DocumentMultiSelect.svelte";
  import { getContext } from "svelte";

  const Item = getContext("#doc");
  console.log($Item);
  const relevantTypes = ["feats", "races", "skills", "spells", "talents"];
  const compendiums = game.packs.filter((pack) => relevantTypes.includes(pack.collection.split()[1]));
  const itemOptions = compendiums
    .flatMap((pack) => pack.index)
    .filter((index) => index.type === "Item")
    .map((index) => pack.getDocument(index._id));
  const validIngameItems = game.items
    .filter((i) => i.id != $Item.id)
    .map((i) => {
      return {
        value: i.system.code || i.id,
        label: i.name + (i.system.code ? " [" + i.system.code + "]" : ""),
        img: i.img,
        name: i.name,
        code: i.code,
      };
    });
  itemOptions.push(game.items.filter((i) => i.system.code != $Item.code && relevantTypes.includes(i.type)));
</script>

<div {...$$restProps}>
  <DocumentMultiSelect
    bind:value={$Item.system.reqs.list}
    bind:selected={$Item.system.reqs.list}
    options={validIngameItems}
  />
</div>
