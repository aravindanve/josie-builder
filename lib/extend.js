function extend(factory) {
  const methods = [];

  factory.addMethod = function (name, fn) {
    if (name in factory) {
      throw new Error(
        `Method by name '${name}' already exists`);
    }
    if (methods.indexOf(name) === -1) {
      methods.push(name);
    }
    factory[name] = fn;

    return factory;
  };

  factory.removeMethod = function (name) {
    const index = methods.indexOf(name);

    if (index !== -1) {
      methods.splice(index, 1);
      delete factory[name];
    }

    return factory;
  };
}

module.exports = extend;
