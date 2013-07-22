Puzzle 1: Order processing visualization
========================================

Background
----------
Shipwire warehouses are busy shipping worldwide orders around the clock. One of the engineers thought it would be educational to create a visualization of the order fulfillment process with a focus on the amount of time it takes to fill a box with all the requested items and make it ready for shipping. Given the large amount of orders, only a ten minute interval for a small order fulfillment team was selected for analysis.

The Problem
-----------
Write a program in your preferred language that calculates the missing parameters required to render order processing times on a canvas, similar to an appointment calendar. The canvas should be 600 pixels high (one pixel for each second of the 10 minute interval) and 800 pixels wide, with 5 pixels padding on the right and left sides.  Order processing times will be rendered to the canvas according to the following three rules (exemplified in the image at the bottom of the page):

Rules for the Visualization
---------------------------
1. There should be no visually overlapping processing times.
2. An order whose processing time overlaps with other order(s) should have the same width as those order(s).
3. An order should occupy the maximum possible width on the canvas while still observing the second rule.

The input to your program will be a JSON array of objects similar to the one below:

```json
[
  {"orderId": 5, "packingStart": 260, "duration": 60},
  {"orderId": 17, "packingStart": 270, "duration": 53},
]
```

In this array, for example, order ID 5 began packing at +260 seconds and packing took 60 seconds. All start times and durations in the input will be positive integers.

Since the object parameters will be used to draw boxes representing processing times on the canvas, the output from your program should be a JSON string that includes the original array of objects augmented with two extra data points (in pixels) for each object:

"left" – box distance from the left of the canvas.
"width" – width of the box.

Use the JSON string to create a web page styled like the image below which visualizes the following order processing times:

```json
[
  {"orderId": 1, "packingStart": 0, "duration": 160},
  {"orderId": 2, "packingStart": 510, "duration": 90},
  {"orderId": 3, "packingStart": 270, "duration": 128},
  {"orderId": 4, "packingStart": 320, "duration": 22},
  {"orderId": 5, "packingStart": 80, "duration": 53},
  {"orderId": 6, "packingStart": 316, "duration": 83},
  {"orderId": 7, "packingStart": 220, "duration": 44},
  {"orderId": 8, "packingStart": 341, "duration": 39},
  {"orderId": 9, "packingStart": 291, "duration": 73}
]
```

![Example](https://raw.github.com/somlor/order_visualization/master/example.jpg "Example visualization")
Example order visualization

