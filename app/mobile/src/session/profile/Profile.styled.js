
import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexGrow: 1,
  },
  button: {
    paddingRight: 16,
  },
  switch: {
    false: Colors.grey,
    true: Colors.background,
  },
  headerText: {
    fontSize: 18,
    overflow: 'hidden',
    textAlign: 'center',
    color: Colors.text,
  },
  logo: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
  },
  alert: {
    height: 16,
    width: '100%',
    alignItems: 'center',
  },
  alertText: {
    color: Colors.alert,
  },
  logout: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoutText: {
    marginLeft: 8,
    color: Colors.primary,
    fontSize: 16,
  },
  delete: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  deleteText: {
    marginLeft: 8,
    color: Colors.alert,
    fontSize: 16,
  },
  modalWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalContainer: {
    backgroundColor: Colors.formBackground,
    padding: 16,
    width: '80%',
    maxWidth: 400,
  },
  modalHeader: {
    fontSize: 18,
    paddingBottom: 16,
    color: Colors.text,
  },
  canceltext: {
    color: Colors.text,
  },
  modalList: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 2,
  },
  modalControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancel: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    width: 88,
    display: 'flex',
    alignItems: 'center',
  },
  unconfirmed: {
    backgroundColor: Colors.lightgrey,
    borderRadius: 4,
    padding: 8,
    width: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remove: {
    backgroundColor: Colors.error,
    borderRadius: 4,
    padding: 8,
    width: 72,
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
  },
  removeText: {
    color: Colors.white,
  },
  input: {
    fontSize: 14,
    flexGrow: 1,
  },
  inputField: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    maxHeight: 92,
    display: 'flex',
    flexDirection: 'row',
  },
  gallery: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    backgroundColor: Colors.lightgrey,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: Colors.text,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 16,
    marginBottom: 16,
  },
  attribute: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  nonametext: {
    fontSize: 18,
    paddingRight: 8,
    fontWeight: 'bold',
    color: Colors.grey,
  },
  nametext: {
    fontSize: 18,
    paddingRight: 8,
    fontWeight: 'bold',
    color: Colors.text,
  },
  locationtext: {
    fontSize: 16,
    paddingLeft: 8,
    color: Colors.text,
  },
  nolocationtext: {
    fontSize: 16,
    paddingLeft: 8,
    color: Colors.grey,
  },
  descriptiontext: {
    fontSize: 16,
    paddingLeft: 8,
    color: Colors.text,
  },
  nodescriptiontext: {
    fontSize: 16,
    paddingLeft: 8,
    color: Colors.grey,
  },
  save: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    width: 88,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: Colors.white,
  },
  blocked: {
    alignSelf: 'center',
    borderColor: Colors.lightgrey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  blockedLabel: {
    marginTop: 32,
    alignSelf: 'center',
    color: Colors.grey,
  },
  group: {
    marginTop: 16,
    marginBottom: 16,
  },
  enable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 4,
  },
  enableText: {
    color: Colors.primary,
    fontSize: 16,
  },
  enableSwitch: {
    transform: [{ scaleX: .6 }, { scaleY: .6 }],
  },
  link: {
    marginLeft: 8,
    marginRight: 8,
  },
  linkText: {
    color: Colors.primary,
  },
  close: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    width: 72,
    display: 'flex',
    alignItems: 'center',
  },
  sealable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  disabled: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    padding: 8,
    borderRadius: 4,
    width: 88,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activity: {
    paddingRight: 4,
  },
  disabledText: {
    color: Colors.disabled,
  },
  sealUpdate: {
    position: 'absolute',
    top: 0,
    height: 36,
    left: 8,
    width: '100%',
  },
  notice: {
    color: Colors.grey,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingBottom: 8,
  },
  warn: {
    paddingTop: 2,
    paddingRight: 8,
  },
});

