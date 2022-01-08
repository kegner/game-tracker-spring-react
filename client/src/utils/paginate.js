const paginate = (items, count) => {
  count = Math.max(count, 1);
  let paginatedItems = [];
  let itemPage = [];
  for (let i = 0; i < items.length; i++) {
    if (i !== 0 && i % count === 0) {
      paginatedItems.push(itemPage);
      itemPage = [];
    }
    itemPage.push(items[i]);
  }

  if (itemPage.length > 0) {
    paginatedItems.push(itemPage);
  }

  if (paginatedItems.length === 0) {
    paginatedItems.push([]);
  }

  return paginatedItems;
}

export default paginate;