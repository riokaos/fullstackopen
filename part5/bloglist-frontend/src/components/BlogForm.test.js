import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const blog = {
    title: 'Testing title',
    author: 'Author testing',
    url: 'www.test.com',
    likes: 3,
    user: {username:'loco'}
  }

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  // const input = component.container.querySelector('input')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title,blog.title.value)
  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  // fireEvent.change(input, {
  //   target: { value: 'testing of forms could be easier' },
  //   target: { value: 'mila kundis' },
  //   target: { value: 'www.goo.com' }
  // })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  // console.log("mock:",createBlog.mock.calls);
  expect(createBlog.mock.calls[0][0].title).toBe('Testing title' )
  // console.log("mock2:",createBlog.mock.calls[0][0]);
  expect(createBlog.mock.calls[0][0].author).toBe('Author testing' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com' )
})
