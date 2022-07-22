package databag

import (
  "os"
  "testing"
  "databag/internal/store"
)

func TestMain(m *testing.M) {

//  SetHideLog(true)
  SetKeySize(2048)
  os.Remove("databag.db")
  os.RemoveAll("testdata")
  os.RemoveAll("testscripts")

  store.SetPath("databag.db")
  if err := os.Mkdir("testdata", os.ModePerm); err != nil {
    panic("failed to create testdata path")
  }
  if err := os.Mkdir("testscripts", os.ModePerm); err != nil {
    panic("failed to create testscripts path")
  }
  script := []byte("#!/bin/bash\n\ncp $1 $2\n")
  if err := os.WriteFile("testscripts/transform_copy.sh", script, 0555); err != nil {
    panic("failed to create P01 script")
  }

  r, w, _ := NewRequest("GET", "/admin/status", nil)
  GetNodeStatus(w, r)
  var available bool
  if ReadResponse(w, &available) != nil {
    panic("server not claimable")
  }

  // claim server
  r, w, _ = NewRequest("PUT", "/admin/status?token=pass", nil)
  SetNodeStatus(w, r)
  if ReadResponse(w, nil) != nil {
    panic("failed to claim server")
  }

  // config data path 
  scripts := &store.Config{ ConfigID: CNFScriptPath, StrValue: "./testscripts" }
  if err := store.DB.Save(scripts).Error; err != nil {
    panic("failed to configure scripts path")
  }

  // config data path 
  path := &store.Config{ ConfigID: CNFAssetPath, StrValue: "./testdata" }
  if err := store.DB.Save(path).Error; err != nil {
    panic("failed to configure data path")
  }

  // config server
  config := NodeConfig{Domain: "databag.coredb.org", AccountLimit: 1024, OpenAccess: true, AccountStorage: 4096}
  r, w, _ = NewRequest("PUT", "/admin/config?token=pass", &config)
  SetNodeConfig(w, r)
  if ReadResponse(w, nil) != nil {
    panic("failed to set config")
  }

  // check config
  r, w, _ = NewRequest("GET", "/admin/config?token=pass", nil)
  GetNodeConfig(w, r)
  var check NodeConfig
  if ReadResponse(w, &check) != nil {
    panic("failed to get node config")
  }
  if check.Domain != "databag.coredb.org" {
    panic("failed to set config domain");
  }
  if check.AccountLimit != 1024 {
    panic("failed to set account limit");
  }
  if check.OpenAccess != true {
    panic("failed to set open access");
  }
  if check.AccountStorage != 4096 {
    panic("failed to set account storage");
  }

  go SendNotifications()

  m.Run()

  ExitNotifications()
}

