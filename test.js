function searchJson(json, searchKey) {
  const key = searchKey.toLowerCase();

  function deepSearch(current) {
    if (
      current !== null &&
      typeof current == "object" &&
      !Array.isArray(current)
    ) {
      const actualKey = Object.keys(current).find(
        (k) => k.toLowerCase() === key
      );
      if (actualKey) {
        return current[actualKey];
      }

      for (const value of Object.values(current)) {
        let res = deepSearch(value);
        if (res !== null) return res;
      }
    }

    if (Array.isArray(current)) {
      for (const obj of current) {
        let res = deepSearch(obj);
        if (res !== null) return res;
      }
    }

    return null;
  }

  return deepSearch(json);
}
