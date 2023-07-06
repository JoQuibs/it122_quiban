const data = [
    {
        key: 1,
        name: "Car",
        category: "Automobile",
        price: 25000,
        type: "Red"
    },
    {
        key: 2,
        name: "Guitar",
        category: "Musical Instrument",
        price: 799,
        type: "Fender"
    },
    {
        key: 3,
        name: "Plant",
        category: "Home Decor",
        price: 25,
        type: "Fern"
    },
    {
        key: 4,
        name: "Watch",
        category: "Accessories",
        price: 199,
        type: "Casio"
    },
    {
        key: 5,
        name: "Camera",
        category: "Electronics",
        price: 999,
        type: "20 megapixels"
    }
];

// Method to get all items from the array
function getAll() {
  return data;
}

// Method to get an array based on a requested key and value
function getItem(key, value) {
  const item = data.find(item => item[key] === value);
  return { item, key: item ? item.key : null };
}

module.exports = {
  getAll,
  getItem,
};