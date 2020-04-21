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
  
  var song : MPMediaItem? = nil
  var musicPlayer : MPMusicPlayerController? = nil
  
  func findMrBrightside() -> MPMediaItem? {
      let artistPredicate = MPMediaPropertyPredicate(value: "The Killers", forProperty: MPMediaItemPropertyArtist)
      let titlePredicate = MPMediaPropertyPredicate(value: "Mr. Brightside", forProperty: MPMediaItemPropertyTitle)
      let songQuery = MPMediaQuery()
      songQuery.addFilterPredicate(artistPredicate)
      songQuery.addFilterPredicate(titlePredicate)
      print("findMrBrightside songquery")
      print("findMrBrightside songquery", songQuery.items!)
      var foundSong: MPMediaItem?
      if let items = songQuery.items, items.count > 0 {
           foundSong = items[0]
      }
    return foundSong
  }
  
  func musicPlayerInit(){
    if(musicPlayer == nil){
      musicPlayer = MPMusicPlayerController.applicationMusicPlayer;
   
      let queue = MPMediaItemCollection.init(items: [song!])
      musicPlayer!.setQueue(with: queue)
      addPlayerStateObserver()
    }
  }
  
  @objc func checkForMrBrightside(_ callback: @escaping RCTResponseSenderBlock) {
    song = findMrBrightside()
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
  
  
  func getStringForPlayerStateEnum(_ status: MPMusicPlaybackState) -> String{
    switch status {
      case .stopped:
        return "stopped"
      case .playing:
        return "playing"
      case .paused:
        return "paused"
      case .interrupted:
        return "interrupted"
      case .seekingForward:
        return "seekingForward"
      case .seekingBackward:
        return "seekingBackward"
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
  
  @objc func play() {
    musicPlayerInit()
     if(song != nil && musicPlayer != nil && musicPlayer?.playbackState != .playing){
        musicPlayer!.play()
     }
   }
  
  @objc func stop() {
    if(musicPlayer != nil){
       musicPlayer!.stop()
    }
  }
  
  func addPlayerStateObserver(){
    musicPlayer!.beginGeneratingPlaybackNotifications()
    NotificationCenter.default.addObserver(self, selector:#selector(self.handlePlayerStateChange), name: NSNotification.Name.MPMusicPlayerControllerPlaybackStateDidChange, object: nil)
  }
  
  @objc func handlePlayerStateChange(){
    if(musicPlayer?.playbackState != .playing){
      cleanup()
    }
  }
  
  @objc func cleanup() {
     if(musicPlayer != nil){
       musicPlayer!.stop()
        musicPlayer = nil
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
// by default cleaup occurs five minutes after the player is stopped
// if you disable this, you should manually call the cleanup method
