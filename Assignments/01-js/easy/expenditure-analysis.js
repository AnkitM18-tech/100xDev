/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];
  let spentByCategory = {};
  transactions.forEach((transaction) => {
    if (!(`${transaction.category}` in spentByCategory)) {
      spentByCategory[`${transaction.category}`] = transaction.price;
    } else {
      spentByCategory[`${transaction.category}`] += transaction.price;
    }
  });
  for (let key in spentByCategory) {
    result.push({ category: key, totalSpent: spentByCategory[key] });
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
