export const GET_BLOG_START = 'GET_BLOG_START';
export const GET_BLOG_ERROR = 'GET_BLOG_ERROR';
export const GET_BLOG_SUCCESS = 'GET_BLOG_SUCCESS';
export const POST_BLOG_START = 'POST_BLOG_START';


export function getBlog() {
  return {
    type: GET_BLOG_START,
  };
}

export function postBlog(data) {
  return {
    type: POST_BLOG_START,
    data,
  };
}
