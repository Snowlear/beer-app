export const arrayUnique = (array: any[]): any[] => {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (compareObjects(a[i], a[j])) a.splice(j--, 1);
    }
  }

  return a;
};

export const compareObjects = (obj1: any, obj2: any): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

export function concatUniquely(array1: any[], array2: any[]) {
  return arrayUnique(array1.concat(array2));
}
