import React, { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showBlogInfo, setShowBlogInfo] = useState([])

  const viewDetails = (blog) => {
    showBlogInfo.includes(blog.id)
      ? setShowBlogInfo(
        showBlogInfo.filter((item) => {
          return item !== blog.id
        })
      )
      : setShowBlogInfo(showBlogInfo.concat(blog.id))
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div className="blog">
      {/*   { showBlogInfo.includes(blog.id) ? ( */}
      <div key={Math.random() * 1000000} style={blogStyle}>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={() => viewDetails(blog)}>{showBlogInfo.includes(blog.id) ? ' hide ' : ' view '}</button>
        </p>
        {showBlogInfo.includes(blog.id) ? (
          <>
            <p>{blog.url} </p>
            <p>
              likes {blog.likes}{' '}
              <button onClick={() => updateLikes(blog)}> like </button>
            </p>
            <button onClick={() => deleteBlog(blog)}> delete </button>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
