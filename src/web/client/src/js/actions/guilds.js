import axios from 'axios'
import {
  GET_GUILDS,
  SET_ACTIVE_GUILD
} from '../constants/actions/guilds'
import { fetchGuildChannels } from './channels'
import { fetchGuildRoles } from './roles'
import { fetchGuildFeeds } from './feeds'

export function fetchGuilds () {
  return dispatch => {
    dispatch(setGuildsBegin())
    axios.get(`/api/users/@me/guilds`).then(({ data }) => {
      dispatch(setGuildsSuccess(data))
    }).catch(err => {
      dispatch(setGuildsFailure(err))
    })
  }
}

export function setGuildsSuccess (guilds) {
  return {
    type: GET_GUILDS.SUCCESS,
    payload: guilds
  }
}

export function setGuildsBegin () {
  return {
    type: GET_GUILDS.BEGIN
  }
}

export function setGuildsFailure (error) {
  return {
    type: GET_GUILDS.FAILURE,
    payload: error
  }
}

export function setActiveGuild (guildID) {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_GUILD,
      payload: guildID
    })
    dispatch(fetchGuildChannels(guildID))
    dispatch(fetchGuildRoles(guildID))
    dispatch(fetchGuildFeeds(guildID))
  }
}
