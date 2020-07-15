import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('blog tests',()=> {
  let component
  let mockHandler
  const blog = {
    title: 'Pepe navajas',
    author: 'Israel Ganara',
    url: 'www.uk.com',
    likes: 3,
    user: {username:'loco'}
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render( <Blog blog={blog} toggleVisibility={mockHandler} /> )
  })

  test('renders content title and author, but not url or likes', () => {
    // Debug
    // component.debug()

    // method 3 with querySelector that receives a CSS selector
    const div = component.container.querySelector('.blogDefault')
    expect(div).toHaveTextContent(
      'Pepe navajas'
    )
    expect(div).toHaveTextContent(
      'Israel Ganara'
    )
    expect(div).not.toHaveTextContent(
      'www.uk.com'
    )
    expect(div).not.toHaveTextContent(
      'likes: 3'
    )
  })

  test('at start some info should be hidden', () => {
      const div = component.container.querySelector('.blogNonDefault')
      expect(div).toHaveTextContent(
        'likes: 3'
      )
      expect(div).toHaveStyle('display: none')
  })

  test('clicking the button shows some more content', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogNonDefault')
    // component.debug()
    expect(div).toHaveTextContent(
      'likes: 3'
    )
    expect(div).toHaveTextContent(
      'www.uk.com'
    )
    expect(div).not.toHaveStyle('display: none')
    // expect(mockHandler.mock.calls.length).toBe(1)
  })

  // test('click on show button happens', () => {
  //   const blog = {
  //     title: 'Pepe navajas',
  //     author: 'Israel Ganara',
  //     url: 'www.uk.com',
  //     likes: 3,
  //     user: {username:'loco'}
  //   }
  //   mockHandler = jest.fn()
  //   const component = render(
  //     <Blog blog={blog} onClick={mockHandler} />
  //   )
  //   // console.log("mok1:",mockHandler.mock)
  //   // component.debug()
  //   const button = component.container.querySelector('#show')
  //   // const button = component.getByText('Show')
  //   console.log("button:",button);
  //   fireEvent.click(button)
  //   expect(mockHandler.mock.calls).toHaveLength(1)
  // })


})
describe('blog Likes tests',()=> {
  test('clicking the show button once', () => {
    const blog = {
      title: 'Pepe navajas',
      author: 'Israel Ganara',
      url: 'www.uk.com',
      likes: 3,
      user: {username:'loco'}
    }
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeAdder={mockHandler} />
    )
    // component.debug()
    // const button = component.getByText('Show')
    const button = component.container.querySelector('#likes')
    // console.log("button:",button);
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
