import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'


let blog = {
  title: 'Component testing is done with react-testing library',
  author: 'George R.R Martin',
  id: 1,
  likes: 11,
  url: 'https://www.aaaa.com.br',
}

test('check that the form calls the event handler it received as props with the right details when a new blog is created.', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog} />
  )

  const input = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('#form')

  fireEvent.change(input, {
    target: { value: blog.author }
  })

  fireEvent.change(title, {
    target: { value: blog.title }
  })

  fireEvent.change(url, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('George R.R Martin' )
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing library' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.aaaa.com.br' )
})