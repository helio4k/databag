import { useEffect, useState, useRef, useContext } from 'react';
import { setLogin } from 'api/setLogin';
import { clearLogin } from 'api/clearLogin';
import { setAccountAccess } from 'api/setAccountAccess';
import { addAccount } from 'api/addAccount';
import { AccountContext } from './AccountContext';
import { ProfileContext } from './ProfileContext';
import { CardContext } from './CardContext';
import { ChannelContext } from './ChannelContext';
import { StoreContext } from './StoreContext';
import { UploadContext } from './UploadContext';
import { createWebsocket } from 'api/fetchUtil';

export function useAppContext(websocket) {
  const [state, setState] = useState({
    status: 'disconnected',
  });
  const [appRevision, setAppRevision] = useState();

  const appName = "Databag";
  const appVersion = "1.0.0";
  const userAgent = window.navigator.userAgent;

  const access = useRef(null);
  const ws = useRef(null);

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }))
  }

  const uploadContext = useContext(UploadContext);
  const storeContext = useContext(StoreContext);
  const accountContext = useContext(AccountContext);
  const profileContext = useContext(ProfileContext);
  const channelContext = useContext(ChannelContext);
  const cardContext = useContext(CardContext);

  const setSession = (token) => {
    try {
      accountContext.actions.setToken(token);
      profileContext.actions.setToken(token);
      cardContext.actions.setToken(token);
      channelContext.actions.setToken(token);
    }
    catch (err) {
      accountContext.actions.clearToken();
      profileContext.actions.clearToken();
      cardContext.actions.clearToken();
      channelContext.actions.clearToken();
      throw err;
    }
    setWebsocket(token);
  }

  const clearSession = () => {
    uploadContext.actions.clear();
    storeContext.actions.clear();

    accountContext.actions.clearToken();
    profileContext.actions.clearToken();
    cardContext.actions.clearToken();
    channelContext.actions.clearToken();
    clearWebsocket();
  }

  const actions = {
    logout: async () => {
      await appLogout();
    },
    access: async (token) => {
      await appAccess(token)
    },
    login: async (username, password) => {
      await appLogin(username, password)
    },
    create: async (username, password, token) => {
      await appCreate(username, password, token)
    },
  }

  const appCreate = async (username, password, token) => {
    await addAccount(username, password, token);
    const access = await setLogin(username, password, appName, appVersion, userAgent);
    storeContext.actions.setValue('login:timestamp', access.created);
    setSession(access.appToken);

    localStorage.setItem("session", JSON.stringify({
      access: access.appToken,
      timestamp: access.created,
    }));
    return access.created;
  } 

  const appLogin = async (username, password) => {
    const access = await setLogin(username, password, appName, appVersion, userAgent);
    storeContext.actions.setValue('login:timestamp', access.created);
    setSession(access.appToken);

    localStorage.setItem("session", JSON.stringify({
      access: access.appToken,
      timestamp: access.created,
    }));
    return access.created;
  }

  const appAccess = async (token) => {
    const access = await setAccountAccess(token, appName, appVersion, userAgent);
    storeContext.actions.setValue('login:timestamp', access.created);
    setSession(access.appToken);

    localStorage.setItem("session", JSON.stringify({
      access: access.appToken,
      timestamp: access.created,
    }));
    return access.created;
  }

  const appLogout = async () => {
    clearSession();
    try {
      await clearLogin(access.current);
    }
    catch (err) {
      console.log(err);
    }
    localStorage.removeItem("session");
  };

  useEffect(() => {
    if (appRevision) {
      accountContext.actions.setRevision(appRevision.account);
      profileContext.actions.setRevision(appRevision.profile);
      cardContext.actions.setRevision(appRevision.card);
      channelContext.actions.setRevision(appRevision.channel);
    }
    // eslint-disable-next-line
  }, [appRevision]);
  
  const setWebsocket = (token) => {
    let protocol;
    if (window.location.protocol === 'http:') {
      protocol = 'ws://';
    }
    else {
      protocol = 'wss://';
    }

    updateState({ status: 'connecting' });
    ws.current = createWebsocket(protocol + window.location.host + "/status");
    ws.current.onmessage = (ev) => {
      try {
        let rev = JSON.parse(ev.data);
        updateState({ status: 'connected' });
        setAppRevision(rev);
      }
      catch (err) {
        console.log(err);
        ws.current.close();
      }
    }
    ws.current.onclose = (e) => {
      console.log(e)
      updateState({ status: 'disconnected' });
      setTimeout(() => {
        if (ws.current != null) {
          ws.current.onmessage = () => {}
          ws.current.onclose = () => {}
          ws.current.onopen = () => {}
          ws.current.onerror = () => {}
          setWebsocket(token);
        }
      }, 1000);
    }
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ AppToken: token }))
    }
    ws.current.error = (e) => {
      console.log(e)
      ws.current.close();
      updateState({ status: 'disconnected' });
    }
  }
 
  const clearWebsocket = ()  => {
    ws.current.onclose = () => {}
    ws.current.close()
    ws.current = null
    updateState({ status: 'disconnected' });
  }

  useEffect(() => {
    const storage = localStorage.getItem('session');
    if (storage != null) {
      try {
        const session = JSON.parse(storage)
        if (session?.access) {
          setSession(session.access);
        }
      }
      catch(err) {
        console.log(err)
      }
    }
    // eslint-disable-next-line
  }, []);

  return { state, actions }
}


