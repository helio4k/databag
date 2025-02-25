import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputwrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 4,
    paddingBottom: 4,
  },
  inputfield: {
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
    padding: 4,
    color: Colors.text,
    fontSize: 14,
  },
  addField: {
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
  input: {
    fontSize: 14,
    flexGrow: 1,
  },
  icon: {
    paddingLeft: 8,
  },
  addbottom: {
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4,
  },
  addtop: {
    backgroundColor: Colors.primary,
    marginLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  addtext: {
    paddingLeft: 8,
    color: Colors.white,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: 4,
  },
  notfound: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  notfoundtext: {
    fontSize: 18,
    color: Colors.disabled,
  },
  columnbottom: {
    paddingLeft: 24,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: Colors.divider,
  },
  columntop: {
    paddingLeft: 24,
    paddingRight: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
  },
  addWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  addContainer: {
    backgroundColor: Colors.formBackground,
    padding: 16,
    width: '80%',
    maxWidth: 400,
  },
  addHeader: {
    fontSize: 18,
    paddingBottom: 16,
  },
  addMembers: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    marginBottom: 8,
    height: 200,
  },
  emptyMembers: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    marginBottom: 8,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    width: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
    minWidth: 72,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: Colors.white,
    paddingRight: 4,
    paddingLeft: 4,
  },
  addControls: {
    display: 'flex',
    flexDirection: 'row',
  },
  sealed: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  sealedText: {
    color: Colors.text,
  },
  track: {
    false: Colors.grey,
    true: Colors.background,
  },
  switch: {
    transform: [{ scaleX: .7 }, { scaleY: .7 }],
  },
});

