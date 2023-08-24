const Redis = require('ioredis');
const { REDIS_URL } = require('../../../config/config');

let redis;
if (!redis) {
    redis = new Redis(REDIS_URL);
}

const del = async (key) => redis.del(key);

exports.del = del;

exports.keys = async (key) => redis.keys(key);

exports.hgetall = async (key) => redis.hgetall(key);

exports.hmget = async (...args) => redis.hmget(args);

exports.hget = async (...args) => redis.hget(args);

exports.hmset = async (...args) => redis.hmset(args);

exports.lpop = async (...args) => redis.lpop(args);

exports.lpush = async (...args) => redis.lpush(args);

exports.lindex = async (...args) => redis.lindex(args);

exports.get = async (key) => redis.get(key);
exports.set = async (key, value) => redis.set(key, value);

exports.setObjectToRedis = async (key, object, expTimeAsSeconds) => {
    await del(key);

    if (typeof object !== 'string') {
        object = JSON.stringify(object);
    }

    await redis.set(key, object);
    if (expTimeAsSeconds) {
        await redis.expire(key, expTimeAsSeconds);
    }
};

exports.getObjectFromRedis = async (key) => {
    const val = await redis.get(key);

    if (!val) {
        return null;
    }

    try {
        return JSON.parse(val);
    } catch (e) {
        return null;
    }
};

exports.setKeyToRedis = async (key, field, value, expTime) => {
    await redis.del(key);
    await redis.hmset(key, field, value);
    if (expTime) {
        await redis.expire(key, expTime);
    }
};

exports.getKeyByPattern = async (key) => redis.keys(`${key}*`);
