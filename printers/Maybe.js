function create({ PrettyPrinter }) {
  class MaybePrinter extends PrettyPrinter {
    constructor() {
      super(".*Maybe<.*>.*");
    }

    async valueHint(variable) {
      const expanded = await variable.children();
      const base = await expanded[0].children();
      const isSome = base[1].value[0] == '1';
      if (!isSome) {
        variable.value = `${variable.type} = Nothing`;
        variable.toLiteral();
      }
    }

    async valueExpanded(variables) {
      const value = variables.value(0);
      if (value && value.hasChildren()) {
        const base = await value.children();
        const storage = await base[0].children();
        const some = await storage[0].children();
        variables.clear();
        for (let v of await some[0].children()) {
          variables.push(v);
        }
      }
    }
  }

  return new MaybePrinter();
}

module.exports = { create }
