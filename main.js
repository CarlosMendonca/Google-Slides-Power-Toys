// Copyright 2019 Google LLC
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
      .addItem('Height', 'menuCopyHeight')
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
    .addSubMenu(SlidesApp.getUi().createMenu('Modify shape color')
      .addItem('Swap text and background colors', 'menuSetColorSwap')
      .addItem('Invert background color', 'menuSetColorInverse')
      .addItem('Set text color to max contrast', 'menuSetColorMaxContrast'))
    .addSubMenu(SlidesApp.getUi().createMenu('Set color hue')
      .addSubMenu(SlidesApp.getUi().createMenu('Decrease (towards orange)')
        .addItem('-30°', 'menuSetColorHueMinus30')
        .addItem('-15°', 'menuSetColorHueMinus15'))
      .addSubMenu(SlidesApp.getUi().createMenu('Increase (towards pink)')
        .addItem('+15°', 'menuSetColorHuePlus15')
        .addItem('+30°', 'menuSetColorHuePlus30'))
      .addSeparator()
      .addItem('0° (Red)',                 'menuSetColorHue0')
      .addItem('30° (like Dark Orange)',   'menuSetColorHue30')
      .addItem('60° (Yellow)',             'menuSetColorHue60')
      .addItem('90° (like Chartreuse)',    'menuSetColorHue90')
      .addItem('120° (Lime)',              'menuSetColorHue120')
      .addItem('150° (like Spring Green)', 'menuSetColorHue150')
      .addItem('180° (Acqua)',             'menuSetColorHue180')
      .addItem('210° (blue-ish)',          'menuSetColorHue210')
      .addItem('240° (Blue)',              'menuSetColorHue240')
      .addItem('270° (purple-ish)',        'menuSetColorHue270')
      .addItem('300° (Fuchsia/Magenta)',   'menuSetColorHue300')
      .addItem('330° (like Deep Pink)',    'menuSetColorHue330'))
    .addSubMenu(SlidesApp.getUi().createMenu('Set color saturation')
      .addSubMenu(SlidesApp.getUi().createMenu('Decrease')
        .addItem('-33%', 'menuSetColorSaturationMinus33')
        .addItem('-10%', 'menuSetColorSaturationMinus10')
        .addItem('-5%',  'menuSetColorSaturationMinus5'))
      .addSubMenu(SlidesApp.getUi().createMenu('Increase')
        .addItem('+5%',  'menuSetColorSaturationPlus5')
        .addItem('+10%', 'menuSetColorSaturationPlus10')
        .addItem('+33%', 'menuSetColorSaturationPlus33'))
      .addSeparator()
      .addItem('10% (towards grey)', 'menuSetColorSaturationAbs10')
      .addItem('25%', 'menuSetColorSaturationAbs25')
      .addItem('33%', 'menuSetColorSaturationAbs33')
      .addItem('50%', 'menuSetColorSaturationAbs50')
      .addItem('66%', 'menuSetColorSaturationAbs66')
      .addItem('75%', 'menuSetColorSaturationAbs75')
      .addItem('90% (towards color)', 'menuSetColorSaturationAbs90'))
    .addSubMenu(SlidesApp.getUi().createMenu('Set color luminosity')
      .addSubMenu(SlidesApp.getUi().createMenu('Decrease')
        .addItem('-33%', 'menuSetColorLuminosityMinus33')
        .addItem('-10%', 'menuSetColorLuminosityMinus10')
        .addItem('-5%',  'menuSetColorLuminosityMinus5'))
      .addSubMenu(SlidesApp.getUi().createMenu('Increase')
        .addItem('+5%',  'menuSetColorLuminosityPlus5')
        .addItem('+10%', 'menuSetColorLuminosityPlus10')
        .addItem('+33%', 'menuSetColorLuminosityPlus33'))
      .addSeparator()
      .addItem('10% (towards black)', 'menuSetColorLuminosityAbs10')
      .addItem('25%', 'menuSetColorLuminosityAbs25')
      .addItem('33%', 'menuSetColorLuminosityAbs33')
      .addItem('50%', 'menuSetColorLuminosityAbs50')
      .addItem('66%', 'menuSetColorLuminosityAbs66')
      .addItem('75%', 'menuSetColorLuminosityAbs75')
      .addItem('90% (towards white)', 'menuSetColorLuminosityAbs90'))
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

function menuSetColorSaturationMinus33() { withSelectedOrAllShapes(function(s) { changeSaturation(s, -0.33, false); }); }
function menuSetColorSaturationMinus10() { withSelectedOrAllShapes(function(s) { changeSaturation(s, -0.1,  false); }); }
function menuSetColorSaturationMinus5()  { withSelectedOrAllShapes(function(s) { changeSaturation(s, -0.05, false); }); }
function menuSetColorSaturationPlus5()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.05, false); }); }
function menuSetColorSaturationPlus10()  { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.1,  false); }); }
function menuSetColorSaturationPlus33()  { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.33, false); }); }

function menuSetColorSaturationAbs10()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.10,  true); }); }
function menuSetColorSaturationAbs25()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.25,  true); }); }
function menuSetColorSaturationAbs33()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.33,  true); }); }
function menuSetColorSaturationAbs50()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.5,   true); }); }
function menuSetColorSaturationAbs66()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.66,  true); }); }
function menuSetColorSaturationAbs75()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.75,  true); }); }
function menuSetColorSaturationAbs90()   { withSelectedOrAllShapes(function(s) { changeSaturation(s,  0.9,   true); }); }

function menuSetColorLuminosityMinus33() { withSelectedOrAllShapes(function(s) { changeLuminosity(s, -0.33, false); }); }
function menuSetColorLuminosityMinus10() { withSelectedOrAllShapes(function(s) { changeLuminosity(s, -0.1,  false); }); }
function menuSetColorLuminosityMinus5()  { withSelectedOrAllShapes(function(s) { changeLuminosity(s, -0.05, false); }); }
function menuSetColorLuminosityPlus5()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.05, false); }); }
function menuSetColorLuminosityPlus10()  { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.1,  false); }); }
function menuSetColorLuminosityPlus33()  { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.33, false); }); }

function menuSetColorLuminosityAbs10()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.10,  true); }); }
function menuSetColorLuminosityAbs25()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.25,  true); }); }
function menuSetColorLuminosityAbs33()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.33,  true); }); }
function menuSetColorLuminosityAbs50()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.5,   true); }); }
function menuSetColorLuminosityAbs66()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.66,  true); }); }
function menuSetColorLuminosityAbs75()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.75,  true); }); }
function menuSetColorLuminosityAbs90()   { withSelectedOrAllShapes(function(s) { changeLuminosity(s,  0.9,   true); }); }

function menuSetColorHueMinus30() { withSelectedOrAllShapes(function(s) { changeHue(s,  -30, false); }); }
function menuSetColorHueMinus15() { withSelectedOrAllShapes(function(s) { changeHue(s,  -15, false); }); }
function menuSetColorHuePlus15()  { withSelectedOrAllShapes(function(s) { changeHue(s,   15, false); }); }
function menuSetColorHuePlus30()  { withSelectedOrAllShapes(function(s) { changeHue(s,   30, false); }); }

function menuSetColorHue0()   { withSelectedOrAllShapes(function(s) { changeHue(s,   0, true); }); }
function menuSetColorHue30()  { withSelectedOrAllShapes(function(s) { changeHue(s,  30, true); }); }
function menuSetColorHue60()  { withSelectedOrAllShapes(function(s) { changeHue(s,  60, true); }); }
function menuSetColorHue90()  { withSelectedOrAllShapes(function(s) { changeHue(s,  90, true); }); }
function menuSetColorHue120() { withSelectedOrAllShapes(function(s) { changeHue(s, 120, true); }); }
function menuSetColorHue150() { withSelectedOrAllShapes(function(s) { changeHue(s, 150, true); }); }
function menuSetColorHue180() { withSelectedOrAllShapes(function(s) { changeHue(s, 180, true); }); }
function menuSetColorHue210() { withSelectedOrAllShapes(function(s) { changeHue(s, 210, true); }); }
function menuSetColorHue240() { withSelectedOrAllShapes(function(s) { changeHue(s, 240, true); }); }
function menuSetColorHue270() { withSelectedOrAllShapes(function(s) { changeHue(s, 270, true); }); }
function menuSetColorHue300() { withSelectedOrAllShapes(function(s) { changeHue(s, 300, true); }); }
function menuSetColorHue330() { withSelectedOrAllShapes(function(s) { changeHue(s, 330, true); }); }

function menuCenterOnPage() { withSelectedOrAllElements(function(e) { alignShape(fakePageAsReferenceElement(), e, POSITION_X.CENTER, POSITION_Y.CENTER, false); }); }

function menuFlipH()  { flipLastTwoSelectedElements(true,  false); }
function menuFlipV()  { flipLastTwoSelectedElements(false, true);  }
function menuFlipHV() { flipLastTwoSelectedElements(true,  true);  }

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

  if (selectedElements.length < 2) { // need two or more elements to flip
    SlidesApp.getUi().alert(
      "Slides Power Toys",
      "Select two elements to flip their position.",
      SlidesApp.getUi().ButtonSet.OK);
    return;
  }
  
  flipTwoElements(selectedElements.pop(), selectedElements.pop(), shouldFlipH, shouldFlipV); // order of elements does not matter
}

function adjoinSelectedElements(shouldAdjoinInHorizontalDirection, shouldCenterOnFirst, paddingPoints) {
  var elementArray = getSelectedElementsOnPage(false); // will not fallback to all elements on page, but maybe revist this later...

  if (elementArray.length < 2) { // will only adjoin multiple elements
    SlidesApp.getUi().alert(
      "Slides Power Toys",
      "Select two or more elements to adjoin (combine by bringing together).",
      SlidesApp.getUi().ButtonSet.OK);
    return;
  }
  
  var referenceElement = elementArray.pop(); // taking the reference element out since we'll sort the selection array
  
  // Sorting by leftmost or topmost is an atempt to avoid a random order of adjoined elements since Google Slides
  //  does not guarantee the order on the selection array. This way, the order on screen is preserved.
  if (shouldAdjoinInHorizontalDirection)
    elementArray.sort(function(a,b) { return a.getLeft() - b.getLeft(); }); // sort array by leftmost element
  else
    elementArray.sort(function(a,b) { return a.getTop() - b.getTop(); }); // sort array by topmost element
  
  elementArray.unshift(referenceElement); // putting the reference element back in, but at the beginning of the array since the adjoin loop below uses element 0 as anchor
  
  for (var i = 1; i < elementArray.length; i++) {
    adjoinTwoElements(
      elementArray[i-1],
      elementArray[i],
      shouldAdjoinInHorizontalDirection,
      shouldCenterOnFirst ? elementArray[0] : null,
      paddingPoints);
  }
}

function resizeElementsToLastSelected(copyWidth, copyHeight, copyRotation) {
  var elementArray = getSelectedElementsOnPage(false);

  if (elementArray.length < 2) {
    SlidesApp.getUi().alert(
      "Slides Power Toys",
      "Select two or more elements to resize or rotate based on attributes of the last selected element.",
      SlidesApp.getUi().ButtonSet.OK);
    return; // no selection array or just one element in selection, so no point in continuing
  }

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
