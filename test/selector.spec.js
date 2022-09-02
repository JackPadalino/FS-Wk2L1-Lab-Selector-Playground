/* eslint-env jasmine */
/* global $ */

// ## Selector.js

describe('Selector.js', () => {
  // Before each test, we're constructing a few nodes in the DOM
  // that our specs will use. They'll only exist while our specs
  // are running. Here's what they would look like as HTML:
  //
  // ```html
  // <div id="test parent">
  //   <div id="page">
  //     <div class="foobar"></div>
  //     <div class="foobar"></div>
  //   </div>
  // </div>
  // ```
  beforeEach(() => {
    const body = document.getElementsByTagName('body')[0]
    const parent = document.createElement('div')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')
    parent.id = 'test-parent'
    div1.id = 'page'
    div2.className = 'foobar'
    div3.className = 'foobar'
    parent.appendChild(div1)
    body.appendChild(parent)
    parent.appendChild(div2)
    parent.appendChild(div3)
  })
  // After each test, we wipe the slate clean! This ensures
  // that the result of running one test does not influence the
  // result of another! This is an important characteristic of test specs!
  afterEach(() => {
    const body = document.getElementsByTagName('body')[0]
    const parent = document.getElementById('test-parent')
    body.removeChild(parent)
  })

  describe('$ constructor', () => {
    // Your first task is to write the $ constructor. It will behave very similarly to
    // the $ function in jQuery, or `document.querySelectorAll`. It takes in a **css selector string**
    // and returns an array of elements in the document that match the selector.
    //
    // Because of this, we ask that you do NOT implement this method using `document.querySelectorAll`.
    //
    // Using these other document selector methods is expected, though!
    //
    // * https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    // * https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
    // * https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName
    it('should find elements by class name and put them in an array when selector starts with "."', () => {
      const selection = new $('.foobar')
      expect(Array.isArray(selection.elements)).toBe(true)
      expect(selection.elements.length).toEqual(2)
      selection.elements.forEach(el => {
        expect(el.className).toEqual('foobar')
      })
    })

    // Note that we're just getting a single element (since we're searching by id), but we still want
    // it to be inside of an array. Why might that be? The answer is so that we can interface with our
    // elements in the same way, regardless of whether we have one or many!
    it('should find an element by id and put it into an array when selector starts with "#"', () => {
      const selection = new $('#page')
      expect(Array.isArray(selection.elements)).toBe(true)
      expect(selection.elements.length).toEqual(1)
      selection.elements.forEach(el => {
        expect(el.id).toEqual('page')
      })
    })

    it('should find elements by tag name and put them in an array when selector does not start with "." or "#" ', () => {
      const selection = new $('div')
      expect(Array.isArray(selection.elements)).toBe(true)
      expect(selection.elements.length).toEqual(10)
      selection.elements.forEach(el => {
        expect(el.tagName).toEqual('DIV')
      })
    })
  })

  describe('Prototype methods', () => {
    // Next, let's define methods on the prototype! These methods will cause changes
    // to all of the elements that have been selected.
    describe('hide', () => {
      it('sets display to "none" on all selected elements', () => {
        const selection = new $('.foobar')
        selection.hide()
        selection.elements.forEach(el => {
          expect(el.style.display).toEqual('none')
        })
      })
    })

    describe('show', () => {
      it('sets display to "inherit" on all selected elements', () => {
        const selection = new $('.foobar')
        selection.show()
        selection.elements.forEach(el => {
          expect(el.style.display).toEqual('inherit')
        })
      })
    })

    describe('addClassName', () => {
      it('adds the class to each selected element', () => {
        const selection = new $('.foobar')
        selection.addClassName('baz')
        selection.elements.forEach(el => {
          expect(el.classList.contains('baz')).toBe(true)
        })
      })
    })

    describe('removeClassName', () => {
      it('removes the class from each selected element', () => {
        const selection = new $('.foobar')
        selection.removeClassName('foobar')
        selection.elements.forEach(el => {
          expect(el.classList.contains('foobar')).toBe(false)
        })
      })
    })

    describe('text', () => {
      it('adds a new text node to each selected element', () => {
        const selection = new $('.foobar')
        selection.text('Hello World')
        selection.elements.forEach(el => {
          expect(el.innerText).toEqual('Hello World')
        })
      })
    })

    describe('addChild', () => {
      it('adds a new DOM node of the specified type to each selected element', () => {
        const selection = new $('.foobar')
        selection.addChild('h1')
        selection.elements.forEach(el => {
          expect(el.innerHTML).toEqual('<h1></h1>')
        })
      })
    })
  })

  describe('Chaining', () => {
    // An important characteristic of jQuery is its ability to "chain"
    // methods together. For example, in jQuery you could say:
    //
    // ```javascript
    // $('.popup').slideUp(1000).text("Hello")
    // ```
    //
    // This would cause all elements with the `.popup` class to
    // "slide up" into view and show the text "Hello".
    //
    // This is possible because the $ function and all of its methods
    // don't return the selected elements themselves - they always return
    // the same object that keeps track of the selected elements!
    it('returns the selection object itself', () => {
      const selection1 = new $('.foobar').hide()
      const selection2 = new $('.foobar').show()
      const selection3 = new $('.foobar').addClassName('baz')
      const selection4 = new $('.foobar').removeClassName('quux')

      expect(selection1 instanceof $).toBe(true)
      expect(selection2 instanceof $).toBe(true)
      expect(selection3 instanceof $).toBe(true)
      expect(selection4 instanceof $).toBe(true)
    })

    it('can chain two methods together', () => {
      const selection = new $('.foobar').show().hide()
      selection.elements.forEach(el => {
        expect(el.style.display).toEqual('none')
      })
    })

    it('can chain arbitrary methods together', () => {
      const selection = new $('.foobar')
        .addClassName('bar')
        .removeClassName('foobar')
        .show()
        .hide()

      selection.elements.forEach(el => {
        expect(el.classList.contains('foobar')).toBe(false)
        expect(el.classList.contains('bar')).toBe(true)
        expect(el.style.display).toEqual('none')
      })
    })
  })
})
