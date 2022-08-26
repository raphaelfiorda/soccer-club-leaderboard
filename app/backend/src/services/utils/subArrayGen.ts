export default function subArrayGen(array: [], prop: string) {
  const result = [];
  let tempArray: any[] = [];
  for (let i = 0; i < array.length; i += 1) {
    if (tempArray.length === 0 || (array[i][prop] === tempArray[0][prop])) {
      tempArray.push(array[i]);
      if (i === array.length - 1) result.push(tempArray);
    } else {
      result.push(tempArray);
      tempArray = [array[i]];
    }
  }

  return result;
}
