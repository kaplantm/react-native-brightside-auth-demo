//
//  BrightsideAuth.swift
//  BrightsideAuthDemo
//
//  Created by Toni Kaplan on 4/21/20.
//

import Foundation
import MediaPlayer

@objc(BrightsideAuth)class BrightsideAuth: NSObject {
  
  func findMrBrightside() -> MPMediaItem? {
      let artistPredicate = MPMediaPropertyPredicate(value: "The Killers", forProperty: MPMediaItemPropertyArtist)
      let titlePredicate = MPMediaPropertyPredicate(value: "Mr. Brightside", forProperty: MPMediaItemPropertyTitle)
      let songQuery = MPMediaQuery()
      songQuery.addFilterPredicate(artistPredicate)
      songQuery.addFilterPredicate(titlePredicate)

      var song: MPMediaItem?
      if let items = songQuery.items, items.count > 0 {
           song = items[0]
      }
      return song
  }
  
 @objc func setup(_ callback: @escaping RCTResponseSenderBlock) {
  print("initialize")
  
  let status = MPMediaLibrary.authorizationStatus()
  switch status {
  case .authorized:
  callback(["authorized"])
  case .notDetermined:
      MPMediaLibrary.requestAuthorization() { status in
          if status == .authorized {
//              DispatchQueue.main.async {
                callback(["just  authorized"])
//              }
          }
    else {
      callback(["not just authorized"])
    
    }
      }
  // ...
  case .denied:
    callback(["denied"])
  case .restricted:
  callback(["restricted"])
  @unknown default:
  callback(["unknown"])
  }
  
  
  
//  print(findMrBrightside()?.title)
 callback(["hey dude"])
 }
  
 @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}


//to do
// setup project musuc permissions
// get app to ask for permission
// find song
// return bool
