import { type AppType } from './index'
import { hc, type InferRequestType, type InferResponseType } from 'hono/client'

// this is a trick to calculate the type when compiling
const calculatedApiClient = hc<AppType>('http://localhost:3000')
type typeFromCalculated = typeof calculatedApiClient;
const hcWithType = (...args: Parameters<typeof hc>): typeFromCalculated =>
    hc<AppType>(...args)

export const apiClient = hcWithType('http://localhost:3000');

export type ReqType<T> = InferRequestType<T>;
// export type sampleApiReqType = ReqType<Awaited<ReturnType<typeof createEcomDashboardApiClient>['api']['dashboard']['restaurant'][':restaurantId']['$patch']>>['json'];
export type createUserRequestType = ReqType<Awaited<typeof apiClient.api.user.$post>>['json']