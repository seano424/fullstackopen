const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.totalLikes)
    if (likes.length > 0) {
        return likes.reduce((acc, curr) => acc + curr)
    } else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((blog) => blog.totalLikes)
    const max = likes.reduce((a, b) => {
        return Math.max(a, b)
    })
    return blogs.find((blog) => blog.totalLikes === max)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
