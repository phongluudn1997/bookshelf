import {client} from './api-client.exercise'
import {useQuery, queryCache} from 'react-query'

const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book)
      }
    },
  },
})

const useBookSearch = ({query, user}) => {
  const dataQuery = useQuery(getBookSearchConfig(query, user))
  return dataQuery
}

const useBook = ({bookId, user}) => {
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })
  return data
}

const refetchBookSearchQuery = async user => {
  queryCache.removeQueries('bookSearch')
  await queryCache.prefetchQuery(getBookSearchConfig('', user))
}

const setQueryDataForBook = book => {
  queryCache.setQueryData(['book', {bookId: book.id}], book)
}

export {useBook, useBookSearch, refetchBookSearchQuery, setQueryDataForBook}
