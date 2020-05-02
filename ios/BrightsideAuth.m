//
//  BrightsideAuth.m
//  BrightsideAuthDemo
//
//  Created by Toni Kaplan on 4/21/20.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BrightsideAuth, NSObject)

RCT_EXTERN_METHOD(startup:(NSDictionary *)config callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(checkForMrBrightside: (RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(play);
RCT_EXTERN_METHOD(stop);
//RCT_EXTERN_METHOD(cleanup);

RCT_EXTERN_METHOD(debug);

@end


