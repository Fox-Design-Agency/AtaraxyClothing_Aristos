// const getCommentCount = require("./models/queries/blogComments/CountBlogComments");
const getBlogCounts = require("./models/queries/blog/CountBlog");

module.exports = {
  name: "Blog",
  async theFunction(name, blogCount) {
    let counts, unreadComments, totalComments;
    await getBlogCounts().then(count => {
      counts = count;
      unreadComments = "-";
      totalComments = "-";
    });
    return `<div class="admin-blocks"><a href="/admin/blogs"><h5>${name}</h5><h4>Total Blogs:</h4><h5>${counts}</h5><h4>unread comments:</h4><h5>${unreadComments}</h5><h4>total comments:</h4><h5>${totalComments}</h5></a></div>`
  }
};
