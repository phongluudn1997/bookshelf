const {useQuery} = require('react-query')
const {client} = require('./api-client.exercise')

const useBook = ({bookId, user}) => {
  const dataQuery = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () => client(`books/${bookId}`, {token: user.token}),
  })
  return dataQuery
}

const useBookSearch = ({query, user}) => {
  const dataQuery = useQuery({
    queryKey: ['bookSearch', {query}],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
  })
  return dataQuery
}

export {useBook, useBookSearch}
