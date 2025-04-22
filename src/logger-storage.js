export { all, filter, logs, errors, warns, infos } from "./filters";

import forage from "./configureForage";
import { stringify, parse } from "./utils";

export function sync(options) {
  options = options || {};

  const auto_start = "auto_start" in options ? options.auto_start : true;
  const reloadClear = "reloadClear" in options ? options.reloadClear : true;
  const isLogOutput = "isLogOutput" in options ? options.isLogOutput : true;

  const watchOnly =
    "only" in options
      ? options.only
      : ["error", "log", "info", "warn", "debug"];

  if (reloadClear) {
    forage.clear();
  }

  _onStorage(auto_start, watchOnly, isLogOutput);
}

function _onStorage(auto_start, watchOnly, isLogOutput) {
  const $_log = window.console.log;
  const $_debug = window.console.debug;
  const $_info = window.console.info;
  const $_error = window.console.error;
  const $_warn = window.console.warn;
  const $_group = window.console.group;
  const $_groupCollapsed = window.console.groupCollapsed;
  const $_groupEnd = window.console.groupEnd;
  const console = window.console;

  const isObject = text =>
    Object.prototype.toString.call(text) == "[object Object]";

  const isArray = text =>
    Object.prototype.toString.call(text) == "[object Array]";

  console.group = message => {
    if (isLogOutput) $_group(message);
  };

  console.groupEnd = () => {
    if (isLogOutput) $_groupEnd();
  };

  console.groupCollapsed = message => {
    if (isLogOutput) $_groupCollapsed(message);
  };

  console.debug = message => {
    if (isLogOutput) $_debug(message);

    if (isObject(message) || isArray(message)) return message;

    if (auto_start && watchOnly.includes("debug")) {
      logger(message, { type_event: "debug" });
    }

    return message;
  };

  console.error = message => {
    if (isLogOutput) $_error(message);

    if (isObject(message) || isArray(message)) return message;

    if (auto_start && watchOnly.includes("error")) {
      logger(message, { type_event: "error" });
    }

    return message;
  };

  console.log = message => {
    if (isLogOutput) $_log(message);

    if (isObject(message) || isArray(message)) return message;

    if (auto_start && watchOnly.includes("log")) {
      logger(message, { type_event: "log" });
    }

    return message;
  };

  console.warn = message => {
    if (isLogOutput) $_warn(message);

    if (isObject(message) || isArray(message)) return message;

    if (auto_start && watchOnly.includes("warn")) {
      logger(message, { type_event: "warn" });
    }

    return message;
  };

  console.info = message => {
    if (isLogOutput) $_info(message);

    if (isObject(message) || isArray(message)) return message;

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
    body: text || data.body,
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
