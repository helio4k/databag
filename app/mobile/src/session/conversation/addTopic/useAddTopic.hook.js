import { useState, useRef, useEffect, useContext } from 'react';
import { ConversationContext } from 'context/ConversationContext';
import { Image } from 'react-native';

export function useAddTopic(cardId, channelId) {

  const [state, setState] = useState({
    message: null,
    assets: [],
  });

  const assetId = useRef(0);
  const conversation = useContext(ConversationContext);

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  const actions = {
    setMessage: (message) => {
      updateState({ message });
    },
    addImage: (data) => {
      assetId.current++;
      Image.getSize(data, (width, height) => {
        const asset = { key: assetId.current, type: 'image', data: data, ratio: width/height };
        updateState({ assets: [ ...state.assets, asset ] });
      });
    },
    addVideo: (data) => {
      assetId.current++;
      const asset = { key: assetId.current, type: 'video', data: data, ratio: 1, duration: 0, position: 0, ref: null };
      updateState({ assets: [ ...state.assets, asset ] });
    },
    setVideoInfo: (key, width, height, duration) => {
      updateState({ assets: state.assets.map((item) => {
          if(item.key === key) {
            return { ...item, ratio: width / height, duration };
          }
          return item;
        })
      });
    },
    setVideoRef: (key, ref) => {
      updateState({ assets: state.assets.map((item) => {
          if(item.key === key) {
            return { ...item, ref };
          }
          return item;
        })
      });
    },
    setVideoPosition: (key, position) => {
      updateState({ assets: state.assets.map((item) => {
          if(item.key === key) {
            return { ...item, position };
          }
          return item;
        })
      });
    },
    removeAsset: (key) => {
      updateState({ assets: state.assets.filter(item => (item.key !== key))});
    },
  };

  return { state, actions };
}

