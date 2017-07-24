import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import SignInScreen from '../modules/authentication/containers/SignInScreen'
import RideList from '../modules/rideRequest/containers/RideList'
import RideOffer from '../modules/rideRequest/containers/RideOfferScreen'
import RideRequest from '../modules/rideRequest/containers/RideRequestScreen'

const registerScreens = (store) => {
  Navigation.registerComponent('carona.signIn', () => SignInScreen, store, Provider)
  Navigation.registerComponent('carona.rideList', () => RideList, store, Provider)
  Navigation.registerComponent('carona.rideOffer', () => RideOffer, store, Provider)
  Navigation.registerComponent('carona.rideRequest', () => RideRequest, store, Provider)
}

export default {
  registerScreens
}