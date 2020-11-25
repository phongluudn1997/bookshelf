import {client} from './api-client.exercise'
import {useQuery, queryCache} from 'react-query'

const useBook = ({bookId, user}) => {
  const dataQuery = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () => client(`books/${bookId}`, {token: user.token}),
  })
  return dataQuery
}

const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
})

const useBookSearch = ({query, user}) => {
  const dataQuery = useQuery(getBookSearchConfig(query, user))
  return dataQuery
}

const refetchBookSearchQuery = async user => {
  queryCache.removeQueries('bookSearch')
  await queryCache.prefetchQuery(getBookSearchConfig('', user))
}

export {useBook, useBookSearch, refetchBookSearchQuery}
