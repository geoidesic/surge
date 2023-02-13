export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function localize(string) {
  return game.i18n.localize(`LOCAL.${string}.label`);
}

export function getOptions() {
  const retVal = game.settings.get('titan', 'getCheckOptions') === true;
  return game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT) ? !retVal : retVal;
}

/**
 * 
 * @param {*} event 
 * @param {int} principal 
 * @returns {boolean, string} 
 * - false indicates a key that should propagate but should not cause an update 
 * - string indicates a key that should propagate and should process update
 * NB: event.target.value represents previous value, before requested update
 */
export function validateNumericInput(event, principal) {
  const value = parseInt(event.target.value);
  let reason = ''
  if (event.key == "Tab") {
    return false;
  }

  if (event.key.includes("Arrow")) {
    if (event.key.includes("Down")) {
      if (value > 0) return "down";
      reason = "Down target value < 0";
    } else if (event.key.includes("Up")) {
      if (value >= 0 && principal > 0) return "up";
      reason = "Up target value < 0 or principal <= 0";
    } else if (event.key.includes("Left") || event.key.includes("Right")) {
      return false; //<-- don't stop left or right keys from propagating, else we lose cursor control
    }
  }


  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(event.key))) {
    if (value == 0 && event.key != 0) {
      return event.key;
    } else {
      if (value > 0) return event.key;
      console.log("Negative value");
    }
    reason = "key pressed is zero and value is already zero";
  }

  if (event.key == "Backspace" || event.key == "Del" || event.key == "Delete") {
    if (!isNaN(value)) {
      const testVal = typeof value != "number" ? value : value.toString();
      if (testVal.length > 1) {
        return "delete";
      }
      if (testVal.charAt(0) == 0) {
        reason = "value is zero, cannot delete 0";
      } else {
        return "delete";
      }
    } else {
      reason = "value is not a number"
    }
  }
  console.log('validateNumericInput:- validation failed for reason: ' + reason)
  //- stop the on:keyup event from triggering
  event.preventDefault();
  event.stopPropagation();

  return false;

}