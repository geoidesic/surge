import SvelteDocumentSheet from "~/documents/DocumentSheet";
import ItemSheetShell from "./ItemSheetShell.svelte";

export default class SurgeActorSheet extends SvelteDocumentSheet {
  /**
   * Default Application options
   *
   * @returns {object} options - Application options.
   * @see https://foundryvtt.com/api/Application.html#options
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 500,
      height: 500,
      minWidth: 400,
      svelte: {
        class: ItemSheetShell,
        target: document.body,
      },
    });
  }
}

