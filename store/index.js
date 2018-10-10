import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loginModal: false,
      temp_user: {},
      panel: 0,
      registrationPanel: 0,
      temp_pass: '',
      industry: '',
      event: {},
      customerID: '',
      loading: {
        status: false,
        message: ''
      },
      sponsorship: {},
      states: ["AK",
        "AL",
        "AR",
        "AS",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "GU",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VA",
        "VI",
        "VT",
        "WA",
        "WI",
        "WV",
        "WY"
      ]
    },
    mutations: {
      SET_LOADING(state, loading) {
        state.loading = loading
      },
      SET_EVENT(state, event) {
        state.event = event
      },
      SET_CUSTOMER_ID(state, customerID) {
        state.customerID = customerID
      },
      SET_SPONSORSHIP(state, sponsorship) {
        state.sponsorship = sponsorship
      },
      SET_SPONSORSHIP_LOGO(state, logo) {
        state.sponsorship.logo = logo
      },
      SET_INDUSTRY(state, industry) {
        state.industry = industry
      },
      SET_TEMP_USER_LOCATION(state, industry) {
        state.temp_user.location = industry
      },
      SET_SPONSORSHIP_ID(state, id) {
        state.sponsorship.id = id
      },
      SET_SPONSORSHIP_IMAGE(state, image) {
        state.sponsorship.image = image
      },
      SET_PANEL(state, panel) {
        state.panel = panel
      },
      SET_TEMP_PASS(state, temp_pass) {
        state.temp_pass = temp_pass
      },
      SET_REGISTRATION_PANEL(state, registrationPanel) {
        state.registrationPanel = registrationPanel
      },
      SET_TEMP_USER(state, temp_user) {
        state.temp_user = temp_user
      },
      changePanel: (state, direction) => {
        if (direction === 'forward') {

          state.panel++
          state.animateIn = 'uk-animation-slide-right-small uk-animation-fast'
          state.animateOut = 'uk-animation-slide-left-small uk-animation-reverse uk-animation-fast'
        } else if (direction === 'backward') {
          state.panel--
          state.animateIn = 'uk-animation-slide-left-small uk-animation-fast'
          state.animateOut = 'uk-animation-slide-right-small uk-animation-reverse uk-animation-fast'
        }
      },
      changeRegistrationPanel: (state, direction) => {
        if (direction === 'forward') {

          state.registrationPanel++
          state.animateIn2 = 'uk-animation-slide-right-small uk-animation-fast'
          state.animateOut2 = 'uk-animation-slide-left-small uk-animation-reverse uk-animation-fast'
        } else if (direction === 'backward') {
          state.registrationPanel--
          state.animateIn2 = 'uk-animation-slide-left-small uk-animation-fast'
          state.animateOut2 = 'uk-animation-slide-right-small uk-animation-reverse uk-animation-fast'
        } else if (direction === 'backward2') {
          state.registrationPanel - 2
          state.animateIn2 = 'uk-animation-slide-left-small uk-animation-fast'
          state.animateOut2 = 'uk-animation-slide-right-small uk-animation-reverse uk-animation-fast'
        } else if (direction === 'forward2') {

          state.registrationPanel + 2
          state.animateIn2 = 'uk-animation-slide-right-small uk-animation-fast'
          state.animateOut2 = 'uk-animation-slide-left-small uk-animation-reverse uk-animation-fast'
        }
      }

    },
    getters: {
      loading: state => state.loading,
      event: state => state.event,
      sponsorship: state => state.sponsorship,
      panel: state => state.panel,
      get_industry: state => state.industry,
      registrationPanel: state => state.registrationPanel,
      get_temp_user: state => state.temp_user,
      customer_ID: state => state.customerID
    },
    actions: {
      async getEvent({
        commit
      }, data) {
        const event = await this.$axios.$get('/tables/event/rows/' + data)
        commit('SET_EVENT', event)
      }


    }
  })
}

export default createStore
