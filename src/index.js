import "./styles/Fonts.scss";
import "./styles/Variables.scss";
import "./styles/Mixins.scss";
import "./styles/Animations.scss";
import "./styles/Global.scss";

import SurgeActorSheet from "./sheets/actor/ActorSheet";
import SurgeItemSheet from "./sheets/item/ItemSheet";

//- set to true to see which hooks get called
CONFIG.debug.hooks = true;

Hooks.once("init", async () => {
  console.log("SURGE | Starting Surge VTTRPG System");

  Actors.registerSheet("surge", SurgeActorSheet, {
    makeDefault: true,
  });
  Items.registerSheet("surge", SurgeItemSheet, {
    makeDefault: true,
  });

  return;
});

