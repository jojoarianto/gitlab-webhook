# Gitlab Webhook 

## Feature
- Gitlab Event notification to slack ("PRIVATELY")

### Gitlab Event Nofitication
- Merge Request Open | Merged (private for author and reviewer)
- New Comment on Merge Request (private for mr author)
- New Comment on Merge Request (for all user in same discussion)
- Tag People on Merge Request Comment (private for tagged people)

### Installation
```
# to install dependency
npm install

# to run
npm run start
```

## Payload for test
- [merge request](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#merge-request-events)