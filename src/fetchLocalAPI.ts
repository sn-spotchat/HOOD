const CLIENT_ID = 'dgwFUqPZTSWhHSO0FkGl'
const CLIENT_SECRET = 'pD7Yboo6uP'

export type ApiResult = {
  items?: {
    title: string
    category: string
    roadAddress: string
    mapx: string
    mapy: string
  }[]
}

export async function fetchLocalAPI(keyword: string) {
  const params: Record<string, any> = {
    query: encodeURI(keyword),
    display: 2,
    start: 1,
    sort: 'random'
  };
  const search = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  const baseUrl = '/api/v1/search/local.json';

  return fetch(`${baseUrl}?${search}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'X-Naver-Client-Id': CLIENT_ID,
      'X-Naver-Client-Secret': CLIENT_SECRET
    }
  }).then(res => res.json())
}