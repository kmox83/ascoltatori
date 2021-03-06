global.sinon = require("sinon");
global.chai = require("chai");
global.expect = require("chai").expect;
global.async = require("async");

global.redisSettings = function() {
  return {
    redis: require('redis')
  };
};

var portCounter = 50042;
global.nextPort = function() {
  return ++portCounter;
};

global.zeromqSettings = function(remote_ports) {
  return {
    zmq: require("zmq"),
    port: "tcp://127.0.0.1:" + global.nextPort()
  };
};

global.rabbitSettings = function() {
  return {
    amqp: require("amqp"),
    exchange: "ascolatore" + global.nextPort()
  };
};

global.mqttSettings = function() {
  return {
    mqtt: require("mqttjs"),
    host: "127.0.0.1",
    port: 5883
  }
};

require("./mqtt_server")(5883);

global.behaveLikeAnAscoltatore = require("./behave_like_an_ascoltatore");

global.wrap = require("../lib/util").wrap;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);

global.ascoltatori = require("../");
