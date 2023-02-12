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

export  function validateNumericInput(event) {
  console.log("validate numeric input");
  console.log(event);
  console.log(event.target.value);
  console.log(typeof event.target.value);

  if (event.key == "Tab") {
    console.log("Tab");
    return true;
  }
  if (event.key.includes("Arrow")) {
    console.log("Arrow key");
    if (event.key.includes("Down")) {
      if (event.target.value > 0) return;
    } else {
      return;
    }
  }

  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(event.key))) {
    console.log("Number key");
    if (event.target.value == 0 && event.key != 0) {
      return true;
    } else {
      if (event.target.value > 0) return true;
      console.log("Negative value");
    }
  }

  if (event.key == "Backspace") {
    console.log("Backspace");
    if (event.target.value.charAt(0) != 0) {
      return true;
    } else {
      if (event.target.value.length > 1) return true;
    }
  }

  event.preventDefault();
  event.stopPropagation();
}