import { useContext, useState, useEffect } from 'react';
import { CardContext } from 'context/CardContext';
import { ViewportContext } from 'context/ViewportContext';
import { StoreContext } from 'context/StoreContext';

export function useCards() {

  const [filter, setFilter] = useState(null);

  const [state, setState] = useState({
    tooltip: false,
    sorted: false,
    display: 'small',
    cards: [],
  });

  const card = useContext(CardContext);
  const store = useContext(StoreContext);
  const viewport = useContext(ViewportContext);

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  useEffect(() => {
    const { display } = viewport.state;
    updateState({ display });
  }, [viewport.state]);

  useEffect(() => {
    const contacts = Array.from(card.state.cards.values()).map(item => {
      const profile = item?.data?.cardProfile;
      const detail = item?.data?.cardDetail;

      const cardId = item.id;
      const updated = detail?.statusUpdated;
      const status = detail?.status;
      const offsync = item.offsync;
      const guid = profile?.guid;
      const name = profile?.name;
      const handle = profile?.node ? `${profile.handle}@${profile.node}` : profile.handle;
      const logo = profile?.imageSet ? card.actions.getCardImageUrl(item.id) : null;
      return { cardId, guid, updated, offsync, status, name, handle, logo };
    });

    let latest = 0;
    contacts.forEach(contact => {
      if (latest < contact.updated) {
        latest = contact.updated;
      }
    });
    store.actions.setValue('cards:updated', latest);
 
    let filtered = contacts.filter(contact => {
      if (!filter) {
        return true;
      }
      if (!contact.name) {
        return false;
      }
      return contact.name.toUpperCase().includes(filter);
    });

    if (state.sorted) {
      filtered.sort((a, b) => {
        let aName = a?.name;
        let bName = b?.name;
        if (aName === bName) {
          return 0;
        }
        if (!aName || (aName < bName)) {
          return -1;
        }
        return 1;
      });
    }
    else {
      filtered.sort((a, b) => {
        const aUpdated = a?.updated;
        const bUpdated = b?.updated;
        if (aUpdated === bUpdated) {
          return 0;
        }
        if (!aUpdated || (aUpdated < bUpdated)) {
          return 1;
        }
        return -1;
      });
    }

    updateState({ cards: filtered });

    // eslint-disable-next-line
  }, [card.state, state.sorted, filter]);

  useEffect(() => {
    if (viewport.state.display === 'small') {
      updateState({ tooltip: false });
    }
    else {
      updateState({ tooltip: true });
    }
  }, [viewport.state]);

  const actions = {
    onFilter: (value) => {
      setFilter(value.toUpperCase());
    },
    setSort: (value) => {
      updateState({ sorted: value });
    },
    resync: async (cardId) => {
      await card.actions.resyncCard(cardId);
    },
  };

  return { state, actions };
}
