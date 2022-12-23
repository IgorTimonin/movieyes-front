export function moviesFinder(arr, query) {
  let resultList = arr.filter((el) =>
    el.nameRU.toLowerCase().includes(query.toLowerCase())
  );
if (resultList.length !== 0) {
  return resultList;
}
else {
  resultList = arr.filter((el) =>
    el.nameEN.toLowerCase().includes(query.toLowerCase())
  );
  return resultList;
}
}

export function shortFilmSorter(arr) {
  let resultList = arr.filter((el) => el.duration <= 40);
  return resultList;
}

export function timeToHour(time) {
  const hours = Math.floor(time / 60);
  let minutes = Math.floor(time % 60);
  const newTime = `${hours === 0 ? '' : `${hours}ч`} ${
    minutes < 10 ? '0' : ''
  }${minutes}мин`;
  return newTime;
}
