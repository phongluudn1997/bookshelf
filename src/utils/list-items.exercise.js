import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from './api-client.exercise'
import {setQueryDataForBook} from './books.exercise'

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

const useListItem = ({user, bookId}) => {
  const {data: listItems} = useListItems({user})
  return listItems?.find(li => li.bookId === bookId) ?? null
}

const useListItems = ({user}) => {
  const queryData = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
    config: {
      onSuccess(listItems) {
        listItems.forEach(li => setQueryDataForBook(li.book))
      },
    },
  })
  return queryData
}

const useCreateListItem = (user, options) => {
  const mutate = useMutation(
    ({bookId}) =>
      client(`list-items`, {data: {bookId}, token: user.token, method: 'POST'}),
    {...defaultMutationOptions, ...options},
  )
  return mutate
}

const useUpdateListItem = (user, options) => {
  const mutate = useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        data: updates,
        token: user.token,
        method: 'PUT',
      }),
    {...defaultMutationOptions, ...options},
  )
  return mutate
}

const useRemoveListItem = (user, options) => {
  return useMutation(
    id => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItem,
  useListItems,
  useCreateListItem,
  useUpdateListItem,
  useRemoveListItem,
}
