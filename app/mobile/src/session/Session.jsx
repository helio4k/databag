import { View, TouchableOpacity, StatusBar, Text, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { useSession } from './useSession.hook';
import { styles } from './Session.styled';
import Colors from 'constants/Colors';
import { Profile } from './profile/Profile';
import { CardsTitle, CardsBody, Cards } from './cards/Cards';
import { RegistryTitle, RegistryBody, Registry } from './registry/Registry';
import { Contact, ContactTitle } from './contact/Contact';
import { Details, DetailsHeader, DetailsBody } from './details/Details';
import { Conversation, ConversationHeader, ConversationBody } from './conversation/Conversation';
import { Welcome } from './welcome/Welcome';
import { ChannelsTitle, ChannelsBody, Channels } from './channels/Channels';
import { CommonActions } from '@react-navigation/native';
import { ConversationContext } from 'context/ConversationContext';
import { ProfileIcon } from './profileIcon/ProfileIcon';
import { CardsIcon } from './cardsIcon/CardsIcon';
import splash from 'images/session.png';

const ConversationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ContactStack = createStackNavigator();
const ProfileDrawer = createDrawerNavigator();
const ContactDrawer = createDrawerNavigator();
const DetailDrawer = createDrawerNavigator();
const CardDrawer = createDrawerNavigator();
const RegistryDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export function Session() {

  const { state, actions } = useSession();

  const drawerParams = { drawerPosition: 'right', headerShown: false, swipeEnabled: false, drawerType: 'front' };
  const stackParams = { headerStyle: { backgroundColor: Colors.titleBackground }, headerBackTitleVisible: false };
  const screenParams = { headerShown: true, headerTintColor: Colors.primary };

  const ConversationStackScreen = () => {
    const conversation = useContext(ConversationContext);

    const setConversation = (navigation, cardId, channelId) => {
      navigation.navigate('conversation');
      conversation.actions.setConversation(cardId, channelId);
    }
    const clearConversation = (navigation) => {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [ { name: 'channels' }, ], })
      );
      conversation.actions.clearConversation();
    }
    const setDetail = (navigation) => {
      navigation.navigate('details');
    }

    return (
      <ConversationStack.Navigator
          initialRouteName="channels"
          screenOptions={({ route }) => (screenParams)}
          screenListeners={{ state: (e) => { if (e?.data?.state?.index === 0) { conversation.actions.clearConversation() }} }}>

        <ConversationStack.Screen name="channels" options={{ ...stackParams, headerTitle: (props) => <ChannelsTitle /> }}>
          {(props) => <ChannelsBody openConversation={(cardId, channelId) => setConversation(props.navigation, cardId, channelId)} />}
        </ConversationStack.Screen>

        <ConversationStack.Screen name="conversation" options={{ ...stackParams, headerTitle: (props) => <ConversationHeader closeConversation={clearConversation} openDetails={openDetails} /> }}>
          {(props) => <ConversationBody />}
        </ConversationStack.Screen>

        <ConversationStack.Screen name="details" options={{ ...stackParams, headerTitle: (props) => <DetailsHeader /> }}>
          {(props) => <DetailsBody clearConversation={() => clearConversation(props.navigation)} />}
        </ConversationStack.Screen>

      </ConversationStack.Navigator>
    );
  }

  const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator screenOptions={({ route }) => (screenParams)}>
        <ProfileStack.Screen name="profile" component={Profile} options={{ headerStyle: { backgroundColor: Colors.titleBackground }}} />
      </ProfileStack.Navigator>
    );
  }

  const ContactStackScreen = () => {
    const [contact, setContact] = useState(null);

    const openContact = (navigation, contact) => {
      setContact(contact);
      navigation.navigate('contact')
    }
    const openRegistry = (navigation) => {
      navigation.navigate('registry');
    }

    return (
      <ContactStack.Navigator screenOptions={({ route }) => (screenParams)} initialRouteName="cards">

        <ContactStack.Screen name="cards" options={{ ...stackParams, headerTitle: (props) => <CardsTitle openRegistry={props.navigation} /> }}>
          {(props) => <CardsBody openContact={(contact) => openContact(props.navigation, contact)} />}
        </ContactStack.Screen>

        <ContactStack.Screen name="contact" options={{ ...stackParams, headerTitle: (props) => <ContactTitle contact={contact} /> }}>
          {(props) => <ContactBody contact={contact} />}
        </ContactStack.Screen>

        <ContactStack.Screen name="registry" options={{ ...stackParams, headerTitle: (props) => <RegistryTitle /> }}>
          {(props) => <RegistryBody openContact={(contact) => openContact(props.navigation, contact)} />}
        </ContactStack.Screen>

      </ContactStack.Navigator>
    );
  }

  const HomeScreen = ({ navParams }) => {

    const conversation = useContext(ConversationContext);
    const [channel, setChannel] = useState(false);

    const setConversation = (cardId, channelId) => {
      conversation.actions.setConversation(cardId, channelId);
      setChannel(true);
    };
    const openDetails = () => {
      navParams.detailNav.openDrawer();
    };
    const openProfile = () => {
      navParams.profileNav.openDrawer();
    }
    const openCards = () => {
      navParams.cardNav.openDrawer();
    }

    useEffect(() => {
      navParams.detailNav.closeDrawer();
      setChannel(false);
    }, [navParams.closeCount]);

    return (
      <View style={styles.home}>
        <SafeAreaView edges={['top', 'bottom']} style={styles.sidebar}>
          <SafeAreaView edges={['left']} style={styles.options}>
            <TouchableOpacity style={styles.option} onPress={openProfile}>
              <ProfileIcon color={Colors.text} size={20} />
              <Text style={styles.profileLabel}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={openCards}>
              <CardsIcon color={Colors.text} size={20} />
              <Text style={styles.profileLabel}>Contacts</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.channels}>
            <Channels openConversation={setConversation} />
          </View>
        </SafeAreaView>
        <View style={styles.conversation}>
          { channel && (
            <Conversation closeConversation={clearConversation} openDetails={openDetails} />
          )}
          { !channel && (
            <Welcome />
          )} 
        </View>
      </View>
    )
  }

  const CardDrawerScreen = ({ navParams }) => {
    const openContact = (contact) => {
      navParams.setContact(contact);
      navParams.contactNav.openDrawer();
    };
    const openRegistry = () => {
      navParams.registryNav.openDrawer();
    };

    return (
      <CardDrawer.Navigator screenOptions={{ ...drawerParams, drawerStyle: { width: '50%' } }}
        drawerContent={(props) => <Cards openContact={openContact} openRegistry={openRegistry} />}>
        <CardDrawer.Screen name="home">
          {(props) => <HomeScreen navParams={{...navParams, cardNav: props.navigation}} />}
        </CardDrawer.Screen>
      </CardDrawer.Navigator>
    );
  };

  const RegistryDrawerScreen = ({ navParams }) => {
    const openContact = (contact) => {
      navParams.setContact(contact);
      navParams.contactNav.openDrawer();
    };

    return (
      <RegistryDrawer.Navigator screenOptions={{ ...drawerParams, drawerStyle: { width: '50%' } }}
        drawerContent={(props) => <Registry openContact={openContact} />}>
        <RegistryDrawer.Screen name="card">
          {(props) => <CardDrawerScreen navParams={{...navParams, registryNav: props.navigation}} />}
        </RegistryDrawer.Screen>
      </RegistryDrawer.Navigator>
    );
  };

  const ContactDrawerScreen = ({ navParams }) => {
    const [contact, setContact] = useState(null);

    return (
      <ContactDrawer.Navigator screenOptions={{ ...drawerParams, drawerStyle: { width: '45%' } }}
        drawerContent={(props) => <Contact contact={contact} />}>
        <ContactDrawer.Screen name="registry">
          {(props) => <RegistryDrawerScreen navParams={{...navParams, setContact, contactNav: props.navigation }} />}
        </ContactDrawer.Screen>
      </ContactDrawer.Navigator>
    );
  }

  const DetailDrawerScreen = ({ navParams }) => {
    const [closeCount, setCloseCount] = useState(0);
    const closeConversation = () => {
      setCloseCount(closeCount+1);
    };

    return (
      <DetailDrawer.Navigator screenOptions={{ ...drawerParams, drawerStyle: { width: '45%' } }}
          drawerContent={(props) => <Details closeConversation={closeConversation} />}
        >
        <DetailDrawer.Screen name="contact">
          {(props) => <ContactDrawerScreen navParams={{...navParams, detailNav: props.navigation}} />}
        </DetailDrawer.Screen>
      </DetailDrawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <View style={styles.body}>
        { state.firstRun == true && (
          <SafeAreaView edges={['top', 'bottom']}  style={styles.firstRun}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Welcome To Databag</Text>
              <Text style={styles.tagText}>Communication for the Decentralized Web</Text>
            </View>
            <Image style={styles.splash} source={splash} resizeMode="contain" />
            <View style={styles.steps} >
              <View style={styles.step}>
                <Ionicons name={'user'} size={18} color={Colors.white} />
                <Text style={styles.stepText}>Setup Your Profile</Text>
              </View>
              <View style={styles.step}>
                <Ionicons name={'contacts'} size={18} color={Colors.white} />
                <Text style={styles.stepText}>Connect With People</Text>
              </View>
              <View style={styles.step}>
                <Ionicons name={'message1'} size={18} color={Colors.white} />
                <Text style={styles.stepText}>Start a Conversation</Text>
              </View>
              <TouchableOpacity style={styles.start} onPress={actions.clearFirstRun}>
                <Text style={styles.startText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
        { state.firstRun == false && (
          <View style={styles.container}>
            { state.tabbed === false && (
              <ProfileDrawer.Navigator screenOptions={{ ...drawerParams, drawerStyle: { width: '45%' } }}
                drawerContent={(props) => <Profile />}>
                <ProfileDrawer.Screen name="detail">
                  {(props) => <DetailDrawerScreen navParams={{ profileNav: props.navigation }} />}
                </ProfileDrawer.Screen>
              </ProfileDrawer.Navigator>
            )}
            { state.tabbed === true && (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarStyle: styles.tabBar,
                  headerShown: false,
                  tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Profile') {
                      return <ProfileIcon size={size} color={color} />
                    }
                    if (route.name === 'Conversation') {
                      return <Ionicons name={'message1'} size={size} color={color} />;
                    }
                    if (route.name === 'Contacts') {
                      return <CardsIcon size={size} color={color} />;
                    }
                  },
                  tabBarShowLabel: false,
                  tabBarActiveTintColor: Colors.white,
                  tabBarInactiveTintColor: Colors.disabled,
                })}>
                <Tab.Screen name="Conversation" component={ConversationStackScreen} />
                <Tab.Screen name="Profile" component={ProfileStackScreen} />
                <Tab.Screen name="Contacts" component={ContactStackScreen} />
              </Tab.Navigator>
            )}
            <StatusBar barStyle="dark-content" backgroundColor={Colors.formBackground} /> 
          </View>
        )}
      </View>
    </NavigationContainer>
  );
}


