import 'react-native-gesture-handler';
import React from 'react';
import { NativeRouter } from "react-router-native";
import { Routes, Route } from 'react-router-dom';
import { StoreContextProvider } from 'context/StoreContext';
import { UploadContextProvider } from 'context/UploadContext';
import { AppContextProvider } from 'context/AppContext';
import { AccountContextProvider } from 'context/AccountContext';
import { ProfileContextProvider } from 'context/ProfileContext';
import { CardContextProvider } from 'context/CardContext';
import { ChannelContextProvider } from 'context/ChannelContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ConversationContextProvider } from 'context/ConversationContext';
import { LogBox } from 'react-native';
import { Root } from 'src/root/Root';
import { Access } from 'src/access/Access';
import { Dashboard } from 'src/dashboard/Dashboard';
import { Session } from 'src/session/Session';

// silence warning: Sending `onAnimatedValueUpdate` with no listeners registered
//LogBox.ignoreLogs(['Sending']);

export default function App() {

  return (
    <StoreContextProvider>
      <UploadContextProvider>
        <CardContextProvider>
          <ChannelContextProvider>
            <AccountContextProvider>
              <ProfileContextProvider>
                <ConversationContextProvider>
                  <AppContextProvider>
                    <SafeAreaProvider>
                      <NativeRouter>
                        <Routes>
                          <Route path="/" element={ <Root /> } />
                          <Route path="/admin" element={ <Access mode="admin" /> } />
                          <Route path="/dashboard" element={ <Dashboard /> } />
                          <Route path="/login" element={ <Access mode="login" /> } />
                          <Route path="/reset" element={ <Access mode="reset" /> } />
                          <Route path="/create" element={ <Access mode="create" /> } />
                          <Route path="/session" element={ <Session /> } />
                        </Routes>
                      </NativeRouter>
                    </SafeAreaProvider>
                  </AppContextProvider>
                </ConversationContextProvider>
              </ProfileContextProvider>
            </AccountContextProvider>
          </ChannelContextProvider>
        </CardContextProvider>
      </UploadContextProvider>
    </StoreContextProvider>
  );
}

