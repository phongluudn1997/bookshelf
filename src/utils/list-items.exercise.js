import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from './api-client.exercise'

const useListItem = ({user, bookId}) => {
  const {data: listItems} = useListItems({user})
  return listItems?.find(li => li.bookId === bookId) ?? null
}

const useListItems = ({user}) => {
  const queryData = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
  })
  return queryData
}

const useCreateListItem = ({bookId, user}) => {
  const mutate = useMutation(
    ({bookId}) =>
      client(`list-items`, {data: {bookId}, token: user.token, method: 'POST'}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )
  return mutate
}

const useUpdateListItem = ({user}) => {
  const mutate = useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        data: updates,
        token: user.token,
        method: 'PUT',
      }),
    {
      onSettled: () => queryCache.invalidateQueries('list-items'),
    },
  )
  return mutate
}

const useRemoveListItem = ({user}) => {
  return useMutation(
    id => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )
}

export {
  useListItem,
  useListItems,
  useCreateListItem,
  useUpdateListItem,
  useRemoveListItem,
}
