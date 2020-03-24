interface Action {
  [key: string]: string;
}

const usedPrefixes: string[] = [];

export const prefixActions = <T extends Action>(
  prefix: string,
  actions: T,
): T => {
  if (usedPrefixes.some((p) => prefix === p)) {
    console.warn(
      `Prefix "${prefix}" has already been used! This could result in a conflict.`,
    );
  }

  let copy = { ...actions };

  usedPrefixes.push(prefix);
  Object.keys(actions).map((key) => {
    copy = {
      ...copy,
      [key]: prefix + '.' + actions[key],
    };
  });
  return actions;
};
