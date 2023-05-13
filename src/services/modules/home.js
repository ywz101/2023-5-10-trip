import Request from '../request'

export const getHotSuggests = () => {
  return Request.get({
    url: '/home/hotSuggests'
  })
}

export const getCategories = () => {
  return Request.get({
    url: '/home/categories'
  })
}

export const getHouseList = (nextPage) => {
  return Request.get({
    url: 'home/houselist',
    params: {
      page: nextPage
    }
  })
}