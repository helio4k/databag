import styled from 'styled-components';

export const VideoAssetWrapper = styled.div`
  position: relative;
  height: 100%;

  .playback {
    top: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .player:hover .control {
    visibility: visible;
  }

  .player:hover .fullscreen {
    visibility: visible;
  }

  .player {
    position: absolute;
    top: 0;
  }

  .control {
    top: 0;
    visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    opacity: 0.5;
  }

  .fullscreen {
    padding-right: 2px;
    visibility: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

