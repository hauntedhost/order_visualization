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
  function groupOverlapOrders(orders) {
    var orders = sortOrdersBy(orders, 'packingStart');

    var assignedOrders = [];
    var groupedOrders = [];

    for (var i = 0; i < orders.length; i++) {
      // add order to new group if unassigned
      if (assignedOrders.indexOf(orders[i].orderId) <= -1) {
        groupedOrders.push([orders[i]]);
        assignedOrders.push(orders[i].orderId);        
      }

      // search next orders for overlaps
      for (var j = i + 1; j < orders.length; j++) {
        // add overlap to current group if unassigned
        if (overlapExists(orders[i], orders[j])) {
          if (assignedOrders.indexOf(orders[j].orderId) <= -1) {
            var currentGroupIndex = groupedOrders.length - 1;
            groupedOrders[currentGroupIndex].push(orders[j]);      
            assignedOrders.push(orders[j].orderId);            
          }
        }
      }
    }
    console.log(groupedOrders);
    return groupedOrders;
  }

  // add canvas properties to orders
  function addCanvasData(orders) {
    var groupedOrders = groupOverlapOrders(orders);
    var maxWidth = 800;
    var ordersCanvas = [];

    // iterate order groups and add canvas data
    for (var i = 0; i < groupedOrders.length; i++) {
      var ordersGroup = groupedOrders[i];
      var width = maxWidth / ordersGroup.length;

      for (var j = 0; j < ordersGroup.length; j++) {
        var order = ordersGroup[j];

        order.height = order.duration; // redundant property but sugar
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

// var json = '[\
//   {"orderId": 1, "packingStart": 0, "duration": 160},\
//   {"orderId": 2, "packingStart": 510, "duration": 90},\
//   {"orderId": 3, "packingStart": 270, "duration": 128},\
//   {"orderId": 4, "packingStart": 320, "duration": 22},\
//   {"orderId": 5, "packingStart": 80, "duration": 53},\
//   {"orderId": 6, "packingStart": 371, "duration": 33},\
//   {"orderId": 7, "packingStart": 220, "duration": 44}\
// ]';

// var orders = JSON.parse(json);

// // process adds width, left and height
// var ordersCanvas = OrderProcessing.process(orders);

