import SvelteDocumentSheet from "~/documents/DocumentSheet";
import ActorSheetShell from "./ActorSheetShell.svelte";

export default class SurgeActorSheet extends SvelteDocumentSheet {
  /**
   * Default Application options
   *
   * @returns {object} options - Application options.
   * @see https://foundryvtt.com/api/Application.html#options
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 440,
      height: 740,
      minWidth: 440,
      svelte: {
        class: ActorSheetShell,
        target: document.body,
      },
    });
  }
}

