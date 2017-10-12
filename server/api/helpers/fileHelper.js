'use strict';

exports.findOneById = function (array, id) {
  return exports.findOne(array, 'id', id);
}

exports.findOne = function (array, key, value) {
  for (var i in array) {
    if (array[i][key] == value)
      return array[i];
  }
  return null;
}

exports.updateOneById = function (array, id, newValues) {
  return exports.updateOne(array, 'id', id, newValues);
}

exports.updateOne = function (array, key, value, newValues) {
  var elem = exports.findOne(array, key, value);
  if (!elem)
    return null;

  for (var attribute in newValues) {
    if (attribute === 'id' || !elem[attribute])
      continue;
    elem[attribute] = newValues[attribute];
  }

  return elem;
}

exports.removeOneById = function (array, id) {
  return exports.removeOne(array, 'id', id);
}

exports.removeOne = function (array, key, value) {
  var index;
  for (var i in array) {
    if (array[i][key] == value) {
      index = i;
      break;
    }
  }
  if (index) {
    array.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

exports.create = function (array, id, fields, values) {
  var elem = {};
  elem["id"] = id;
  for (var i in fields) {
    if (values[fields[i]]) {
      elem[fields[i]] = values[fields[i]];
    } else {
      elem[fields[i]] = "";
    }
  }
  array.push(elem);
  return elem;
}
