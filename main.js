// === DEFINITIONS ===
var PPI = 72;

var POSITION_X = {
  NOT_SET: 0,
  LEFT: 1,
  RIGHT: 2,
  CENTER: 3
}

var POSITION_Y = {
  NOT_SET: 0,
  TOP: 1,
  BOTTOM: 2,
  CENTER: 3
}

// === INIT ===
function onInstall(event) { onOpen(event); }

function onOpen(event) {
  SlidesApp.getUi().createAddonMenu()
    .addSubMenu(SlidesApp.getUi().createMenu('Precision snap')
      .addItem('Dimension', 'menuSnapDimension')
      .addItem('Position', 'menuSnapPosition')
      .addItem('Rotation', 'menuSnapRotation')
      .addItem('Straighten elements', 'menuZeroRotation'))
    .addSubMenu(SlidesApp.getUi().createMenu('Copy attributes')
      .addItem('Width', 'menuCopyWidth')
      .addItem('Height', 'menyCopyHeight')
      .addItem('Width and height', 'menuCopyWidthAndHeight')
      .addItem('Rotation', 'menuCopyRotation'))
    .addSeparator()
    .addSubMenu(SlidesApp.getUi().createMenu('Adjoin')
      .addItem('Horizontally', 'menuAdjoinH')
      .addItem('Vertically', 'menuAdjoinV'))
    .addSubMenu(SlidesApp.getUi().createMenu('Align to inner edge')
      .addItem('Left', 'menuAlignToInnerLeft')
      .addItem('Right', 'menuAlignToInnerRight')
      .addItem('Horizontal center', 'menuAlignToHorizontalCenter')
      .addSeparator()
      .addItem('Top', 'menuAlignToInnerTop')
      .addItem('Bottom', 'menuAlignToInnerBottom')
      .addItem('Vertical center', 'menuAlignToVerticalCenter'))
    .addSubMenu(SlidesApp.getUi().createMenu('Align to outer edge')
      .addItem('Left', 'menuAlignToOuterLeft')
      .addItem('Right', 'menuAlignToOuterRight')
      .addSeparator()
      .addItem('Top', 'menuAlignToOuterTop')
      .addItem('Bottom', 'menuAlignToOuterBottom'))
    .addItem('Center on page', 'menuCenterOnPage')
    .addSubMenu(SlidesApp.getUi().createMenu('Flip')
      .addItem('Horizontally', 'menuFlipH')
      .addItem('Vertically', 'menuFlipV')
      .addItem('Both', 'menuFlipHV'))
    .addSeparator()
    .addSubMenu(SlidesApp.getUi().createMenu('Set transparency')
      .addItem('100% (transparent)', 'menuSetTransparency0')
      .addItem('90%', 'menuSetTransparency10')
      .addItem('75%', 'menuSetTransparency25')
      .addItem('66%', 'menuSetTransparency33')
      .addItem('50%', 'menuSetTransparency50')
      .addItem('33%', 'menuSetTransparency66')
      .addItem('25%', 'menuSetTransparency75')              
      .addItem('10%', 'menuSetTransparency90')              
      .addItem('0% (opaque)', 'menuSetTransparency100'))
    .addSubMenu(SlidesApp.getUi().createMenu('Set color')
      .addItem('Swap text with background', 'menuSetColorSwap')
      .addItem('Invert background colors', 'menuSetColorInverse')
      .addItem('Max text contrast', 'menuSetColorMaxContrast'))
    .addSeparator()
    .addSubMenu(SlidesApp.getUi().createMenu('Text')
      .addItem('Merge text boxes', 'menuMergeShapeText')
      .addItem('Split text boxes', 'menuSplitShapeText'))
    .addSeparator()
    .addItem('About', 'menuShowAboutPrompt')
    .addToUi();
}

// === MENU FUNCTIONS ===
function menuSnapPosition()  { withSelectedOrAllElements(function(e) { snapElement(e, true, false, false); }); }
function menuSnapDimension() { withSelectedOrAllElements(function(e) { snapElement(e, false, true, false); }); }
function menuSnapRotation()  { withSelectedOrAllElements(function(e) { snapElement(e, false, false, true); }); }
function menuZeroRotation()  { withSelectedOrAllElements(function(e) { e.setRotation(0); }); }

function menuCopyWidth()          { resizeElementsToLastSelected(true,  false, false); }
function menuCopyHeight()         { resizeElementsToLastSelected(false,  true, false); }
function menuCopyWidthAndHeight() { resizeElementsToLastSelected(true,   true, false); } 
function menuCopyRotation()       { resizeElementsToLastSelected(false, false,  true); } 

function menuAdjoinH() { adjoinSelectedElements(true,  true, 0*PPI); }
function menuAdjoinV() { adjoinSelectedElements(false, true, 0*PPI); }

function menuAlignToInnerLeft()        { alignSelectOrAllElements(POSITION_X.LEFT, POSITION_Y.NOT_SET, false); }
function menuAlignToInnerRight()       { alignSelectOrAllElements(POSITION_X.RIGHT, POSITION_Y.NOT_SET, false); }
function menuAlignToInnerTop()         { alignSelectOrAllElements(POSITION_X.NOT_SET, POSITION_Y.TOP, false); }
function menuAlignToInnerBottom()      { alignSelectOrAllElements(POSITION_X.NOT_SET, POSITION_Y.BOTTOM, false); }
function menuAlignToOuterLeft()        { alignSelectOrAllElements(POSITION_X.LEFT, POSITION_Y.NOT_SET, true); }
function menuAlignToOuterRight()       { alignSelectOrAllElements(POSITION_X.RIGHT, POSITION_Y.NOT_SET, true); }
function menuAlignToOuterTop()         { alignSelectOrAllElements(POSITION_X.NOT_SET, POSITION_Y.TOP, true); }
function menuAlignToOuterBottom()      { alignSelectOrAllElements(POSITION_X.NOT_SET, POSITION_Y.BOTTOM, true); }
function menuAlignToVerticalCenter()   { alignSelectOrAllElements(POSITION_X.NOT_SET, POSITION_Y.CENTER, false); }
function menuAlignToHorizontalCenter() { alignSelectOrAllElements(POSITION_X.CENTER, POSITION_Y.NOT_SET, false); }

function menuSetTransparency0()   { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0   ); }); }
function menuSetTransparency10()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.1 ); }); }
function menuSetTransparency25()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.25); }); }
function menuSetTransparency33()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.33); }); }
function menuSetTransparency50()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.5 ); }); }
function menuSetTransparency66()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.66); }); }
function menuSetTransparency75()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.75); }); }
function menuSetTransparency90()  { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 0.9 ); }); }
function menuSetTransparency100() { withSelectedOrAllShapes(function(s) { setAlphaToShape(s, 1   ); }); }

function menuSetColorSwap()        { withSelectedOrAllShapes(function(s) {           swapColorsOnShape(s); }); }
function menuSetColorInverse()     { withSelectedOrAllShapes(function(s) {         invertColorsOnShape(s); }); }
function menuSetColorMaxContrast() { withSelectedOrAllShapes(function(s) { setMaxContrastToTextOnShape(s); }); }

function menuCenterOnPage() { withSelectedOrAllElements(function(e) { alignShape(fakePageAsReferenceElement(), e, POSITION_X.CENTER, POSITION_Y.CENTER, false); }); }

function menuFlipH()  { flipLastTwoSelectedElements(true,  false); }
function menuFlipV()  { flipLastTwoSelectedElements(false, true);  }
function menuFlipHV() { flipLastTwoSelectedElements(true,  true);  }

// It's worth noting that Google Slides' biggest issues is that it does not guaraantee the order
//   of selected elements in the array, except for the last element. With that, while this function
//   will merge if more than 2 text boxes are selected. the order of the 2nd to the n-th will not
//   be deterministic to the user. Consider only merging when exactly 2 elements are selected if this
//   starats becoming a problem for users.
function menuMergeShapeText() {
  var selectedShapes = getSelectedShapesOnPage(false);

  if (selectedShapes.length < 2) // need two or more elements to flip
    return;

  var referenceShape = selectedShapes.pop();
  selectedShapes.forEach(function(s) { mergeTextAndDeleteShape(referenceShape, s); });
}

function menuSplitShapeText() {
  // Step 1: text must be selected (or cursor positioned somewhere)
  if (SlidesApp.getActivePresentation().getSelection().getSelectionType() != SlidesApp.SelectionType.TEXT)
    return;

  // Step 2: parent element must be a SHAPE; don't know how to deal with other elements and will maybe add TABLE handling functionality later
  var parentElement = SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()[0]; // there should only be one in this case, because text was selected
  if (parentElement.getPageElementType() != SlidesApp.PageElementType.SHAPE)
    return;

  var selectedTextRange = SlidesApp.getActivePresentation().getSelection().getTextRange();
  splitShapeText(
    parentElement.asShape(),
    selectedTextRange.getStartIndex(),
    selectedTextRange.getEndIndex());
}

// Cases:
//   A.  |aaabbbccc\n   => [][][aaabbbccc]\n
//   B.  aaabbbccc|\n   => [aaabbbccc][][]\n
//   C.  [aaabbbccc]\n  => [][aaabbbccc][]\n
//   C2. [aaabbbccc\n]  => [][aaabbbccc][]\n
//   E.  aaa|bbbccc\n   => [aaa][][bbbccc]\n
//   F.  [aaa]bbbccc\n  => [][aaa][bbbccc]\n
//   G.  aaabbb[ccc]\n  => [aaabbbb][ccc][]\n
//   G2. aaaabbb[ccc\n] => [aaabbb][ccc][]\n
//   H.  aaa[bbb]ccc\n  => [aaa][bbb][ccc]\n
//   I.  aaabbbccc[\n]  => [aaabbbccc][][]\n
function splitShapeText(originalShape, selectionStartIndex, selectionEndIndex) {
  var ABS_START_INDEX = 0;
  var   ABS_END_INDEX = originalShape.getText().getEndIndex() - 1; // because there's always a new line char at the end of every shape

  selectionEndIndex = Math.min(ABS_END_INDEX, selectionEndIndex); // makes sure to always disconsider selection of new line char on cases C2 and G2

  var marker0 = [ABS_START_INDEX, selectionStartIndex];
  var marker1 = [selectionStartIndex, selectionEndIndex];
  var marker2 = [selectionEndIndex, ABS_END_INDEX];

  var i = 1;

  // It would be elegant to transform the following code into a loop, but the way selection works
  //   guarantees it will always be two iterations, so might as well just break it down for clarity
  //   sake.
  if (marker1[0] != marker1[1]) {
    var newShape1 = originalShape.duplicate().asShape();
    newShape1.setLeft(newShape1.getLeft() + i*(originalShape.getLeft() + originalShape.getWidth()));
    newShape1.getText().clear();
    newShape1.getText().insertRange(0, originalShape.getText().getRange(marker1[0], marker1[1]));
    i++;
  }

  if (marker2[0] != marker2[1]) {
    var newShape2 = originalShape.duplicate().asShape();
    newShape2.setLeft(newShape2.getLeft() + i*(originalShape.getLeft() + originalShape.getWidth()));
    newShape2.getText().clear();
    newShape2.getText().insertRange(0, originalShape.getText().getRange(marker2[0], marker2[1]));
  }

  originalShape.getText().clear(marker0[1], ABS_END_INDEX); // checking whether indexes are different is not necessary since clear on the same position produced no effect :)
}

function menuShowAboutPrompt() {
  var message = "Slides Power Toys is a simple, free and open source extension that adds some handy functions to Google Slides and make it behave like Microsoft PowerPoint.\n\nTHESE CAPABILITIES ARE PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND. Use them at your own risk as they are NOT endorsed nor supported by Google.\n\nFor user's guide, license and to report an issue, refer to the website at http://carlosmendonca.github.io/Slides-Power-Toys.";
  var ui = SlidesApp.getUi();
  ui.alert(
    "Slides Power Toys",
    message,
    ui.ButtonSet.OK);
}

// === MENU AUX FUNCTIONS
function flipLastTwoSelectedElements(shouldFlipH, shouldFlipV) {
  var selectedElements = getSelectedElementsOnPage(false);

  if (selectedElements.length < 2) // need two or more elements to flip
    return;
  
  flipTwoElements(selectedElements.pop(), selectedElements.pop(), shouldFlipH, shouldFlipV); // order of elements does not matter
}

function adjoinSelectedElements(shouldAdjoinInHorizontalDirection, shouldCenterOnFirst, paddingPoints) {
  var elementArray = getSelectedElementsOnPage(false); // will not fallback to all elements on page, but maybe revist this later...

  if (elementArray.length < 2) // will only adjoin multiple elements
    return;
  
  if (shouldAdjoinInHorizontalDirection)
    elementArray.sort(function(a,b) { return a.getLeft() - b.getLeft(); }); // sort array by leftmost element
  else
    elementArray.sort(function(a,b) { return a.getTop() - b.getTop(); }); // sort array by topmost element
  
  for (var i = 1; i < elementArray.length; i++) {
    adjoinTwoElements(
      elementArray[i],
      elementArray[i-1],
      shouldAdjoinInHorizontalDirection,
      shouldCenterOnFirst ? elementArray[0] : null,
      paddingPoints);
  }
}

function resizeElementsToLastSelected(copyWidth, copyHeight, copyRotation) {
  var elementArray = getSelectedElementsOnPage(false);

  if (elementArray.length < 2)
    return; // no selection array or just one element in selection, so no point in continuing

  var referenceElement = elementArray.pop();
  
  elementArray.forEach(function(e) {
    if (copyWidth)    e.setWidth   (referenceElement.getWidth());
    if (copyHeight)   e.setHeight  (referenceElement.getHeight());
    if (copyRotation) e.setRotation(referenceElement.getRotation());
  });
}

function alignSelectOrAllElements(positionX, positionY, isOuterEdge) {
  var elementArray = getSelectedElementsOnPage(false);
  var referenceElement;

  switch (elementArray.length) {
    case 0: // no elements are selected, so fallback to getting all elements and position reference will be the page
        elementArray = getSelectedElementsOnPage(true);
        referenceElement = fakePageAsReferenceElement();
      break;
    case 1: // only 1 element was selected, so position reference is the page
        referenceElement = fakePageAsReferenceElement();
      break;
    default: // multiple elements were selected, so position reference is the last one
        referenceElement = elementArray.pop();
      break;
  }

  elementArray.forEach(function(e) { alignShape(referenceElement, e, positionX, positionY, isOuterEdge); });
}