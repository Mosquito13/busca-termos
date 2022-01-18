const searchUtils = {
  applyFilter(data, filter, mainLanguage) {
    let filterValue = filter.toLowerCase().trim();

    const matchStart = filterValue.charAt(0) === '"';
    const matchEnd = filterValue.charAt(filterValue.length - 1) === '"';

    if (matchStart) filterValue = filterValue.slice(1);
    if (matchEnd) filterValue = filterValue.slice(0, -1);

    return data[mainLanguage].filter((d) => {
      const id = `${d.id}`;
      const content = d.content.toLowerCase().trim();

      if (matchStart && matchEnd) {
        return id === filterValue || content === filterValue;
      }
      if (matchStart) {
        return id.startsWith(filterValue) || content.startsWith(filterValue);
      }
      if (matchEnd) {
        return id.endsWith(filterValue) || content.endsWith(filterValue);
      }
      return id.includes(filterValue) || content.includes(filterValue);
    });
  }
};

export default searchUtils;
