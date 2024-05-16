import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'testititle',
    author: 'testiauthor',
    url: 'testiurl'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'testititle'
  )
  expect(div).toHaveTextContent(
    'testiauthor'
  )
})

test('show reveals more info', async () => {
  const blog = {
    title: 'testititle',
    author: 'testiauthor',
    url: 'testiurl',
    likes: 5,
    user: { username: 'testuser', name: 'Test User' }
  }

  const { container } = render(<Blog blog={blog} user={{ username: 'testuser' }} />)
  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  expect(container).toHaveTextContent('testiurl')
  expect(container).toHaveTextContent('likes : 5')
  expect(container).toHaveTextContent('Test User')
})

//   test('using handle likes twice', async () => {
//     const blog = {
//         title: 'testititle',
//         author: "testiauthor",
//         url: "testiurl",
//         likes: 5,
//         user: {username: 'testuser', name: 'Test User'}
//     }
//     const mockHandler = vi.fn()
//     render(
//         <Blog blog={blog} user={{username: 'testuser'}} handleLike={mockHandler} />
//       )
//     const user = userEvent.setup()
//     const button = screen.getByText('Show')
//     await user.click(button)
//     const button1 = screen.getByText('Like')
//     await user.click(button1)
//     await user.click(button1)
//     screen.debug()

//     expect(mockHandler.mock.calls).toHaveLength(2)
//   })