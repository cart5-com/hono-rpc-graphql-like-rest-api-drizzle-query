import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from './api/user/user.route'
import { testCRUDOperations } from './test-crud'
import type { HonoVariables } from './types/HonoVariables'

const app = new Hono<HonoVariables>();

app.get('/create-user', async (c) => {
  return c.text((await testCRUDOperations()).join('\n'))
})



const route = app.basePath('/api').route('/user', userRouter)

export type AppType = typeof route


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
