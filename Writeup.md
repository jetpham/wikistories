## Theoretical REST endpoints

### Friends

- `GetFriends(CurrentUser) -> Users`
- `AddFriend(CurrentUser, NewFriend)`
- `UpdateFriendStatus(CurrentUser, Friend, NewStatus)`
- `RemoveFriend(CurrentUser, Friend)`

### Stories

- `GetAllStoryContent(User) -> StoryContent[]`
- `GetStoryContent(User, StoryID) -> StoryContent`
- `CreateStory(User, StoryContent)`
- `UpdateStory(User, StoryID, NewStoryContent)`
- `RemoveStory(User, StoryID)`
