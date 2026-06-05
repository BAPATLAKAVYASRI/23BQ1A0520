***Stage 1 - Priority Inbox Design***

*Problem*



*Students receive a large number of notifications related to placements, results, and campus events. Important notifications may get buried among less important updates.*



*The goal is to always show the Top 10 unread notifications based on:*



*1. Notification Type Priority*

*2. Recency*

*->Priority Rules*



*Weight assignment:*



&#x20;*Type   -   Weight*

*.....................*

*Placement - 3* 

*Result - 2* 

*Event - 1* 

*Higher weight means higher priority.*

*If two notifications have the same weight, the newer notification is given higher priority.*

*Algorithm i used is:*

*1. Fetced the notifications from the Notification API.*

*2. Assigned the weights based on notification type.*

*3. Sorted the notifications by* 

&#x20;  *i)weight (descendng)*

&#x20;  *ii)timestamp (descending)*

*4. Selected first 10 notifications from that*

*5. printed them.*



*Tine Complexity:*

*for Sorting:*



*O(n log n)*



*for Selecting Top 10:*



*O(10)*

*then overall time complexity:*

*O(n log n)*







*=>API Used*



*GET*



*http://4.224.186.213/evaluation-service/notifications*



*Authorization:Bearer Token*



*output:*





*TOP 10 PRIORITY NOTIFICATIONS*



*1. Placement - Broadcom Inc. hiring -2026-06-04 23:33:46*

*2. Placement - Broadcom Inc. hiring - 2026-06-04 23:07:31*

*3. Placement - Berkshire Hathaway Inc. hiring - 2026-06-04 22:02:46*

*4. Placement - Marriott International Inc. hiring - 2026-06-04 20:05:01*

*5. Placement - Meta Platforms Inc. hiring - 2026-06-04 19:07:16*

*6. Placement - PayPal Holdings Inc. hiring - 2026-06-04 14:06:31*

*7. Placement - Booking Holdings Inc. hiring - 2026-06-04 08:36:01*

*8. Result - internal - 2026-06-05 04:05:31*

*9. Result - mid-sem - 2026-06-05 03:04:46*

*10. Result - mid-sem - 2026-06-05 00:06:16*



