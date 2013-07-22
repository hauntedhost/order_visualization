var OrderProcessing = (function () {

  // sort orders by property
  function sortOrdersBy(orders, property) {
    var orders = orders.slice(0);
    orders = orders.sort(function (a, b) {
      return a[property] - b[property];
    });
    return orders;
  }

  // detect if overlap exists between two orders
  function overlapExists(orderA, orderB) {
    var sortedOrders = sortOrdersBy([orderA, orderB], 'packingStart');
    orderA = sortedOrders[0];
    orderB = sortedOrders[1];

    if (orderB.packingStart <= (orderA.packingStart + orderA.duration)) {
      return true;
    }
    return false;
  }

  // group orders by overlap
  function groupOrders(orders) {
    var orders = sortOrdersBy(orders, 'packingStart');
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

  // add canvas properties to orders
  function addCanvasData(orders) {
    var groupedOrders = groupOrders(orders);
    var maxWidth = 800;
    var ordersCanvas = [];

    // iterate order groups and add canvas data
    for (var i = 0; i < groupedOrders.length; i++) {
      var ordersGroup = groupedOrders[i];
      var width = maxWidth / ordersGroup.length;

      for (var j = 0; j < ordersGroup.length; j++) {
        var order = ordersGroup[j];

        order.height = order.duration;
        order.width = width;
        order.left = width * j;
        ordersCanvas.push(order);
      }
    }
    return ordersCanvas;
  }

  return {
    process: addCanvasData
  };
})();

var json = '[\
  {"orderId": 0, "packingStart": 60, "duration": 29},\
  {"orderId": 1, "packingStart": 510, "duration": 47},\
  {"orderId": 2, "packingStart": 270, "duration": 128},\
  {"orderId": 3, "packingStart": 320, "duration": 22},\
  {"orderId": 4, "packingStart": 80, "duration": 53},\
  {"orderId": 5, "packingStart": 401, "duration": 33},\
  {"orderId": 6, "packingStart": 220, "duration": 44}\
]';

var orders = JSON.parse(json);
var ordersCanvas = OrderProcessing.process(orders);
console.log(ordersCanvas);

