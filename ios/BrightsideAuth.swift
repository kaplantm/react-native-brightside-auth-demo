//
//  BrightsideAuth.swift
//  BrightsideAuthDemo
//
//  Created by Toni Kaplan on 4/21/20.
//

import Foundation
import MediaPlayer

@objc(BrightsideAuth)
class BrightsideAuth: NSObject {
  
  
  func findMrBrightside() -> MPMediaItem? {
      let artistPredicate = MPMediaPropertyPredicate(value: "The Killers", forProperty: MPMediaItemPropertyArtist)
      let titlePredicate = MPMediaPropertyPredicate(value: "Mr. Brightside", forProperty: MPMediaItemPropertyTitle)
      let songQuery = MPMediaQuery()
      songQuery.addFilterPredicate(artistPredicate)
      songQuery.addFilterPredicate(titlePredicate)
      print("findMrBrightside songquery")
      print("findMrBrightside songquery", songQuery.items!)
      var song: MPMediaItem?
      if let items = songQuery.items, items.count > 0 {
           song = items[0]
      }
    return song
  }
  
  
  
  @objc func checkForMrBrightside(_ callback: @escaping RCTResponseSenderBlock) {
    let song = findMrBrightside()
    callback([song != nil])
  }
  
  func getStringForAuthEnum(_ status: MPMediaLibraryAuthorizationStatus) -> String{
    switch status {
      case .authorized:
        return "authorized"
      case .notDetermined:
        return "notDetermined"
      case .denied:
        return "denied"
      case .restricted:
        return "restricted"
      @unknown default:
        return "unknown"
    }
  }
  
  @objc func startup(_ callback: @escaping RCTResponseSenderBlock) {
      let status = MPMediaLibrary.authorizationStatus()
    
    if(status == .notDetermined){
      MPMediaLibrary.requestAuthorization() { newStatus in
        let newStatusString = self.getStringForAuthEnum(newStatus)
        callback([newStatusString])
        }
    }
    else{
      let statusString = getStringForAuthEnum(status)
      callback([statusString])
    }
    
 }

  
 @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
//to do
// setup project music permissions
// get app to ask for permission
// find song
// return bool
