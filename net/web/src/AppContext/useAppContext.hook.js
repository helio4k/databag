import { useEffect, useState, useRef, useContext } from 'react';
import { getContactProfile, setCardProfile, getCards, getCardImageUrl, getCardProfile, getCardDetail, getListingImageUrl, getListing, getAvailable, getUsername, setLogin, createAccount } from './fetchUtil';
import { getChannels } from '../Api/getChannels';
import { getChannel } from '../Api/getChannel';
import { getContactChannels } from '../Api/getContactChannels';
import { getContactChannel } from '../Api/getContactChannel';

import { AccountContext } from './AccountContext';
import { ProfileContext } from './ProfileContext';
import { ArticleContext } from './ArticleContext';
import { GroupContext } from './GroupContext';
import { CardContext } from './CardContext';
import { ChannelContext } from './ChannelContext';

async function updateChannels(token, revision, channelMap, mergeChannels) {
  let channels = await getChannels(token, revision);
  for (let channel of channels) {
    if (channel.data) {
      let cur = channelMap.get(channel.id);
      if (cur == null) {
        cur = { id: channel.id, data: { } }
      }
      if (cur.data.detailRevision != channel.data.detailRevision) {
        if (channel.data.channelDetail != null) {
          cur.data.channelDetail = channel.data.channelDetail;
          cur.data.detailRevision = channel.data.detailRevision;
        }
        else {
          let slot = await getChannel(token, channel.id);
          cur.data.channelDetail = slot.data.channelDetail;
          cur.data.detailRevision = slot.data.detailRevision;
        }
      }
      cur.data.topicRevision = channel.data.topicRevision;
      cur.revision = channel.revision;
      channelMap.set(channel.id, cur);
    }
    else {
      channelMap.delete(channel.id);
    }
  }
  mergeChannels();
}

async function updateCards(token, revision, cardMap, updateData, mergeChannels) {

  let cards = await getCards(token, revision);
  for (let card of cards) {
    if (card.data) {
      let cur = cardMap.get(card.id);
      if (cur == null) {
        cur = { id: card.id, data: { articles: new Map() }, channels: new Map() }
      }
      if (cur.data.detailRevision != card.data.detailRevision) {
        if (card.data.cardDetail != null) {
          cur.data.cardDetail = card.data.cardDetail;
        }
        else {
          cur.data.cardDetail = await getCardDetail(token, card.id);
        }
        mergeChannels();
        cur.data.detailRevision = card.data.detailRevision;
      }
      if (cur.data.profileRevision != card.data.profileRevision) {
        if (card.data.cardProfile != null) {
          cur.data.cardProfile = card.data.cardProfile;
        }
        else {
          cur.data.cardProfile = await getCardProfile(token, card.id);
        }
        cur.data.profileRevision = card.data.profileRevision;
      }
      const { cardDetail, cardProfile } = cur.data;
      if (cardDetail.status === 'connected') {
        if (cur.data.profileRevision != card.data.notifiedProfile) {
          let message = await getContactProfile(cardProfile.node, cardProfile.guid, cardDetail.token);
          await setCardProfile(token, card.id, message);

          // update remote profile
          cur.data.notifiedProfile = card.data.notifiedProfile;
        }
        if (cur.data.notifiedView != card.data.notifiedView) {
          // update remote articles and channels
          cur.data.articles = new Map();
          cur.channels = new Map();

          let contactToken = cur.data.cardProfile.guid + "." + cur.data.cardDetail.token
          await updateContactChannels(contactToken, cur.data.notifiedView, cur.dataNotifiedChannel, cur.channels);
          await updateContactArticles(contactToken, cur.data.notifiedView, cur.dataNotifiedArticle, cur.data.articles);

          // update view
          cur.data.notifiedArticle = card.data.notifiedArticle;
          cur.data.notifiedChannel = card.data.notifiedChannel;
          cur.data.notifiedView = card.data.notifiedView;
          mergeChannels();
        }
        if (cur.data.notifiedArticle != card.data.notifiedArticle) {
          // update remote articles
          let contactToken = cur.data.cardProfile.guid + "." + cur.data.cardDetail.token
          await updateContactArticles(contactToken, cur.data.notifiedView, cur.dataNotifiedArticle, cur.data.articles);
          cur.data.notifiedArticle = card.data.notifiedArticle;
        }
        if (cur.data.notifiedChannel != card.data.notifiedChannel) {
          // update remote channels
          let contactToken = cur.data.cardProfile.guid + "." + cur.data.cardDetail.token
          await updateContactChannels(contactToken, cur.data.notifiedView, cur.dataNotifiedChannel, cur.channels);
          cur.data.notifiedChannel = card.data.notifiedChannel;
          mergeChannels();
        }
      }
      cur.revision = card.revision;
      cardMap.set(card.id, cur);
    }
    else {
      cardMap.delete(card.id);
      mergeChannels();
    }
  }
  updateData({ cards: Array.from(cardMap.values()) });
}

async function updateContactChannels(token, viewRevision, channelRevision, channelMap) {
  let channels = await getContactChannels(token, viewRevision, channelRevision);
  for (let channel of channels) {
    if (channel.data) {
      let cur = channelMap.get(channel.id);
      if (cur == null) {
        cur = { id: channel.id, data: { } }
      }
      if (cur.data.detailRevision != channel.data.detailRevision) {
        if (channel.data.channelDetail != null) {
          cur.data.channelDetail = channel.data.channelDetail;
          cur.data.detailRevision = channel.data.detailRevision;
        }
        else {
          let slot = await getContactChannel(token, channel.id);
          cur.data.channelDetail = slot.data.channelDetail;
          cur.data.detailRevision = slot.data.detailRevision;
        }
      }
      cur.data.topicRevision = channel.data.topicRevision;
      cur.revision = channel.revision;
      channelMap.set(channel.id, cur);
    }
    else {
      channelMap.delete(channel.id);
    }
  }
}

async function updateContactArticles(token, viewRevision, articleRevision, articleMap) {
  console.log("update contact attributes");
}

async function appCreate(username, password, updateState, setWebsocket) {
  await createAccount(username, password);
  let access = await setLogin(username, password)
  updateState({ token: access, access: 'user' });
  setWebsocket(access)
  localStorage.setItem("session", JSON.stringify({ token: access, access: 'user' }));
} 

async function appLogin(username, password, updateState, setWebsocket) {
  let access = await setLogin(username, password)
  updateState({ token: access, access: 'user' });
  setWebsocket(access)
  localStorage.setItem("session", JSON.stringify({ token: access, access: 'user' }));
}

function appLogout(updateState, clearWebsocket) {
  updateState({ token: null, access: null });
  clearWebsocket()
  localStorage.removeItem("session");
}

export function useAppContext() {
  const [state, setState] = useState(null);
  const [appRevision, setAppRevision] = useState();

  const cardRevision = useRef(null);
  const channelRevision = useRef(null);

  const channels = useRef(new Map());
  const cards = useRef(new Map());
  const delay = useRef(2);

  const ws = useRef(null);
  const revision = useRef(null);
  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }))
  }
  const updateData = (value) => {
    setState((s) => {
      let data = { ...s.Data, ...value }
      return { ...s, Data: data }
    })
  }

  const accountContext = useContext(AccountContext);
  const profileContext = useContext(ProfileContext);
  const channelContext = useContext(ChannelContext);
  const cardContext = useContext(CardContext);
  const groupContext = useContext(GroupContext);
  const articleContext = useContext(ArticleContext);

  const mergeChannels = () => {
    let merged = [];
    cards.current.forEach((value, key, map) => {
      if (value?.data?.cardDetail?.status === 'connected') {
        value.channels.forEach((slot, key, map) => {
          merged.push({ guid: value?.data?.cardProfile?.guid, cardId: value?.id, channel: slot });
        });
      }
    });
    channels.current.forEach((value, key, map) => {
      merged.push({ channel: value });
    });
    updateData({ channels: merged });
  }

  const getCardByGuid = (guid) => {
    let card = null;
    cards.current.forEach((value, key, map) => {
      if(value?.data?.cardProfile?.guid == guid) {
        card = value
      }
    });
    return card;
  }

  const getConnectedCards = () => {
    let connected = []
    cards.current.forEach((value, key, map) => {
      if(value?.data?.cardDetail?.status === 'connected') {
        connected.push(value);
      }
    });
    return connected;
  }

  const resetData = () => {
    revision.current = null;
    cardRevision.current = null;
    channels.current = new Map();
    cards.current = new Map();
    setState({});
  }

  const userActions = {
    logout: () => {
      appLogout(updateState, clearWebsocket);
      resetData();
    },
    getRegistry: async (node) => getListing(node),
    getRegistryImageUrl: (server, guid, revision) => getListingImageUrl(server, guid, revision),
    getCardImageUrl: (cardId, revision) => getCardImageUrl(state.token, cardId, revision),
    getCardByGuid: getCardByGuid,
    getCard: (id) => cards.current.get(id),
    getChannel: (id) => channels.current.get(id),
    getConnectedCards: getConnectedCards,
  }

  const adminActions = {
    logout: () => {
      appLogout(updateState, clearWebsocket);
      resetData();
    }
  }

  const accessActions = {
    login: async (username, password) => {
      await appLogin(username, password, updateState, setWebsocket)
    },
    create: async (username, password) => {
      await appCreate(username, password, updateState, setWebsocket)
    },
    username: getUsername,
    available: getAvailable,
  }

  useEffect(() => {
    if (appRevision) {
      accountContext.actions.setRevision(appRevision.account);
      profileContext.actions.setRevision(appRevision.profile);
      articleContext.actions.setRevision(appRevision.article);
      groupContext.actions.setRevision(appRevision.group);
      cardContext.actions.setRevision(appRevision.card);
      channelContext.actions.setRevision(appRevision.channel);
    }
  }, [appRevision]);
  
  const processRevision = async (token) => {
    while(revision.current != null) {
      let rev = revision.current;

      // update card if revision changed
      if (rev.card != cardRevision.current) {
        await updateCards(token, cardRevision.current, cards.current, updateData, mergeChannels);
        cardRevision.current = rev.card
      }

      // update channel if revision changed
      if (rev.channel != channelRevision.current) {
        await updateChannels(token, channelRevision.current, channels.current, mergeChannels);
        channelRevision.current = rev.channel
      }

      // check if new revision was received during processing
      if (rev == revision.current) {
        revision.current = null
      }
    }
  }

  const setWebsocket = (token) => {

    accountContext.actions.setToken(token);
    profileContext.actions.setToken(token);
    articleContext.actions.setToken(token);
    groupContext.actions.setToken(token);
    cardContext.actions.setToken(token);
    channelContext.actions.setToken(token);

    ws.current = new WebSocket("wss://" + window.location.host + "/status");
    ws.current.onmessage = (ev) => {
      try {
        if (revision.current != null) {
          revision.current = JSON.parse(ev.data);
        }
        else {
          let rev = JSON.parse(ev.data);
          revision.current = rev;
          processRevision(token);
          setAppRevision(rev);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    ws.current.onclose = (e) => {
      console.log(e)
      setTimeout(() => {
        if (ws.current != null) {
          ws.current.onmessage = () => {}
          ws.current.onclose = () => {}
          ws.current.onopen = () => {}
          ws.current.onerror = () => {}
          setWebsocket(token);
          delay.current += 1;
        }
      }, delay.current * 1000)
    }
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ AppToken: token }))
    }
    ws.current.error = (e) => {
      console.log(e)
    }
  }
 
  const clearWebsocket = ()  => {
    ws.current.onclose = () => {}
    ws.current.close()
    ws.current = null
  }

  useEffect(() => {
    const storage = localStorage.getItem('session');
    if (storage != null) {
      try {
        const session = JSON.parse(storage)
        if (session?.access === 'admin') {
          setState({ token: session.token, access: session.access })
        } else if (session?.access === 'user') {
          setState({ token: session.token, access: session.access })
          setWebsocket(session.token);   
        } else {
          setState({})
        }
      }
      catch(err) {
        console.log(err)
        setState({})
      }
    } else {
      setState({})
    }
  }, []);

  if (!state) {
    return {}
  }
  if (state.access === 'user') {
    return { state, actions: userActions }
  }
  if (state.access === 'admin') {
    return { state, actions: adminActions }
  }
  return { actions: accessActions }
}


