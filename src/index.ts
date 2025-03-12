import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from './api/user/user.route'
import { createUser } from './test-apiClient'
import type { createUserRequestType } from './apiClient'
import type { HonoVariables } from './types/HonoVariables'

const app = new Hono<HonoVariables>();

app.get('/create-user', async (c) => {
  const sampleUser: createUserRequestType = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: {
      city: 'New York'
    }
  }
  const user = await createUser(sampleUser)
  return c.json({
    user: user
  })
})



const route = app.basePath('/api').route('/user', userRouter)

export type AppType = typeof route


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
