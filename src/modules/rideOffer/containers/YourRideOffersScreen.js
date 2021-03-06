import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { FlatList } from 'react-native'

import { alert } from '../../../navigation/Alert'
import { screens } from '../../../navigation/Screens'
import { onNavigatorEvent } from '../../../navigation/NavBar'
import { FloatingActionButton } from '../../shared/components/FloatingActionButton'
import { removeRideOffer } from '../../../services/firebase/database/RideOffer'
import { LoadingSpinnerView } from '../../shared/components/LoadingSpinnerView'
import { fetchYourRideOffers } from '../../../redux/actions/async/RideOfferActions'
import { YourRideOffer } from '../components/YourRideOffer'
import ValidatedScreen from '../../shared/containers/ValidatedScreen'
import { getActiveGroup } from '../../../services/firebase/database/Groups'

export class YourRideOffersScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired,
    updateYourOffers: PropTypes.func.isRequired,
    yourOffers: PropTypes.array.isRequired,
    groupId: PropTypes.string
  }

  state = {
    loading: false
  }

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this))
  }

  async componentDidMount () {
    const {uid, updateYourOffers} = this.props
    if (uid && getActiveGroup()) {
      this.setState({loading: true})
      await updateYourOffers(uid)
      this.setState({loading: false})
    }
  }

  async componentDidUpdate (prevProps) {
    const { uid, groupId } = this.props

    if (prevProps.uid !== uid || prevProps.groupId !== groupId) {
      await this.componentDidMount()
    }
  }

  pushRideRequestScreen () {
    this.props.navigator.push({
      screen: screens.rideOffer.id,
      title: screens.rideOffer.title
    })
  }

  removeRideOfferCallback = async (rideId) => {
    const { uid } = this.props
    await removeRideOffer(rideId, uid)
    await this.componentDidMount()
  }

  onPressRide = async (rideId: string) => {
    alert('Apagar oferta de carona?',
      () => this.removeRideOfferCallback(rideId)
    )
  }

  render () {
    return (
      <ValidatedScreen>
        <LoadingSpinnerView isLoading={this.state.loading}>
          <FlatList
            data={this.props.yourOffers}
            keyExtractor={item => item.rideId}
            renderItem={({item}) => <YourRideOffer ride={item} onPress={this.onPressRide} />}
          />
          <FloatingActionButton
            icon='md-create'
            onPress={() => this.pushRideRequestScreen()}
          />
        </LoadingSpinnerView>
      </ValidatedScreen>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.profile.uid,
    yourOffers: state.ride.yourOffers,
    groupId: state.ride.group.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateYourOffers: uid => dispatch(fetchYourRideOffers(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourRideOffersScreen)
