var json = '[\
  {"orderId": 0, "packingStart": 60, "duration": 29},\
  {"orderId": 1, "packingStart": 510, "duration": 47},\
  {"orderId": 2, "packingStart": 270, "duration": 128},\
  {"orderId": 3, "packingStart": 320, "duration": 22},\
  {"orderId": 4, "packingStart": 80, "duration": 53},\
  {"orderId": 5, "packingStart": 401, "duration": 33},\
  {"orderId": 6, "packingStart": 220, "duration": 44}\
]';

// sorted
// [ { orderId: 0, packingStart: 60, duration: 29 },
//   { orderId: 4, packingStart: 80, duration: 53 },
//   { orderId: 6, packingStart: 220, duration: 44 },
//   { orderId: 2, packingStart: 270, duration: 128 },
//   { orderId: 3, packingStart: 320, duration: 22 },
//   { orderId: 5, packingStart: 401, duration: 33 },
//   { orderId: 1, packingStart: 510, duration: 47 } ]

function sortOrders(orders) {
  orders = orders.sort(function (a,b) {
    return a.packingStart - b.packingStart;
  });
  return orders;
}

function overlapExists(orderA, orderB) {
  var orders = sortOrders([orderA, orderB]);

  orderA = orders[0];
  orderA.packingEnd = orderA.packingStart + orderA.duration;

  orderB = orders[1];
  orderB.packingEnd = orderB.packingStart + orderB.duration;

  if (orderB.packingStart <= orderA.packingEnd) {
    return true;
  }
  return false;
}

function groupOrders(orders) {
  var groupedOrders = [];
  var overlap = false;

  for (var i = 0; i < orders.length; i++) {

    if (overlap) {
      groupedOrders[groupedOrders.length - 1].push(orders[i]);
      overlap = false;
    } else {
      groupedOrders.push([orders[i]]);
    }

    for (var j = i + 1; j < orders.length; j++) {
      if (overlapExists(orders[i], orders[j])) {
        overlap = true;
        break;
      }
    }
  }
  return groupedOrders;
}

function addData(groupedOrders) {
  var maxWidth = 600;
  var ordersPlus = [];

  for (var i = 0; i < groupedOrders.length; i++) {
    var orders = groupedOrders[i];
    var width = maxWidth / orders.length;

    for (var j = 0; j < orders.length; j++) {
      var order = orders[j];

      order.width = width;
      order.left = width * j;
      ordersPlus.push(order);
    }
  }
  return ordersPlus;
}

var orders = JSON.parse(json);
var sortedOrders = sortOrders(orders);
var groupedOrders = groupOrders(sortedOrders);
var ordersPlus = addData(groupedOrders);

console.log(ordersPlus);
