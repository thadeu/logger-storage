export { all, filter, logs, errors, warns, infos } from "./filters";

import forage from "./configureForage";
import { stringify, parse } from "./utils";

export function sync(options) {
  options = options || {};

  const auto_start = "auto_start" in options ? options.auto_start : true;
  const reloadClear = "reloadClear" in options ? options.reloadClear : true;
  const watchOnly =
    "only" in options
      ? options.only
      : ["error", "log", "info", "warn", "debug"];

  if (reloadClear) {
    forage.clear();
  }

  _onStorage(auto_start, watchOnly);
}

function _onStorage(auto_start, watchOnly) {
  const $_log = window.console.log;
  const $_info = window.console.info;
  const $_error = window.console.error;
  const $_warn = window.console.warn;
  const console = window.console;

  console.error = message => {
    $_error(message);

    if (auto_start && watchOnly.includes("error")) {
      logger(message, { type_event: "error" });
    }

    return message;
  };

  console.log = message => {
    $_log(message);

    if (auto_start && watchOnly.includes("log")) {
      logger(message, { type_event: "log" });
    }

    return message;
  };

  console.warn = message => {
    $_warn(message);

    if (auto_start && watchOnly.includes("warn")) {
      logger(message, { type_event: "warn" });
    }

    return message;
  };

  console.info = message => {
    $_info(message);

    if (auto_start && watchOnly.includes("info")) {
      logger(message, { type_event: "info" });
    }

    return message;
  };
}

export async function logger(text, data = {}) {
  let item = {
    ...data,
    type_event: data.type_event || "log",
    body: JSON.stringify(text || data.body),
    timestamp:
      "timestamp" in data ? data.timestamp : parse(stringify(new Date()))
  };

  try {
    return forage.setItem(`${STORAGE_KEY}@${Date.now()}`, item);
  } catch (domException) {
    if (
      domException.name === "QuotaExceededError" ||
      domException.name === "NS_ERROR_DOM_QUOTA_REACHED"
    ) {
      clear();
    }
  }
}

export function clear() {
  return forage.clear();
}
