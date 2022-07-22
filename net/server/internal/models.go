package databag

type AccountProfile struct {

	AccountID uint32 `json:"accountID"`

  GUID string `json:"guid"`

  Handle string `json:"handle,omitempty"`

  Name string `json:"name,omitempty"`

  Description string `json:"description,omitempty"`

  Location string `json:"location,omitempty"`

  ImageSet bool `json:"imageSet,omitempty"`

	Disabled bool `json:"disabled"`
}

type AccountStatus struct {

	Disabled bool `json:"disabled"`

	StorageUsed int64 `json:"storageUsed"`

	StorageAvailable int64 `json:"storageAvailable"`

	ForwardingAddress string `json:"forwardingAddress"`

	Searchable bool `json:"searchable"`
}

type Announce struct {

	AppToken string `json:"appToken"`
}

type App struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *AppData `json:"data"`
}

type AppData struct {

	Name string `json:"name,omitempty"`

	Description string `json:"description,omitempty"`

	URL string `json:"url,omitempty"`

	Image string `json:"image,omitempty"`

	Attached int64 `json:"attached"`
}

type Article struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *ArticleData `json:"data"`
}

type ArticleData struct {

	DataType string `json:"dataType"`

	Data string `json:"data"`

	Created int64 `json:"created"`

	Updated int64 `json:"updated"`

	Groups *IDList `json:"groups,omitempty"`
}

type ArticleGroups struct {

	Groups []string `json:"groups"`
}

type Asset struct {

	AssetID string `json:"assetID"`

	Transform string `json:"transform,omitempty"`

	Status string `json:"status,omitempty"`
}

type Card struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *CardData `json:"data"`
}

type CardData struct {

	DetailRevision int64 `json:"detailRevision"`

	ProfileRevision int64 `json:"profileRevision"`

	NotifiedProfile int64 `json:"notifiedProfile"`

	NotifiedArticle int64 `json:"notifiedArticle"`

	NotifiedChannel int64 `json:"notifiedChannel"`

	NotifiedView int64 `json:"notifiedView"`

	CardDetail *CardDetail `json:"cardDetail,omitempty"`

	CardProfile *CardProfile `json:"cardProfile,omitempty"`
}

type CardDetail struct {

	Status string `json:"status"`

	Token string `json:"token,omitempty"`

	Notes string `json:"notes,omitempty"`

	Groups []string `json:"groups,omitempty"`
}

type CardProfile struct {

	GUID string `json:"guid"`

	Handle string `json:"handle,omitempty"`

	Name string `json:"name,omitempty"`

	Description string `json:"description,omitempty"`

	Location string `json:"location,omitempty"`

	ImageSet bool `json:"imageSet"`

	Version string `json:"version,omitempty"`

	Node string `json:"node"`
}

type ChannelContacts struct {

	Groups []string `json:"groups"`

	Cards []string `json:"cards"`
}

type Channel struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *ChannelData `json:"data"`
}

type ChannelData struct {

	DetailRevision int64 `json:"detailRevision"`

  TopicRevision int64 `json:"topicRevision"`

	ChannelSummary *ChannelSummary `json:"channelSummary,omitempty"`

	ChannelDetail *ChannelDetail `json:"channelDetail,omitempty"`
}

type ChannelDetail struct {

	DataType string `json:"dataType"`

	Data string `json:"data"`

	Created int64 `json:"created"`

	Updated int64 `json:"updated"`

	Contacts *ChannelContacts `json:"contacts,omitempty"`

	Members []string `json:"members"`
}

type ChannelSummary struct {

	LastTopic *TopicDetail `json:"lastTopic,omitempty"`
}

type ChannelParams struct {

	DataType string `json:"dataType"`

	Data string `json:"data"`

	Groups []string `json:"groups"`

	Cards []string `json:"cards"`
}

type Claim struct {

	Token string `json:"token"`
}

type Connect struct {

	Contact string `json:"contact"`

	Token string `json:"token"`

	ViewRevision int64 `json:"viewRevision,omitempty"`

	ArticleRevision int64 `json:"articleRevision,omitempty"`

	ProfileRevision int64 `json:"profileRevision,omitempty"`

	ChannelRevision int64 `json:"channelRevision,omitempty"`

  Handle string `json:"handle,omitempty"`

	Name string `json:"name,omitempty"`

	Description string `json:"description,omitempty"`

	Location string `json:"location,omitempty"`

	Image string `json:"image,omitempty"`

	Version string `json:"version,omitempty"`

	Node string `json:"node,omitempty"`
}

type ContactStatus struct {

	Token string `json:"token,omitempty"`

	ProfileRevision int64 `json:"profileRevision,omitempty"`

	ArticleRevision int64 `json:"articleRevision,omitempty"`

	ChannelRevision int64 `json:"channelRevision,omitempty"`

	ViewRevision int64 `json:"viewRevision,omitempty"`

	Status string `json:"status"`
}

type DataMessage struct {

	Message string `json:"message"`

	KeyType string `json:"keyType"`

	PublicKey string `json:"publicKey"`

	Signature string `json:"signature"`

	SignatureType string `json:"signatureType"`
}

type Disconnect struct {

	Contact string `json:"contact"`
}

type Group struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *GroupData `json:"data,omitempty"`
}

type GroupData struct {

	DataType string `json:"dataType"`

	Data string `json:"data"`

	Created int64 `json:"created"`

	Updated int64 `json:"updated"`
}

type Identity struct {

	Revision int64 `json:"revision"`

	Handle string `json:"handle,omitempty"`

	Name string `json:"name,omitempty"`

	Description string `json:"description,omitempty"`

	Location string `json:"location,omitempty"`

	Image string `json:"image,omitempty"`

	Version string `json:"version"`

	Node string `json:"node"`
}

type IDList struct {

	IDs []string `json:"ids"`
}

type LoginAccess struct {

  AppToken string `json:"appToken"`

  Created int64 `json:"created"`
}

type NodeConfig struct {

	Domain string `json:"domain"`

  OpenAccess bool `json:"openAccess"`

	AccountLimit int64 `json:"accountLimit"`

	AccountStorage int64 `json:"accountStorage"`
}

type Profile struct {

	GUID string `json:"guid"`

	Handle string `json:"handle,omitempty"`

	Name string `json:"name,omitempty"`

	Description string `json:"description,omitempty"`

	Location string `json:"location,omitempty"`

	Image string `json:"image,omitempty"`

	Revision int64 `json:"revision"`

	Version string `json:"version,omitempty"`

	Node string `json:"node"`
}

type ProfileData struct {

	Name string `json:"name,omitempty"`

	Description string `json:"description,omitempty"`

	Location string `json:"location,omitempty"`
}

type Revision struct {

	Account int64 `json:"account"`

  Profile int64 `json:"profile"`

	Article int64 `json:"article"`

	Group int64 `json:"group"`

	Channel int64 `json:"channel"`

	Card int64 `json:"card"`
}

type SignedData struct {

	GUID string `json:"guid"`

	Timestamp int64 `json:"timestamp"`

	MessageType string `json:"messageType"`

	Value string `json:"value"`
}

type Subject struct {

  DataType string `json:"dataType"`

  Data string `json:"data"`
}

type Tag struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *TagData `json:"data"`
}

type TagData struct {

	GUID string `json:"guid"`

	DataType string `json:"dataType"`

	Data string `json:"data"`

	Created int64 `json:"created"`

	Updated int64 `json:"updated"`
}

type Topic struct {

	ID string `json:"id"`

	Revision int64 `json:"revision"`

	Data *TopicData `json:"data"`
}

type TopicData struct {

	DetailRevision int64 `json:"detailRevision"`

	TagRevision int64 `json:"tagRevision"`

	TopicDetail *TopicDetail `json:"topicDetail,omitempty"`
}

type TopicDetail struct {

	GUID string `json:"guid"`

	DataType string `json:"dataType"`

	Data string `json:"data"`

	Created int64 `json:"created"`

	Updated int64 `json:"updated"`

	Status string `json:"status"`

  Transform string `json:"transform,omitempty"`
}

type TopicTags struct {

	TagCount int32 `json:"tagCount"`

	TagUpdated int64 `json:"tagUpdated"`
}

