//
//  BrightsideAuth.m
//  BrightsideAuthDemo
//
//  Created by Toni Kaplan on 4/21/20.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BrightsideAuth, NSObject)

RCT_EXTERN_METHOD(startup: (RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(checkForMrBrightside: (RCTResponseSenderBlock)callback);

@end
