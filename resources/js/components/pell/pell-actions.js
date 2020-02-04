import { generateIcon } from './pell-helper'
import { imageHandler } from './../media-library/index'

const defaultParagraphSeparatorString = 'defaultParagraphSeparator'
const formatBlock = 'formatBlock'

const addEventListener = (parent, type, listener) => parent.addEventListener(type, listener)
const appendChild = (parent, child) => parent.appendChild(child)
const createElement = tag => document.createElement(tag)
const queryCommandState = command => document.queryCommandState(command)
const queryCommandValue = command => document.queryCommandValue(command)

export const exec = (command, value = null) => document.execCommand(command, false, value)

export const pellActions = [
  {
    name: 'bold',
    icon: generateIcon('bold'),
    title: 'Bold',
    state: () => queryCommandState('bold'),
    result: () => exec('bold'),
  },
  {
    name: 'italic',
    icon: generateIcon('italic'),
    title: 'Italic',
    state: () => queryCommandState('italic'),
    result: () => exec('italic'),
  },
  {
    name: 'underline',
    icon: generateIcon('underline'),
    title: 'Underline',
    state: () => queryCommandState('underline'),
    result: () => exec('underline'),
  },
  {
    name: 'separator',
    icon: '',
    result: () => '',
  },
  {
    name: 'heading1',
    icon: generateIcon('header-1'),
    // title: 'Heading 1',
    state: () => queryCommandState(formatBlock),
    // result: () => exec(formatBlock, '<h1>'),
  },
  {
    name: 'heading2',
    icon: generateIcon('header-2'),
    // title: 'Heading 2',
    // result: () => exec(formatBlock, '<h2>'),
  },
  {
    name: 'heading3',
    icon: generateIcon('header-3'),
    title: 'Heading 3',
    result: () => exec(formatBlock, '<h3>'),
  },
  {
    name: 'separator',
    icon: '',
    result: () => '',
  },
  {
    name: 'paragraph',
    icon: generateIcon('paragraph'),
    title: 'Paragraph',
    result: () => exec(formatBlock, '<p>'),
  },
  {
    name: 'quote',
    icon: generateIcon('quote'),
    title: 'Quote',
    result: () => exec(formatBlock, '<blockquote>'),
  },
  {
    name: 'line',
    icon: generateIcon('divider'),
    title: 'Horizontal Line',
    result: () => exec('insertHorizontalRule'),
  },
  {
    name: 'separator',
    icon: '',
    result: () => '',
  },
  {
    name: 'olist',
    icon: generateIcon('ol'),
    title: 'Ordered List',
    result: () => exec('insertOrderedList'),
  },
  {
    name: 'ulist',
    icon: generateIcon('ul'),
    title: 'Unordered List',
    result: () => exec('insertUnorderedList'),
  },
  {
    name: 'separator',
    icon: '',
    result: () => '',
  },
  {
    name: 'link',
    icon: generateIcon('link'),
    title: 'Link',
    result: () => {
      const url = window.prompt('Enter the link URL')
      if (url) exec('createLink', url)
    },
  },
  {
    name: 'media',
    title: 'Insert Media',
    icon: generateIcon('media'),
    result: () => imageHandler(),
  },
]
