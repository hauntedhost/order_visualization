json = '[
  {"orderId": 1, "packingStart": 60, "duration": 29},
  {"orderId": 2, "packingStart": 510, "duration": 47},
  {"orderId": 3, "packingStart": 270, "duration": 128},
  {"orderId": 4, "packingStart": 320, "duration": 22},
  {"orderId": 5, "packingStart": 80, "duration": 53},
  {"orderId": 6, "packingStart": 401, "duration": 33},
  {"orderId": 7, "packingStart": 220, "duration": 44}
]';

orders = JSON.parse(json);
console.log(orders);
