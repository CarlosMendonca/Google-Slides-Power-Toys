<img width="220" src="./assets/banner_220.png" alt="Slides Power Toys logo" />
<hr />

Slides Power Toys is a simple free and open source extension that adds some handy functions to Google Slides and make it behave like Microsoft PowerPoint.

<p align="center">
    <img src="./assets/screenshot2_v6.png" alt="Screenshot of Slides Power Toys in action showing the About sidebar open and the menu expanded" />
</p>

**THESE CAPABILITIES ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. Use them at your own risk as they are NOT endorsed nor supported by Google. Refer to the Apache 2.0 license for the full terms and conditions.**

**This is not an oficially supported Google product.**

### Copy Attributes
Copy attributes from the last selected shape to the others. This mimics Microsoft PowerPoint's behavior to apply the same attribute, like size, to multiple shapes.

### Flip
Simply flip the position of two shapes.

### Adjoin
Position shapes side by side or align them to the center of the leftmost or topmost element. Adds more flexibility to the native alignment commands.

### Align to Inner/Outer Edges
Alignment commands to arrange shapes relative to the last selected element. Also adds more flexibility to the native alignment commands.</p>

### Precision Snap
Commands to round various shape attributes to the closest decimal. A width of 1.23 inches becomes 1.2 inches. Select the elements to apply transformation to or select the slide to apply transformation to all elements.

## Color commands
### Transparency
Easily set transparency to selected shapes while preserving original colors.

### Swap text with background
Swap foreground color of text on all shapes (text boxes) selected or on the slide with each shape's fill color.

### Invert background colors
Invert fill color of all shapes (text boxes) selected or on the slide.

### Max text contrast
Change foreground color of text on all shapes (text boxes) selected or on the slide to either black or white, depending on which renders highest contrast with each shape's fill color.

## Contributing
Read the [instructions](./CONTRIBUTING.md) to get started.

You must install and authorize [clasp](https://developers.google.com/apps-script/guides/clasp).

To authorize, do:

```bash
clasp login
```

This will create a new `.clasprc.json` file on your home dir. You must also edit the `src/.clasp.json.release` and `src/.clasp.json.test` to make sure they point to Google Slides files you own on your Google Drive. They can be blank files.

Finally, run the `src/deploy.sh` script to get the code deployed to Google Drive:

```bash
./deploy.sh test
./deploy.sh release
./deploy.sh clean
```

## Tests
There is limited test coverage on the [src/tests.js](./src/tests/tests.js) file that uses [GasT](https://github.com/huan/gast). To run the tests, open the file on the Script Editor, run the gastTestRunner function and check the log.

## License
Licensed under the [Apache 2.0 license](./LICENSE).