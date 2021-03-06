const listHelper = require('../utils/list_helper')
const blogs = [
    { title: 'blog 1', totalLikes: 2 },
    { title: 'blog 2', totalLikes: 6 },
    { title: 'blog 3', totalLikes: 12 },
    { title: 'blog 4', totalLikes: 23 },
    { title: 'blog 5', totalLikes: 27 },
]

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)

        expect(result).toBe(1)
    })

    test('of many blogs to be value 1', () => {
        expect(listHelper.dummy([1, 2, 3, 4, 5, 6])).toBe(1)
    })

    test('of empty array is one', () => {
        expect(listHelper.dummy([])).toBe(1)
    })
})

describe('totalLikes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        expect(
            listHelper.totalLikes([{ title: 'blog 1', totalLikes: 2 }])
        ).toBe(2)
    })

    test('of a blogger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)

        expect(result).toBe(70)
    })
})

describe('favoriteBlog', () => {
    test('blog equals favorite blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[4])
    })
})
