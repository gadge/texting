const sortKeysByLength =
  dict => dict.sort(([a], [b]) => String(b).length - String(a).length);

const makeReplaceable = function (dict) {
  if (this?.sort) sortKeysByLength(dict);
  Object.defineProperty(
    dict,
    Symbol.replace, {
      value(word, after) {
        for (let [curr, proj] of this) word = word.replace(curr, proj);
        return after ? after(word) : word
      },
      configurable: true,
      enumerable: false
    });
  return dict
};

const MakeReplaceable = ({ sort = true } = {}) => makeReplaceable.bind({ sort });

const translate = (word, dict) => {
  for (let [curr, proj] of dict) word = word.replace(curr, proj);
  return word.trim()
};

class Translator {
  constructor(dictionary) {
    this.dict = makeReplaceable(dictionary);
  }

  static build(dict, { sort = true } = {}) {
    if (sort) sortKeysByLength(dict);
    return new Translator(dict)
  }

  parse(word, after) { return word.replace(this.dict, after) }

  reboot(dict) { return dict ? (this.dict = (makeReplaceable(dict)), this) : this }
}

export { MakeReplaceable, Translator, makeReplaceable, translate };
