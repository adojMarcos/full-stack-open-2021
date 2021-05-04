import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('checks that the component displaying a blog renders the blog\'s title and author, but does not render its url or number of likes by default.', () => {
  const blog = {
    title: 'Component testing is done with react-testing library',
    author: 'George R.R Martin',
    id: 1,
    likes: 11,
    url: 'https://www.aaaa.com.br',
  }

  const component = render(<Blog blog={blog} showBlogInfo={[]} />)

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing library George R.R Martin'
  )
})

describe('button tests', () => {
  let blog = {}

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing library',
      author: 'George R.R Martin',
      id: 1,
      likes: 11,
      url: 'https://www.aaaa.com.br',
    }
  })

  test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked.', () => {
    const component = render(<Blog blog={blog} showBlogInfo={[]} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing library George R.R Martin hide https://www.aaaa.com.br likes 11 like delete'
    )
  })

  test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} showBlogInfo={[1]} updateLikes={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
