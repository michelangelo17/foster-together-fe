import { AwsClient } from 'aws4fetch'

const aws = new AwsClient({
  accessKeyId: process.env.REACT_APP_API_GATEWAY_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_API_GATEWAY_SECRET_KEY,
})

export async function invokeAPIGateway(gateway, path, method, body) {
  let res
  if (body)
    res = await aws.fetch(`${gateway}${path}`, {
      method,
      body: JSON.stringify(body),
    })
  else res = await aws.fetch(`${gateway}${path}`, { method })
  return res
}
