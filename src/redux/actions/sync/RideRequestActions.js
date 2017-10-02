import { UPDATE_RIDE_REQUESTS } from '../../types/index'
import type { RideRequestFlowType } from '../../../services/firebase/types'

export const updateRideRequests = (rides: Array<RideRequestFlowType>) => {
  return {
    type: UPDATE_RIDE_REQUESTS,
    payload: rides
  }
}