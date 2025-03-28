/** @jest-environment jsdom */
/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { component, fields } from './component-blocks/api'
import { defaultDocumentFeatures, jsx, makeEditor } from './tests/utils'

test('basic link shortcut', () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          [content](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text />
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            content
          </text>
        </link>
        <text>
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test('link shortcut with content before it and whitespace directly before it works', () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          asdasd asd [content](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text>
          asdasd asd
        </text>
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            content
          </text>
        </link>
        <text>
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test("link shortcut with content before it without whitespace directly before doesn't activate the shortcut", () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          asdasd asd[content](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text>
          asdasd asd[content](https://keystonejs.com)
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test('shortcut with whitespace in the middle of the content works', () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          [content more stuff](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text />
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            content more stuff
          </text>
        </link>
        <text>
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test('link shortcut then typing inserts text outside of the link', () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          [content](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  ;[...'content'].forEach(char => editor.insertText(char))
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text />
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            content
          </text>
        </link>
        <text>
          content
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test('link shortcut with bold in some of the content works', () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>[co</text>
        <text bold>nt</text>
        <text>
          ent](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text />
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            co
          </text>
          <text
            bold={true}
          >
            nt
          </text>
          <text>
            ent
          </text>
        </link>
        <text>
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test("link shortcut doesn't do anything when links are disabled globally in the editor", () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>[co</text>
        <text bold>nt</text>
        <text>
          ent](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>,
    { documentFeatures: { ...defaultDocumentFeatures, links: false } }
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text>
          [co
        </text>
        <text
          bold={true}
        >
          nt
        </text>
        <text>
          ent](https://keystonejs.com)
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test("link shortcut doesn't do anything when inside of a component block with links disabled", () => {
  const editor = makeEditor(
    <editor>
      <component-block component="comp" props={{ child: null }}>
        <component-inline-prop propPath={['child']}>
          <text>
            [content](https://keystonejs.com
            <cursor />
          </text>
        </component-inline-prop>
      </component-block>
      <paragraph>
        <text />
      </paragraph>
    </editor>,
    {
      componentBlocks: {
        comp: component({
          preview: props => React.createElement('div', null, props.fields.child.element),
          label: '',
          schema: { child: fields.child({ kind: 'inline', placeholder: '' }) },
        }),
      },
    }
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <component-block
        component="comp"
        props={
          {
            "child": null,
          }
        }
      >
        <component-inline-prop
          propPath={
            [
              "child",
            ]
          }
        >
          <text>
            [content](https://keystonejs.com)
            <cursor />
          </text>
        </component-inline-prop>
      </component-block>
      <paragraph>
        <text />
      </paragraph>
    </editor>
  `)
})
test('link shortcut works when inside of a component block with links option inherited', () => {
  const editor = makeEditor(
    <editor>
      <component-block component="comp" props={{ child: null }}>
        <component-inline-prop propPath={['child']}>
          <text>
            [content](https://keystonejs.com
            <cursor />
          </text>
        </component-inline-prop>
      </component-block>
      <paragraph>
        <text />
      </paragraph>
    </editor>,
    {
      componentBlocks: {
        comp: component({
          preview: props => React.createElement('div', null, props.fields.child.element),
          label: '',
          schema: { child: fields.child({ kind: 'inline', placeholder: '', links: 'inherit' }) },
        }),
      },
    }
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <component-block
        component="comp"
        props={
          {
            "child": null,
          }
        }
      >
        <component-inline-prop
          propPath={
            [
              "child",
            ]
          }
        >
          <text />
          <link
            @@isInline={true}
            href="https://keystonejs.com"
          >
            <text>
              content
            </text>
          </link>
          <text>
            <cursor />
          </text>
        </component-inline-prop>
      </component-block>
      <paragraph>
        <text />
      </paragraph>
    </editor>
  `)
})

test('an undo only reverts to the whole shortcut text', () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          [content](https://keystonejs.com
          <cursor />
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text />
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            content
          </text>
        </link>
        <text>
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
  editor.undo()
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text>
          [content](https://keystonejs.com)
          <cursor />
        </text>
      </paragraph>
    </editor>
  `)
})

test("text after the markdown shortcut isn't included in the link text", () => {
  const editor = makeEditor(
    <editor>
      <paragraph>
        <text>
          [content](https://keystonejs.com
          <cursor /> blah blah
        </text>
      </paragraph>
    </editor>
  )
  editor.insertText(')')
  expect(editor).toMatchInlineSnapshot(`
    <editor>
      <paragraph>
        <text />
        <link
          @@isInline={true}
          href="https://keystonejs.com"
        >
          <text>
            content
          </text>
        </link>
        <text>
          <anchor />
           blah blah
          <focus />
        </text>
      </paragraph>
    </editor>
  `)
})
