# MDC Grid List

MDC Grid List provides a RTL-aware Material Design Grid Lists component adhering to the
[Material Design Grid List spec](https://material.io/guidelines/components/grid-lists.html).
Grid List is best suited to presenting homogenous data, typically images. Each data in
grid list is called a tile and tile maintains fixed width, height and padding between each
other as window resizes. Meanwhile, margin changes to keep grid list remain centered.


## Installation

```
npm install --save @material/grid-list
```


## Usage

Basic grid list has the following structure:

```html
<div class="mdc-grid-list">
  <ul class="mdc-grid-list__tiles">
    <li class="mdc-grid-tile">
      <div class="mdc-grid-tile__primary">
        <img class="mdc-grid-tile__primary-content" src="images/1-1.jpg" />
      </div>
      <span class="mdc-grid-tile__secondary">
        <span class="mdc-grid-tile__title">Title</span>
      </span>
    </li>
    <li class="mdc-grid-tile">
      <div class="mdc-grid-tile__primary">
        <img class="mdc-grid-tile__primary-content" src="images/1-1.jpg" />
      </div>
      <span class="mdc-grid-tile__secondary">
        <span class="mdc-grid-tile__title">Title</span>
      </span>
    </li>
  </ul>
</div>
```

The above markup will give you a grid list of tiles that:

- Has with 4px padding in between
- With 1x1 aspect ratio
- Has one line footer caption with no icon

You just need to put the content you want to load in `src` of
`<img class="mdc-grid-tile__primary-content" src="..."/>`. However, if your
assets don't have the same aspect ratio you as specified in the tile, it will
distort those assets, we provide a solution of that case in
[Use div in replace of img](#use-div-in-replace-of-img) section.

Besides default setting, we provide the following modifiers. You can mix and
match them to modify your grid list.


### Change tile padding

Grid list tiles can also have 1px padding instead of 4px by adding
`mdc-grid-list--tile-gutter-1` modifier.

```html
<div class="mdc-grid-list mdc-grid-list--tile-gutter-1">
  <ul class="mdc-grid-list__tiles">
  ...
  </ul>
</div>
```

### Change aspect ratio of tile

Grid list tiles support all material guideline recommended aspect ratio:

- 1x1
- 16x9
- 2x3
- 3x2
- 4x3
- 3x4

```html
<div class="mdc-grid-list mdc-grid-list--tile-aspect-16x9">
<!-- or aspect ratio you name it. -->
  <ul class="mdc-grid-list__tiles">
  ...
  </ul>
</div>
```

As pointed out in the previous section as well, if your
assets don't have the same aspect ratio you as specified in the tile, it will
distort those assets, we provide a solution of that case in
[Use div in replace of img](#use-div-in-replace-of-img) section.


### Add support text to secondary content (caption)

Grid list support one line caption by default. You can also add a line of support
text if needed by adding `mdc-grid-list--twoline-caption` modifier and additional
markup

```html
<div class="mdc-grid-list mdc-grid-list--twoline-caption">
<!-- or aspect ratio you name it. -->
  <ul class="mdc-grid-list__tiles">
    <li class="mdc-grid-tile">
      <div class="mdc-grid-tile__primary">
        <img class="mdc-grid-tile__primary-content" src="images/1-1.jpg" />
      </div>
      <span class="mdc-grid-tile__secondary">
        <span class="mdc-grid-tile__title">Title</span>
        <span class="mdc-grid-tile__support-text">Support text</span>
      </span>
    </li>
  </ul>
</div>
```

### Add icon to secondary content (caption)

You can add icon to caption by adding `mdc-grid-list--with-icon-align-start` or
`mdc-grid-list--with-icon-align-end` and changing the markup.

```html
<div class="mdc-grid-list mdc-grid-list--with-icon-align-start">
<!-- or aspect ratio you name it. -->
  <ul class="mdc-grid-list__tiles">
    <li class="mdc-grid-tile">
      <div class="mdc-grid-tile__primary">
        <img class="mdc-grid-tile__primary-content" src="images/1-1.jpg" />
      </div>
      <span class="mdc-grid-tile__secondary">
        <i class="mdc-grid-tile__icon material-icons">star_border</i>
        <span class="mdc-grid-tile__title">Title</span>
      </span>
    </li>
  </ul>
</div>
```

### Use div in replace of img

In case you cannot ensure all your assets will have the same aspect ratio, you
can use `div` instead of `img` markup. It will resize the assets to cover the tile
and crop the assets to display the center part.

```html
<div class="mdc-grid-list mdc-grid-list--header-caption">
  <ul class="mdc-grid-list__tiles">
    <li class="mdc-grid-tile">
      <div class="mdc-grid-tile__primary">
        <div class="mdc-grid-tile__primary-content demo-grid-tile-content"></div>
      </div>
      <span class="mdc-grid-tile__secondary">
        <span class="mdc-grid-tile__title">Title</span>
      </span>
    </li>
  </ul>
</div>
```

In this case, you should set `background-image:url(...)` instead of `src`. However,
the method results in a less semantic markup, so we don't use this method by
default.


### RTL Support

`mdc-grid-list` is automatically RTL-aware, and will re-position elements whenever
it, or its ancestors, has a `dir="rtl"` attribute.


### Theme

`mdc-grid-list` support theme. Tile `mdc-grid-tile__primary` uses background and text on
background, `mdc-grid-tile__secondary` uses the primary color and text on primary.


### Using the Foundation Class

MDCGridList ships with an `MDCGridListFoundation` class that external frameworks and libraries
can use to build their own MDCGridList components with minimal effort. As with all foundation
classes, an adapter object must be provided. The adapter for grid list must provide the following
functions, with correct signatures:

| Method Signature | Description |
| --- | --- |
| `getOffsetWidth() => number` | Get root element `mdc-grid-list` offsetWidth. |
| `getTileOffsetWidthAtIndex(index: number) => number` | Get offsetWidth of `mdc-grid-tile` at specified index. |
| `setTilesWidth(value: number) => void` | Set `mdc-grid-list__tiles` container width to value. |
| `registerResizeHandler(handler: Function) => void` | Registers a handler to be called when the surface (or its viewport) resizes. Our default implementation adds the handler as a listener to the window's `resize()` event. |
| `deregisterResizeHandler(handler: Function) => void` | Unregisters a handler to be called when the surface (or its viewport) resizes. Our default implementation removes the handler as a listener to the window's `resize()` event. |