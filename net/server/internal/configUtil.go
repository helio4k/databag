package databag

import (
	"databag/internal/store"
	"errors"
	"gorm.io/gorm"
)

//CNFPushSupported for allowing push notifications
const CNFPushSupported = "push_notifications"

//CNFOpenAccess for allowing for public account creation
const CNFOpenAccess = "open_access"

//CNFAccountLimit for limiting number of accounts for public creation
const CNFAccountLimit = "account_limit"

//CNFConfigured set when admin token has been set
const CNFConfigured = "configured"

//CNFToken identifies the admin token
const CNFToken = "token"

//CNFDomain identifies the configured server hostname
const CNFDomain = "domain"

//CNFStorage specifies the storage limit per account
const CNFStorage = "storage"

//CNFAssetPath specifies the path to store assets
const CNFAssetPath = "asset_path"

//CNFScriptPath specifies the path where transform scripts are found
const CNFScriptPath = "script_path"

//CNFEnableImage specifies whether node can process image assets
const CNFEnableImage = "enable_image"

//CNFEnableAudio specifies whether node can process audio assets
const CNFEnableAudio = "enable_audio"

//CNFEnableVideo specifies whether node can process video assets
const CNFEnableVideo = "enable_video"

//CNFKeyType specifies the type of key to use for identity
const CNFKeyType = "key_type"

func getStrConfigValue(configID string, empty string) string {
	var config store.Config
	err := store.DB.Where("config_id = ?", configID).First(&config).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return empty
	}
	return config.StrValue
}

func getNumConfigValue(configID string, empty int64) int64 {
	var config store.Config
	err := store.DB.Where("config_id = ?", configID).First(&config).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return empty
	}
	return config.NumValue
}

func getBoolConfigValue(configID string, empty bool) bool {
	var config store.Config
	err := store.DB.Where("config_id = ?", configID).First(&config).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return empty
	}
	return config.BoolValue
}

func getBinConfigValue(configID string, empty []byte) []byte {
	var config store.Config
	err := store.DB.Where("config_id = ?", configID).First(&config).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return empty
	}
	return config.BinValue
}
