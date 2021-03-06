const insta = require('../func.js');
const _ = require('lodash');

const unfollowNotFollowback = async () => {
  try {
    insta.setTargetId();
    const task = [
      insta.getFollowing(),
      insta.getFollowers()
    ]   
    const [following,followers] = await Promise.all(task);
    var toUnfollow = _.differenceBy(following, followers, 'id');
    toUnfollow = _.chunk(toUnfollow, 20);
    for (let account of toUnfollow) {
      await Promise.all(account.map(async(account) => {
        insta.setTargetId(account.id);
        const resultUnfollow = await insta.doUnfollow() ? 'SUKSES' : 'GAGAL';
        console.log(`[${account.id}] @${account.username} => ${resultUnfollow}`);
      }))      
      await insta.doSleep(30000, 'Sleep for 30000 MiliSeconds...');
    }
  } catch (e){
    return Promise.reject(e);
  }
}

module.exports = unfollowNotFollowback;